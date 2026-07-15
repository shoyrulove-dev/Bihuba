import { connectToDatabase } from "@/lib/db";
import { collectionMap, CollectionKey } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";

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
      { message: "MongoDB chưa kết nối được. Kiểm tra lại Atlas network access." },
      { status: 503 }
    );
  }
  const payload = await request.json();
  await Model.findByIdAndUpdate(id, payload);

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
      { message: "MongoDB chưa kết nối được. Kiểm tra lại Atlas network access." },
      { status: 503 }
    );
  }
  await Model.findByIdAndDelete(id);

  return NextResponse.json({ message: "Đã xóa thành công." });
}
