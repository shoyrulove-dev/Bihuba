import { EkycApplicationModel } from "@/models/ekyc-application";

export const E_KYC_REQUIRED_FIELDS = ["companyName", "taxCode", "industry", "address", "representativeName", "email", "phone", "logoUrl", "certificateUrl"] as const;

export type EkycPayload = Record<(typeof E_KYC_REQUIRED_FIELDS)[number] | "website", string>;

export function assessEkyc(payload: EkycPayload) {
  const missing = E_KYC_REQUIRED_FIELDS.filter((field) => !payload[field]?.trim());
  const reasons: string[] = [];
  if (missing.length) reasons.push(`Thiếu trường bắt buộc: ${missing.join(", ")}`);
  if (!/^\d{10}(?:-\d{3})?$/.test(payload.taxCode.replace(/\s/g, ""))) reasons.push("Mã số thuế chưa đúng định dạng.");
  if (!/^\S+@\S+\.\S+$/.test(payload.email)) reasons.push("Email chưa đúng định dạng.");
  if (payload.phone.replace(/\D/g, "").length < 9) reasons.push("Số điện thoại chưa hợp lệ.");
  if (!/^https:\/\//.test(payload.logoUrl) || !/^https:\/\//.test(payload.certificateUrl)) reasons.push("Tệp xác minh chưa tải lên thành công.");
  return { approved: reasons.length === 0, reasons, missing };
}

export async function getEkycByUserId(userId: number) {
  return EkycApplicationModel.findOne({ userId }).lean();
}
