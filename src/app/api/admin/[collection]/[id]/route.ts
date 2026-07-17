import { NextRequest, NextResponse } from "next/server";
import { collectionMap, CollectionKey } from "@/lib/admin";
import { ensureAdminUser, hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { DownloadModel } from "@/models/download";

type Context = {
  params: Promise<{
    collection: string;
    id: string;
  }>;
};

export async function PUT(request: NextRequest, context: Context) {
  const { collection, id } = await context.params;
  const key = collection as CollectionKey;
  const Model = collectionMap[key];

  if (!Model) {
    return NextResponse.json({ message: "Collection không hợp lệ." }, { status: 404 });
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return NextResponse.json(
      { message: "MongoDB chưa kết nối được. Kiểm tra lại Atlas Network Access." },
      { status: 503 }
    );
  }

  const payload = await request.json();

  if ("title" in payload && !payload.slug) {
    payload.slug = slugify(payload.title);
  }

  if ("name" in payload && !payload.slug) {
    payload.slug = slugify(payload.name);
  }

  if (key === "downloads" && payload.category && !payload.categorySlug) {
    payload.categorySlug = slugify(String(payload.category));
  }

  if (key === "users") {
    await ensureAdminUser();
    const existingUser = await Model.findById(id).lean();
    if (!existingUser) {
      return NextResponse.json({ message: "Không tìm thấy user." }, { status: 404 });
    }

    payload.username = String(payload.username ?? existingUser.username).trim().toLowerCase();

    if (payload.password) {
      payload.passwordHash = hashPassword(String(payload.password));
      delete payload.password;
    } else {
      delete payload.password;
      delete payload.passwordHash;
    }
  }

  await Model.findByIdAndUpdate(id, payload, { runValidators: true });

  return NextResponse.json({ message: "Đã cập nhật thành công." });
}

export async function DELETE(_: NextRequest, context: Context) {
  const { collection, id } = await context.params;
  const key = collection as CollectionKey;
  const Model = collectionMap[key];

  if (!Model) {
    return NextResponse.json({ message: "Collection không hợp lệ." }, { status: 404 });
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

  return NextResponse.json({ message: "Đã xóa thành công." });
}
