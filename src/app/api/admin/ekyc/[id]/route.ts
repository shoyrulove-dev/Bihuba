import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { rejectCrossSiteRequest } from "@/lib/request-security";
import { slugify } from "@/lib/slug";
import { EkycApplicationModel } from "@/models/ekyc-application";
import { MemberModel } from "@/models/member";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const rejected = rejectCrossSiteRequest(request);
  if (rejected) return rejected;

  const session = await requireAdminUser();
  if (session.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  if (!(await connectToDatabase())) return NextResponse.json({ message: "Dữ liệu chưa sẵn sàng." }, { status: 503 });

  const { id } = await context.params;
  const action = String((await request.formData()).get("action") || "");
  const application = await EkycApplicationModel.findById(id);
  if (!application) return NextResponse.json({ message: "Không tìm thấy hồ sơ." }, { status: 404 });

  if (action === "approve") {
    const member = application.memberId
      ? await MemberModel.findById(application.memberId)
      : await MemberModel.create({
          name: application.companyName,
          slug: `${slugify(application.companyName)}-${application.taxCode.slice(-4)}`,
          memberType: "business",
          groupType: "Hội viên E-KYC",
          description: "Hồ sơ được xác minh qua Cổng E-KYC BIHUBA.",
          logo: application.logoUrl,
          address: application.address,
          phone: application.phone,
          email: application.email,
          website: application.website,
          industry: application.industry,
          coverImage: "",
          introImage: "",
          companyTagline: `Đại diện: ${application.representativeName}`,
          products: [],
        });
    if (!member) return NextResponse.json({ message: "Không thể tạo hồ sơ hội viên." }, { status: 500 });
    application.status = "approved";
    application.memberId = member._id;
    application.reportReason = "";
  } else if (action === "reject") {
    application.status = "rejected";
  } else {
    return NextResponse.json({ message: "Thao tác không hợp lệ." }, { status: 400 });
  }

  application.reviewedAt = new Date();
  application.reviewedBy = session.userId;
  await application.save();
  return NextResponse.redirect(new URL("/admin/ekyc", request.url), { status: 303 });
}
