import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, changeAdminPassword, getCurrentMemberUser } from "@/lib/auth";
import { rejectCrossSiteRequest } from "@/lib/request-security";

export async function POST(request: NextRequest) {
  const rejected = rejectCrossSiteRequest(request);
  if (rejected) return rejected;
  const session = await getCurrentMemberUser();
  if (!session) return NextResponse.json({ message: "Vui lòng đăng nhập lại." }, { status: 401 });
  const body = (await request.json()) as { currentPassword?: string; nextPassword?: string };
  if (!body.nextPassword || body.nextPassword.length < 8 || body.nextPassword.length > 128) return NextResponse.json({ message: "Mật khẩu mới cần từ 8 đến 128 ký tự." }, { status: 400 });
  const verified = await authenticateAdmin(session.username, body.currentPassword || "");
  if (!verified || verified.userId !== session.userId) return NextResponse.json({ message: "Mật khẩu hiện tại chưa đúng." }, { status: 400 });
  await changeAdminPassword(session.userId, body.nextPassword);
  return NextResponse.json({ message: "Đã đổi mật khẩu." });
}
