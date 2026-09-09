import assert from "node:assert/strict";
import test from "node:test";
import { safeInternalPath } from "../src/lib/request-security";
import { assessEkyc } from "../src/lib/ekyc";

test("safeInternalPath accepts local paths and blocks external redirects", () => {
  assert.equal(safeInternalPath("/admin/posts", "/admin"), "/admin/posts");
  assert.equal(safeInternalPath("//evil.example", "/admin"), "/admin");
  assert.equal(safeInternalPath("https://evil.example", "/admin"), "/admin");
  assert.equal(safeInternalPath("/\\evil.example", "/admin"), "/admin");
});

test("E-KYC format checks do not treat incomplete data as valid", () => {
  const result = assessEkyc({
    companyName: "",
    taxCode: "abc",
    industry: "",
    address: "",
    representativeName: "",
    email: "invalid",
    phone: "123",
    logoUrl: "http://example.com/logo.png",
    certificateUrl: "",
    website: "",
  });
  assert.equal(result.approved, false);
  assert.ok(result.missing.length > 0);
  assert.ok(result.reasons.length > 0);
});

test("E-KYC format checks accept a structurally complete application", () => {
  const result = assessEkyc({
    companyName: "Công ty BIHUBA",
    taxCode: "0312345678",
    industry: "Sản xuất",
    address: "TP.HCM",
    representativeName: "Nguyễn Văn A",
    email: "contact@example.com",
    phone: "0901234567",
    logoUrl: "https://ik.imagekit.io/bihuba/logo.webp",
    certificateUrl: "https://ik.imagekit.io/bihuba/certificate.pdf",
    website: "https://example.com",
  });
  assert.equal(result.approved, true);
});
