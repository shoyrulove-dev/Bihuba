export const IMAGEKIT_UPLOAD_NOTE =
  "ImageKit Free: ảnh/audio/raw tối đa 25MB/file, video 100MB. Lite: 40MB/300MB video. Pro: 50MB/2GB video. File quá lớn nên upload Google Drive rồi dán link chia sẻ vào ô URL.";

const MAX_IMAGEKIT_FILE_SIZE = 25 * 1024 * 1024;

export async function uploadAdminAsset(file: File, folder: string) {
  if (file.size > MAX_IMAGEKIT_FILE_SIZE) {
    throw new Error("File vượt quá giới hạn 25MB. Hãy tải lên Google Drive rồi dán link chia sẻ vào ô URL.");
  }
  const authResponse = await fetch(`/api/admin/upload?folder=${encodeURIComponent(folder)}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
  });
  const authResult = (await authResponse.json().catch(() => ({}))) as Record<string, unknown>;
  if (!authResponse.ok) throw new Error(String(authResult.message || "Không thể xác thực phiên tải file."));

  const payload = new FormData();
  payload.append("file", file);
  payload.append("fileName", file.name);
  payload.append("folder", String(authResult.folder || folder));
  payload.append("useUniqueFileName", "true");
  payload.append("publicKey", String(authResult.publicKey || ""));
  payload.append("token", String(authResult.token || ""));
  payload.append("expire", String(authResult.expire || ""));
  payload.append("signature", String(authResult.signature || ""));

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: payload,
    signal: AbortSignal.timeout(120_000),
  });
  const result = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok || !result.url) throw new Error(String(result.message || "Tải lên ImageKit thất bại."));
  return String(result.url);
}
