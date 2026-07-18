import { NextRequest, NextResponse } from "next/server";
import { collectionMap, CollectionKey } from "@/lib/admin";
import {
  ensureAdminUser,
  getCurrentAdminUser,
  getNextUserId,
  hashPassword,
} from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { repairDeepText } from "@/lib/text";

type Context = {
  params: Promise<{
    collection: string;
  }>;
};

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
        : ([["createdAt", -1]] as [string, 1 | -1][]);

  const items = await Model.find().sort(sort).lean();
  const serialized = repairDeepText(JSON.parse(JSON.stringify(items))).map((item: Record<string, unknown>) => {
    if (key !== "users") return item;
    const { passwordHash, ...safeItem } = item;
    void passwordHash;
    return safeItem;
  });

  return NextResponse.json({ items: serialized });
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

  if ("siteName" in payload) {
    const existing = await Model.findOne();
    if (existing) {
      await Model.findByIdAndUpdate(existing._id, payload, { runValidators: true });
      return NextResponse.json({ message: "Đã cập nhật cấu hình website." });
    }
  }

  if (key === "users") {
    if (!payload.password) {
      return NextResponse.json({ message: "Mật khẩu không được để trống." }, { status: 400 });
    }
    payload.userId = await getNextUserId();
    payload.username = String(payload.username ?? "").trim().toLowerCase();
    payload.passwordHash = hashPassword(String(payload.password ?? ""));
    payload.isProtected = false;
    delete payload.password;
  }

  await Model.create(payload);
  return NextResponse.json({ message: "Đã tạo mới thành công." });
}
