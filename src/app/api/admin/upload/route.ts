import { createHmac, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminUser } from "@/lib/auth";
import { canUploadAssets } from "@/lib/permissions";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, "");
}

function buildFolder(baseFolder: string, requestedFolder: string) {
  const parts = [trimSlashes(baseFolder), trimSlashes(requestedFolder)].filter(Boolean);
  return parts.join("/") || "bihuba";
}

async function authorizeUpload() {
  const session = await getCurrentAdminUser();
  if (!session) {
    return { error: NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 }) };
  }

  if (!(await canUploadAssets(session))) {
    return {
      error: NextResponse.json(
        { message: "Tài khoản chưa được cấp quyền upload." },
        { status: 403 }
      ),
    };
  }

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  const baseFolder = process.env.IMAGEKIT_BASE_FOLDER || "bihuba";

  if (!privateKey || !publicKey || !urlEndpoint) {
    return {
      error: NextResponse.json(
        {
          message:
            "Thiếu cấu hình ImageKit. Cần IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY và IMAGEKIT_URL_ENDPOINT.",
        },
        { status: 503 }
      ),
    };
  }

  return { privateKey, publicKey, baseFolder };
}

export async function GET(request: NextRequest) {
  const auth = await authorizeUpload();
  if ("error" in auth) return auth.error;

  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 20 * 60;
  const signature = createHmac("sha1", auth.privateKey)
    .update(`${token}${expire}`)
    .digest("hex");
  const requestedFolder = request.nextUrl.searchParams.get("folder") || "";

  return NextResponse.json({
    token,
    expire,
    signature,
    publicKey: auth.publicKey,
    folder: buildFolder(auth.baseFolder, requestedFolder),
    maxFileSize: MAX_UPLOAD_BYTES,
  });
}

// Binary fallback for older clients. The current admin uploads directly to
// ImageKit after obtaining a short-lived signature from GET.
export async function POST(request: NextRequest) {
  const auth = await authorizeUpload();
  if ("error" in auth) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const requestedFolder = String(formData.get("folder") || "");
    const fileName = String(formData.get("fileName") || `bihuba-${Date.now()}`);

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Không tìm thấy file upload." }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { message: "File vượt quá giới hạn 25MB. Hãy tải lên Google Drive rồi dán link chia sẻ." },
        { status: 413 }
      );
    }

    const imageKitForm = new FormData();
    imageKitForm.set("file", file, fileName);
    imageKitForm.set("fileName", fileName);
    imageKitForm.set("folder", buildFolder(auth.baseFolder, requestedFolder));
    imageKitForm.set("useUniqueFileName", "true");

    const response = await fetch(IMAGEKIT_UPLOAD_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${auth.privateKey}:`).toString("base64")}`,
      },
      body: imageKitForm,
      signal: AbortSignal.timeout(120_000),
    });

    const result = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    if (!response.ok) {
      return NextResponse.json(
        {
          message: String(result.message || "ImageKit upload thất bại."),
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
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return NextResponse.json(
      {
        message: timedOut
          ? "ImageKit phản hồi quá chậm. Vui lòng thử lại."
          : "Không thể tải file lên ImageKit. Vui lòng kiểm tra mạng và thử lại.",
      },
      { status: timedOut ? 504 : 502 }
    );
  }
}
