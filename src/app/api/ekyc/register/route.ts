import { NextRequest, NextResponse } from "next/server";
import { MEMBER_SESSION_COOKIE, SESSION_MAX_AGE_REMEMBER, createSessionToken, getNextUserId, hashPassword } from "@/lib/auth";
import { assessEkyc, type EkycPayload } from "@/lib/ekyc";
import { connectToDatabase } from "@/lib/db";
import { EkycApplicationModel } from "@/models/ekyc-application";
import { UserModel } from "@/models/user";
import { enforceRateLimit, rejectCrossSiteRequest, rejectOversizedBody } from "@/lib/request-security";
import { verifyBusinessRegistration } from "@/lib/tax-verification";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const rejected = rejectCrossSiteRequest(request);
  if (rejected) return rejected;
  const oversized = rejectOversizedBody(request, 50_000);
  if (oversized) return oversized;
  const limited = await enforceRateLimit(request, { scope: "ekyc-register", limit: 5, windowSeconds: 3600 });
  if (limited) return limited;

  const body = (await request.json()) as Record<string, unknown>;
  const password = String(body.password || "");
  const payload = Object.fromEntries(Object.entries(body).map(([key, value]) => [key, String(value || "").trim()])) as EkycPayload;
  payload.email = payload.email.toLowerCase();
  payload.taxCode = payload.taxCode.replace(/\s/g, "");

  if (password.length > 128 || Object.values(payload).some((value) => value.length > 2000)) {
    return NextResponse.json({ message: "Một hoặc nhiều trường vượt quá độ dài cho phép." }, { status: 400 });
  }

  const assessment = assessEkyc(payload);
  if (assessment.missing.length || password.length < 12) {
    return NextResponse.json({ message: "Vui lòng điền đủ thông tin bắt buộc và đặt mật khẩu tối thiểu 12 ký tự." }, { status: 400 });
  }

  const imageKitEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  const allowedMediaHost = imageKitEndpoint ? new URL(imageKitEndpoint).host : "";
  const uploadedUrls = [payload.logoUrl, payload.certificateUrl];
  if (!allowedMediaHost || uploadedUrls.some((value) => {
    try { return new URL(value).host !== allowedMediaHost; } catch { return true; }
  })) {
    return NextResponse.json({ message: "Tệp xác minh không thuộc kho lưu trữ BIHUBA." }, { status: 400 });
  }

  const connection = await connectToDatabase();
  if (!connection) return NextResponse.json({ message: "Hệ thống dữ liệu đang tạm thời chưa sẵn sàng." }, { status: 503 });

  const existed = await UserModel.findOne({ $or: [{ username: payload.email }, { email: payload.email }] }).lean();
  const existedTaxCode = await EkycApplicationModel.findOne({ taxCode: payload.taxCode }).lean();
  if (existed || existedTaxCode) return NextResponse.json({ message: "Email hoặc mã số thuế này đã được đăng ký." }, { status: 409 });

  const userId = await getNextUserId();
  const taxVerification = await verifyBusinessRegistration({ taxCode: payload.taxCode, companyName: payload.companyName, certificateUrl: payload.certificateUrl });
  await UserModel.create({
    userId, name: payload.companyName, username: payload.email, email: payload.email, phone: payload.phone,
    role: "business", permissions: ["posts"], passwordHash: await hashPassword(password), isProtected: false,
  });

  const application = await EkycApplicationModel.create({
    userId, ...payload, status: "needs_review",
    autoCheck: { approved: false, formatChecksPassed: assessment.approved, taxVerification, checkedAt: new Date().toISOString(), reasons: [...assessment.reasons, ...taxVerification.reasons] },
    reportReason: [...assessment.reasons, ...taxVerification.reasons].join(" ") || "Hồ sơ mới đang chờ Văn phòng BIHUBA xác minh.",
    reportedAt: new Date(), memberId: null,
  });
  void application;

  const response = NextResponse.json({ status: "needs_review", redirectTo: "/hoi-vien/dashboard" });
  response.cookies.set(MEMBER_SESSION_COOKIE, createSessionToken({ userId, username: payload.email, role: "business", name: payload.companyName, sessionVersion: 1 }, SESSION_MAX_AGE_REMEMBER), {
    httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge: SESSION_MAX_AGE_REMEMBER,
  });
  return response;
}
