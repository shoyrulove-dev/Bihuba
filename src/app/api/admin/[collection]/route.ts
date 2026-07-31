import { NextRequest, NextResponse } from "next/server";
import { collectionMap, CollectionKey } from "@/lib/admin";
import {
  ensureAdminUser,
  getCurrentAdminUser,
  getNextUserId,
  hashPassword,
} from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { canAccessCollection, canApprovePosts, MANAGER_PERMISSION_OPTIONS } from "@/lib/permissions";
import { slugify } from "@/lib/slug";
import { repairDeepText } from "@/lib/text";

type Context = {
  params: Promise<{
    collection: string;
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

export async function GET(_: NextRequest, context: Context) {
  const session = await getCurrentAdminUser();
  if (!session) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const { collection } = await context.params;
  const key = collection as CollectionKey;
  const Model = collectionMap[key];

  if (!Model) {
    return NextResponse.json({ message: "Collection không hợp lệ." }, { status: 404 });
  }

  const canAccessCurrentCollection =
    (await canAccessCollection(session, key)) || (key === "settings" && (await canAccessCollection(session, "supporters")));

  if (!canAccessCurrentCollection) {
    return NextResponse.json({ message: "Tài khoản chưa được cấp quyền truy cập mục này." }, { status: 403 });
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
  }

  const sort =
    key === "downloadCategories"
      ? ([["order", 1], ["createdAt", 1]] as [string, 1 | -1][])
      : key === "users"
        ? ([["userId", 1]] as [string, 1 | -1][])
        : key === "posts"
          ? ([["displayDate", -1], ["publishedAt", -1], ["createdAt", -1]] as [string, 1 | -1][])
        : ([["createdAt", -1]] as [string, 1 | -1][]);

  const canApproveCurrentPosts = key === "posts" ? await canApprovePosts(session) : false;
  const filter = key === "posts" && session.role !== "admin" && !canApproveCurrentPosts ? { submittedBy: session.userId } : {};
  const items = await Model.find(filter).sort(sort).lean();
  const serialized = JSON.parse(JSON.stringify(items)).map((item: Record<string, unknown>) => {
    if (key !== "users") return item;
    const { passwordHash, ...safeItem } = item;
    void passwordHash;
    return safeItem;
  });

  return NextResponse.json({ items: repairDeepText(serialized) });
}

export async function POST(request: NextRequest, context: Context) {
  const session = await getCurrentAdminUser();
  if (!session) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const { collection } = await context.params;
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

  if (key === "posts") {
    normalizePostCategory(payload);
    applyPostWorkflow(payload, session.role, session.userId, await canApprovePosts(session));
  }

  if ("siteName" in payload) {
    const existing = await Model.findOne();
    if (existing) {
      const updated = await Model.findByIdAndUpdate(existing._id, payload, {
        new: true,
        runValidators: true,
      }).lean();
      return NextResponse.json({
        message: "Đã cập nhật cấu hình website.",
        item: serializeClientItem(updated, key),
      });
    }
  }

  if (key === "users") {
    if (!payload.password) {
      return NextResponse.json({ message: "Mật khẩu không được để trống." }, { status: 400 });
    }
    normalizeUserPermissions(payload);
    payload.userId = await getNextUserId();
    payload.username = String(payload.username ?? "").trim().toLowerCase();
    payload.email = String(payload.email ?? "").trim().toLowerCase();
    payload.phone = String(payload.phone ?? "").trim();
    payload.passwordHash = hashPassword(String(payload.password ?? ""));
    payload.isProtected = false;
    delete payload.password;
  }

  const created = await Model.create(payload);
  return NextResponse.json({
    message: key === "posts" && session.role !== "admin" ? "Đã gửi bài viết chờ admin duyệt." : "Đã tạo mới thành công.",
    item: serializeClientItem(created, key),
  });
}
