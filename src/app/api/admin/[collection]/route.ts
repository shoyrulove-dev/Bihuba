import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { collectionMap, CollectionKey } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{
    collection: string;
  }>;
};

export async function GET(_: NextRequest, context: Context) {
  const { collection } = await context.params;
  const key = collection as CollectionKey;
  const Model = collectionMap[key];

  if (!Model) {
    return NextResponse.json({ message: "Collection không hợp lệ." }, { status: 404 });
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return NextResponse.json(
      { message: "MongoDB chưa kết nối được. Kiểm tra lại Atlas network access." },
      { status: 503 }
    );
  }
  const items = await Model.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items: JSON.parse(JSON.stringify(items)) });
}

export async function POST(request: NextRequest, context: Context) {
  const { collection } = await context.params;
  const key = collection as CollectionKey;
  const Model = collectionMap[key];

  if (!Model) {
    return NextResponse.json({ message: "Collection không hợp lệ." }, { status: 404 });
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return NextResponse.json(
      { message: "MongoDB chưa kết nối được. Kiểm tra lại Atlas network access." },
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

  if ("siteName" in payload) {
    const existing = await Model.findOne();
    if (existing) {
      await Model.findByIdAndUpdate(existing._id, payload);
      return NextResponse.json({ message: "Đã cập nhật site settings." });
    }
  }

  await Model.create(payload);
  return NextResponse.json({ message: "Đã tạo mới thành công." });
}
