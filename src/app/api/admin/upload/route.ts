import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminUser } from "@/lib/auth";

export const runtime = "nodejs";

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, "");
}

function buildFolder(baseFolder: string, requestedFolder: string) {
  const parts = [trimSlashes(baseFolder), trimSlashes(requestedFolder)].filter(Boolean);
  return parts.join("/") || "bihuba";
}

export async function POST(request: NextRequest) {
  const session = await getCurrentAdminUser();
  if (!session) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  const baseFolder = process.env.IMAGEKIT_BASE_FOLDER || "bihuba";

  if (!privateKey || !publicKey || !urlEndpoint) {
    return NextResponse.json(
      {
        message:
          "Thiếu cấu hình ImageKit. Cần IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY và IMAGEKIT_URL_ENDPOINT.",
      },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const requestedFolder = String(formData.get("folder") || "");
  const fileName = String(formData.get("fileName") || `bihuba-${Date.now()}`);

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Không tìm thấy file upload." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64File = Buffer.from(arrayBuffer).toString("base64");

  const imageKitForm = new URLSearchParams();
  imageKitForm.set("file", `data:${file.type || "application/octet-stream"};base64,${base64File}`);
  imageKitForm.set("fileName", fileName);
  imageKitForm.set("folder", buildFolder(baseFolder, requestedFolder));
  imageKitForm.set("useUniqueFileName", "true");

  const auth = Buffer.from(`${privateKey}:`).toString("base64");
  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: imageKitForm.toString(),
  });

  const result = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        message: result.message || "ImageKit upload thất bại.",
        details: result,
      },
      { status: response.status }
    );
  }

  return NextResponse.json({
    message: "Upload thành công.",
    url: result.url,
    thumbnailUrl: result.thumbnailUrl,
    fileId: result.fileId,
  });
}
