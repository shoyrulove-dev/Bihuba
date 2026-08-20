import { NextRequest, NextResponse } from "next/server";
import { getCurrentMemberUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { EkycApplicationModel } from "@/models/ekyc-application";
import { MemberModel } from "@/models/member";
import { recordActivity } from "@/lib/activity-log";

const editableFields = ["name", "industry", "address", "phone", "email", "website", "description", "logo", "coverImage", "introImage", "companyTagline"] as const;

export async function PATCH(request: NextRequest) {
  const session = await getCurrentMemberUser();
  if (!session) return NextResponse.json({ message: "Vui lòng đăng nhập lại." }, { status: 401 });
  if (!(await connectToDatabase())) return NextResponse.json({ message: "Chưa thể kết nối dữ liệu." }, { status: 503 });
  const application = await EkycApplicationModel.findOne({ userId: session.userId });
  if (!application?.memberId) return NextResponse.json({ message: "Không tìm thấy hồ sơ doanh nghiệp." }, { status: 404 });
  const body = (await request.json()) as Record<string, unknown>;
  const update = Object.fromEntries(editableFields.map((field) => [field, String(body[field] ?? "").trim()]));
  await MemberModel.findByIdAndUpdate(application.memberId, update, { runValidators: true });
  await recordActivity({ action: "profile_update", actorId: session.userId, actorName: session.name, actorRole: session.role, targetType: "member", targetId: String(application.memberId), description: "Hội viên cập nhật thông tin doanh nghiệp" });
  return NextResponse.json({ message: "Đã cập nhật hồ sơ doanh nghiệp." });
}
