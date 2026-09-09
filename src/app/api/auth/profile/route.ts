import { NextRequest, NextResponse } from "next/server";
import { changeAdminPassword, getCurrentAdminUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";
import { rejectCrossSiteRequest } from "@/lib/request-security";

export async function POST(request: NextRequest) {
  const rejected = rejectCrossSiteRequest(request);
  if (rejected) return rejected;
  const session = await getCurrentAdminUser();
  if (!session) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return NextResponse.json({ message: "MongoDB chưa kết nối." }, { status: 503 });
  }

  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!name) {
    return NextResponse.json({ message: "Tên hiển thị không được để trống." }, { status: 400 });
  }

  if (password && (password.length < 12 || password.length > 128)) {
    return NextResponse.json({ message: "Mật khẩu mới cần từ 12 đến 128 ký tự." }, { status: 400 });
  }

  await UserModel.findOneAndUpdate({ userId: session.userId }, { name }, { runValidators: true });

  if (password) {
    await changeAdminPassword(session.userId, password);
  }

  return NextResponse.redirect(new URL("/admin/profile", request.url), { status: 303 });
}
