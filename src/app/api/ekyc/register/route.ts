import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, SESSION_MAX_AGE_REMEMBER, createSessionToken, getNextUserId, hashPassword } from "@/lib/auth";
import { assessEkyc, type EkycPayload } from "@/lib/ekyc";
import { slugify } from "@/lib/slug";
import { connectToDatabase } from "@/lib/db";
import { EkycApplicationModel } from "@/models/ekyc-application";
import { MemberModel } from "@/models/member";
import { UserModel } from "@/models/user";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, unknown>;
  const password = String(body.password || "");
  const payload = Object.fromEntries(Object.entries(body).map(([key, value]) => [key, String(value || "").trim()])) as EkycPayload;
  payload.email = payload.email.toLowerCase();
  payload.taxCode = payload.taxCode.replace(/\s/g, "");

  const assessment = assessEkyc(payload);
  if (assessment.missing.length || password.length < 8) {
    return NextResponse.json({ message: "Vui lòng điền đủ thông tin bắt buộc và đặt mật khẩu tối thiểu 8 ký tự." }, { status: 400 });
  }

  const connection = await connectToDatabase();
  if (!connection) return NextResponse.json({ message: "Hệ thống dữ liệu đang tạm thời chưa sẵn sàng." }, { status: 503 });

  const existed = await UserModel.findOne({ $or: [{ username: payload.email }, { email: payload.email }] }).lean();
  const existedTaxCode = await EkycApplicationModel.findOne({ taxCode: payload.taxCode }).lean();
  if (existed || existedTaxCode) return NextResponse.json({ message: "Email hoặc mã số thuế này đã được đăng ký." }, { status: 409 });

  const userId = await getNextUserId();
  await UserModel.create({
    userId, name: payload.companyName, username: payload.email, email: payload.email, phone: payload.phone,
    role: "business", permissions: ["posts"], passwordHash: hashPassword(password), isProtected: false,
  });

  let memberId = null;
  if (assessment.approved) {
    const member = await MemberModel.create({
      name: payload.companyName, slug: `${slugify(payload.companyName)}-${payload.taxCode.slice(-4)}`,
      memberType: "business", groupType: "Hội viên E-KYC", description: "Hồ sơ được tạo qua Cổng E-KYC BIHUBA.",
      logo: payload.logoUrl, address: payload.address, phone: payload.phone, email: payload.email, website: payload.website,
      industry: payload.industry, coverImage: "", introImage: "", companyTagline: `Đại diện: ${payload.representativeName}`, products: [],
    });
    memberId = member._id;
  }

  const application = await EkycApplicationModel.create({
    userId, ...payload, status: assessment.approved ? "approved" : "needs_review",
    autoCheck: { approved: assessment.approved, checkedAt: new Date().toISOString(), reasons: assessment.reasons },
    reportReason: assessment.reasons.join(" "), reportedAt: assessment.approved ? null : new Date(), memberId,
  });
  void application;

  const response = NextResponse.json({ status: assessment.approved ? "approved" : "needs_review", redirectTo: "/hoi-vien/dashboard" });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken({ userId, username: payload.email, role: "business", name: payload.companyName }, SESSION_MAX_AGE_REMEMBER), {
    httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge: SESSION_MAX_AGE_REMEMBER,
  });
  return response;
}
