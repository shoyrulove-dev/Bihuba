import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { EkycApplicationModel } from "@/models/ekyc-application";
import { MemberModel } from "@/models/member";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdminUser();
  if (session.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  await connectToDatabase();
  const { id } = await context.params;
  const action = String((await request.formData()).get("action") || "");
  const application = await EkycApplicationModel.findById(id);
  if (!application) return NextResponse.json({ message: "Không tìm thấy hồ sơ." }, { status: 404 });
  if (action === "approve") {
    const member = await MemberModel.create({ name: application.companyName, slug: `${slugify(application.companyName)}-${application.taxCode.slice(-4)}`, memberType: "business", groupType: "Hội viên E-KYC", description: "Hồ sơ được xác thực qua Cổng E-KYC BIHUBA.", logo: application.logoUrl, address: application.address, phone: application.phone, email: application.email, website: application.website, industry: application.industry, coverImage: "", introImage: "", companyTagline: `Đại diện: ${application.representativeName}`, products: [] });
    application.status = "approved"; application.memberId = member._id; application.reviewedAt = new Date(); application.reviewedBy = session.userId; application.reportReason = ""; await application.save();
  }
  return NextResponse.redirect(new URL("/admin/ekyc", request.url), { status: 303 });
}
