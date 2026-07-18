import { DownloadShape } from "@/types/cms";

function getExtensionFromUrl(url?: string) {
  if (!url) return "";

  const pathname = url.split("?")[0]?.split("#")[0] ?? "";
  const segments = pathname.split(".");
  return segments.length > 1 ? segments.pop()?.toLowerCase() ?? "" : "";
}

export function getDownloadFormat(item: DownloadShape) {
  return (item.fileFormat || getExtensionFromUrl(item.fileUrl) || "file").toUpperCase();
}

export function isPdfDownload(item: DownloadShape) {
  return getDownloadFormat(item) === "PDF";
}

export function getDownloadTypeLabel(item: DownloadShape) {
  return item.documentType || item.category || "Tài liệu";
}
