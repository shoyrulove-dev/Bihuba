import { NextRequest, NextResponse } from "next/server";
import { collectionMap, CollectionKey } from "@/lib/admin";
import { ensureAdminUser, getCurrentAdminUser, hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { canAccessCollection, canApprovePosts, MANAGER_PERMISSION_OPTIONS } from "@/lib/permissions";
import { slugify } from "@/lib/slug";
import { DownloadModel } from "@/models/download";
import { repairDeepText } from "@/lib/text";
import { recordActivity } from "@/lib/activity-log";
import { invalidatePublicContent } from "@/lib/public-content";
import { rejectCrossSiteRequest } from "@/lib/request-security";

type Context = {
  params: Promise<{
    collection: string;
    id: string;
  }>;
};

function serializeClientItem(item: unknown, key: CollectionKey) {
  const serialized = JSON.parse(JSON.stringify(item)) as Record<string, unknown>;
  if (key === "users") {
    delete serialized.passwordHash;
    delete serialized.password;
  }
  return repairDeepText(serialized);
}

function applyPostWorkflow(payload: Record<string, unknown>, role: string, userId: number, canApprove: boolean) {
  payload.submittedBy = Number(payload.submittedBy ?? userId);
  const today = new Date().toISOString().slice(0, 10);

  if (!payload.publishedAt) {
    payload.publishedAt = today;
  }

  if (!payload.displayDate) {
    payload.displayDate = today;
  }

  if (role !== "admin" && !canApprove) {
    payload.status = "pending";
    payload.isFeatured = false;
    delete payload.approvedBy;
    delete payload.approvedAt;
    return;
  }

  if (role !== "admin" && canApprove && !payload.status) {
    payload.status = "pending";
  }

  if (role !== "admin") {
    payload.isFeatured = false;
  }

  if (!payload.status) {
    payload.status = "published";
  }

  if (payload.status === "published") {
    payload.approvedBy = userId;
    payload.approvedAt = new Date().toISOString();
  } else {
    delete payload.approvedBy;
    delete payload.approvedAt;
  }
}

function normalizeUserPermissions(payload: Record<string, unknown>) {
  const allPermissions = MANAGER_PERMISSION_OPTIONS.map((item) => item.value);
  if (payload.role === "admin") {
    payload.permissions = allPermissions;
    return;
  }

  if (payload.role === "business") {
    payload.permissions = ["posts"];
    return;
  }

  const selected = Array.isArray(payload.permissions) ? payload.permissions.map(String) : ["posts"];
  payload.permissions = selected.filter((item) => {
    if (!allPermissions.includes(item as (typeof allPermissions)[number])) return false;
    return payload.role === "manager" || item !== "approvePosts";
  });
  if (!(payload.permissions as string[]).length) {
    payload.permissions = ["posts"];
  }
}

function normalizePostCategory(payload: Record<string, unknown>) {
  const labels: Record<string, string> = {
    news: "Tin tức",
    event: "Sự kiện",
    schedule: "Lịch làm việc",
    trade: "Kết nối giao thương",
    sponsor: "Đồng hành",
  };

  payload.category = labels[String(payload.type ?? "")] || String(payload.category ?? "Tin tức");
}

export async function PUT(request: NextRequest, context: Context) {
  const rejected = rejectCrossSiteRequest(request);
  if (rejected) return rejected;
  const session = await getCurrentAdminUser();
  if (!session) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const { collection, id } = await context.params;
  const key = collection as CollectionKey;
  const Model = collectionMap[key];

  if (!Model) {
    return NextResponse.json({ message: "Collection không hợp lệ." }, { status: 404 });
  }

  const canAccessCurrentCollection =
    (await canAccessCollection(session, key)) || (key === "settings" && (await canAccessCollection(session, "supporters")));

  if (!canAccessCurrentCollection) {
    return NextResponse.json({ message: "Tài khoản chưa được cấp quyền cập nhật mục này." }, { status: 403 });
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return NextResponse.json(
      { message: "MongoDB chưa kết nối được. Kiểm tra lại Atlas Network Access." },
      { status: 503 }
    );
  }

  const canApproveCurrentPosts = key === "posts" ? await canApprovePosts(session) : false;
  const existingPost = key === "posts" ? await Model.findById(id).lean() : null;

  if (key === "posts" && session.role !== "admin" && !canApproveCurrentPosts) {
    if (!existingPost || Number(existingPost.submittedBy) !== session.userId) {
      return NextResponse.json({ message: "Tài khoản chưa được cấp quyền cập nhật bài viết này." }, { status: 403 });
    }
  }

  const payload = repairDeepText((await request.json()) as Record<string, unknown>);

  if (key === "settings" && !(await canAccessCollection(session, "settings"))) {
    payload.supporters = Array.isArray(payload.supporters) ? payload.supporters : [];
    for (const field of Object.keys(payload)) {
      if (field !== "supporters") delete payload[field];
    }
  }

  if ("title" in payload && !payload.slug) {
    payload.slug = slugify(String(payload.title ?? ""));
  }

  if ("name" in payload && !payload.slug) {
    payload.slug = slugify(String(payload.name ?? ""));
  }

  if (key === "downloads" && payload.category) {
    payload.categorySlug = slugify(String(payload.category));
  }

  if (key === "downloads" && !String(payload.fileUrl ?? "").trim()) {
    return NextResponse.json(
      { message: "Vui lòng tải file tài liệu lên hoặc dán đường dẫn file trước khi lưu." },
      { status: 400 }
    );
  }

  if (key === "posts") {
    normalizePostCategory(payload);
    payload.submittedBy = Number(existingPost?.submittedBy ?? session.userId);
    applyPostWorkflow(payload, session.role, session.userId, canApproveCurrentPosts);
  }

  if (key === "users") {
    await ensureAdminUser();
    const existingUser = await Model.findById(id).lean();
    if (!existingUser) {
      return NextResponse.json({ message: "Không tìm thấy user." }, { status: 404 });
    }

    if (existingUser.isProtected || Number(existingUser.userId) === 1) {
      payload.role = "admin";
      payload.permissions = MANAGER_PERMISSION_OPTIONS.map((item) => item.value);
    }

    payload.username = String(payload.username ?? existingUser.username).trim().toLowerCase();
    payload.email = String(payload.email ?? existingUser.email ?? "").trim().toLowerCase();
    payload.phone = String(payload.phone ?? existingUser.phone ?? "").trim();
    normalizeUserPermissions(payload);

    if (payload.password) {
      payload.passwordHash = await hashPassword(String(payload.password));
      payload.sessionVersion = Number(existingUser.sessionVersion || 1) + 1;
      delete payload.password;
    } else {
      delete payload.password;
      delete payload.passwordHash;
    }
  }

  const updated = await Model.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  invalidatePublicContent();

  await recordActivity({ action: "update", actorId: session.userId, actorName: session.name, actorRole: session.role, targetType: key, targetId: id, description: `Cập nhật dữ liệu trong ${key}` });

  return NextResponse.json({
    message: key === "posts" && session.role !== "admin" ? "Đã cập nhật bài viết và gửi chờ duyệt." : "Đã cập nhật thành công.",
    item: serializeClientItem(updated, key),
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  const rejected = rejectCrossSiteRequest(request);
  if (rejected) return rejected;
  const session = await getCurrentAdminUser();
  if (!session) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const { collection, id } = await context.params;
  const key = collection as CollectionKey;
  const Model = collectionMap[key];

  if (!Model) {
    return NextResponse.json({ message: "Collection không hợp lệ." }, { status: 404 });
  }

  const canAccessCurrentCollection =
    (await canAccessCollection(session, key)) || (key === "settings" && (await canAccessCollection(session, "supporters")));

  if (!canAccessCurrentCollection || (key === "posts" && session.role !== "admin")) {
    return NextResponse.json({ message: "Tài khoản chưa được cấp quyền xóa mục này." }, { status: 403 });
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return NextResponse.json(
      { message: "MongoDB chưa kết nối được. Kiểm tra lại Atlas Network Access." },
      { status: 503 }
    );
  }

  if (key === "users") {
    await ensureAdminUser();
    const user = await Model.findById(id).lean();
    if (!user) {
      return NextResponse.json({ message: "Không tìm thấy user." }, { status: 404 });
    }

    if (user.isProtected || Number(user.userId) === 1) {
      return NextResponse.json({ message: "Không thể xóa tài khoản admin gốc." }, { status: 400 });
    }
  }

  if (key === "downloadCategories") {
    const category = await Model.findById(id).lean();
    if (!category) {
      return NextResponse.json({ message: "Không tìm thấy danh mục." }, { status: 404 });
    }

    const linkedCount = await DownloadModel.countDocuments({ categorySlug: category.slug });
    if (linkedCount > 0) {
      return NextResponse.json({ message: "Chỉ xóa được danh mục đang rỗng." }, { status: 400 });
    }
  }

  await Model.findByIdAndDelete(id);
  invalidatePublicContent();
  await recordActivity({ action: "delete", actorId: session.userId, actorName: session.name, actorRole: session.role, targetType: key, targetId: id, description: `Xóa dữ liệu trong ${key}` });

  return NextResponse.json({ message: "Đã xóa thành công." });
}
