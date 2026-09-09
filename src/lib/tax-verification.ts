export type TaxVerificationResult = {
  provider: "trustid" | "government" | "none";
  status: "verified" | "mismatch" | "unavailable";
  taxCode?: string;
  companyName?: string;
  reasons: string[];
  checkedAt: string;
};

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function findString(value: unknown, keys: string[]): string {
  if (!value || typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  for (const [key, item] of Object.entries(record)) {
    if (keys.includes(normalize(key)) && typeof item === "string" && item.trim()) return item.trim();
  }
  for (const item of Object.values(record)) {
    if (Array.isArray(item)) {
      for (const child of item) {
        const found = findString(child, keys);
        if (found) return found;
      }
    } else if (item && typeof item === "object") {
      const found = findString(item, keys);
      if (found) return found;
    }
  }
  return "";
}

function compareResult(provider: TaxVerificationResult["provider"], data: unknown, expectedTaxCode: string, expectedName: string) {
  const taxCode = findString(data, ["taxcode", "masothue", "enterprisecode", "businesscode", "registrationnumber"]);
  const companyName = findString(data, ["companyname", "enterprisename", "businessname", "tendoanhnghiep", "name"]);
  const reasons: string[] = [];
  if (!taxCode) reasons.push("Nhà cung cấp không trả về mã số thuế.");
  else if (normalize(taxCode) !== normalize(expectedTaxCode)) reasons.push("Mã số thuế trên giấy tờ không khớp hồ sơ.");
  if (!companyName) reasons.push("Nhà cung cấp không trả về tên doanh nghiệp.");
  else {
    const actual = normalize(companyName);
    const expected = normalize(expectedName);
    if (!actual.includes(expected) && !expected.includes(actual)) reasons.push("Tên doanh nghiệp trên giấy tờ không khớp hồ sơ.");
  }
  return { provider, status: reasons.length ? "mismatch" : "verified", taxCode, companyName, reasons, checkedAt: new Date().toISOString() } satisfies TaxVerificationResult;
}

export async function verifyBusinessRegistration(input: { taxCode: string; companyName: string; certificateUrl: string }): Promise<TaxVerificationResult> {
  const governmentUrl = process.env.TAX_VERIFICATION_API_URL;
  const governmentToken = process.env.TAX_VERIFICATION_API_TOKEN;
  try {
    if (governmentUrl && governmentToken) {
      const url = new URL(governmentUrl);
      url.searchParams.set("taxCode", input.taxCode);
      const response = await fetch(url, { headers: { Authorization: `Bearer ${governmentToken}` }, signal: AbortSignal.timeout(15_000) });
      if (!response.ok) throw new Error(`Government API ${response.status}`);
      return compareResult("government", await response.json(), input.taxCode, input.companyName);
    }

    const apiKey = process.env.TRUSTID_API_KEY;
    const apiSecret = process.env.TRUSTID_API_SECRET;
    if (apiKey && apiSecret) {
      const url = new URL("https://ekyc-api.trustid.vn/api/v2/ocr/document/business_registration");
      url.searchParams.set("img", input.certificateUrl);
      url.searchParams.set("format_type", "url");
      url.searchParams.set("get_thumb", "false");
      const authorization = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
      const response = await fetch(url, { headers: { Authorization: `Basic ${authorization}` }, signal: AbortSignal.timeout(20_000) });
      if (!response.ok) throw new Error(`TrustID API ${response.status}`);
      return compareResult("trustid", await response.json(), input.taxCode, input.companyName);
    }
  } catch (error) {
    return { provider: governmentUrl ? "government" : "trustid", status: "unavailable", reasons: [error instanceof Error ? error.message : "Dịch vụ xác minh không phản hồi."], checkedAt: new Date().toISOString() };
  }

  return { provider: "none", status: "unavailable", reasons: ["Chưa cấu hình nhà cung cấp xác minh mã số thuế."], checkedAt: new Date().toISOString() };
}
