import { createHmac, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function isValidKind(value: string): value is "logo" | "certificate" {
  return value === "logo" || value === "certificate";
}

// Files are uploaded from the browser straight to ImageKit. This avoids the
// 4.5 MB request-body ceiling imposed by Vercel Functions.
export async function GET(request: NextRequest) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const kind = String(request.nextUrl.searchParams.get("kind") || "");
  if (!privateKey || !publicKey) return NextResponse.json({ message: "Dịch vụ tải tệp chưa sẵn sàng." }, { status: 503 });
  if (!isValidKind(kind)) return NextResponse.json({ message: "Loại tệp không hợp lệ." }, { status: 400 });

  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 10 * 60;
  return NextResponse.json({
    token,
    expire,
    signature: createHmac("sha1", privateKey).update(`${token}${expire}`).digest("hex"),
    publicKey,
    folder: `${process.env.IMAGEKIT_BASE_FOLDER || "bihuba"}/ekyc/${kind}`,
    maxFileSize: MAX_UPLOAD_BYTES,
  });
}
