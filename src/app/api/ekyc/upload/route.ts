import { createHmac, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

export async function POST(request: NextRequest) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  if (!privateKey || !publicKey) return NextResponse.json({ message: "Dịch vụ upload chưa được cấu hình." }, { status: 503 });
  const formData = await request.formData();
  const file = formData.get("file");
  const kind = String(formData.get("kind") || "document");
  if (!(file instanceof File) || file.size > 10 * 1024 * 1024) return NextResponse.json({ message: "Tệp không hợp lệ hoặc vượt 10 MB." }, { status: 400 });
  if (kind === "logo" && !file.type.startsWith("image/")) return NextResponse.json({ message: "Logo phải là ảnh JPG, PNG hoặc WebP." }, { status: 400 });
  if (kind === "certificate" && !["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(file.type)) return NextResponse.json({ message: "Giấy phép cần là PDF, JPG, PNG hoặc WebP." }, { status: 400 });
  const token = randomUUID(); const expire = Math.floor(Date.now() / 1000) + 600;
  const signature = createHmac("sha1", privateKey).update(`${token}${expire}`).digest("hex");
  const imageKitForm = new FormData();
  imageKitForm.set("file", file, file.name); imageKitForm.set("fileName", `ekyc-${kind}-${Date.now()}-${file.name}`);
  imageKitForm.set("folder", `${process.env.IMAGEKIT_BASE_FOLDER || "bihuba"}/ekyc/${kind}`); imageKitForm.set("useUniqueFileName", "true");
  // Store member logos in one predictable square format. Verification files are
  // deliberately kept untouched so the reviewer never loses legal information.
  if (kind === "logo") imageKitForm.set("transformation", JSON.stringify({ pre: "w-640,h-640,c-maintain_ratio,q-85" }));
  imageKitForm.set("token", token); imageKitForm.set("expire", String(expire)); imageKitForm.set("signature", signature); imageKitForm.set("publicKey", publicKey);
  const result = await fetch(IMAGEKIT_UPLOAD_URL, { method: "POST", body: imageKitForm, signal: AbortSignal.timeout(120000) }).then(async (response) => ({ ok: response.ok, status: response.status, body: await response.json().catch(() => ({})) }));
  if (!result.ok) return NextResponse.json({ message: "Không thể tải tệp xác minh. Vui lòng thử lại." }, { status: result.status });
  return NextResponse.json({ url: result.body.url });
}
