import { NextRequest, NextResponse } from "next/server";
import { collectionMap, CollectionKey } from "@/lib/admin";
import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/slug";

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

  await Model.findByIdAndDelete(id);

  return NextResponse.json({ message: "Đã xóa thành công." });
}
