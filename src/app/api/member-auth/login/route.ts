import { MEMBER_SESSION_COOKIE, SESSION_MAX_AGE_DEFAULT, SESSION_MAX_AGE_REMEMBER, authenticateAdmin, createSessionToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { recordActivity } from "@/lib/activity-log";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const user = await authenticateAdmin(String(formData.get("username") ?? ""), String(formData.get("password") ?? ""));
  if (!user || user.role !== "business") return NextResponse.redirect(new URL("/hoi-vien/dang-nhap?error=1", request.url), { status: 303 });
  const maxAge = String(formData.get("remember") ?? "") === "30d" ? SESSION_MAX_AGE_REMEMBER : SESSION_MAX_AGE_DEFAULT;
  const response = NextResponse.redirect(new URL("/hoi-vien/dashboard", request.url), { status: 303 });
  await recordActivity({ action: "member_login", actorId: user.userId, actorName: user.name, actorRole: user.role, targetType: "session", description: "Đăng nhập khu vực hội viên" });
  response.cookies.set(MEMBER_SESSION_COOKIE, createSessionToken(user, maxAge), { httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge });
  return response;
}

export async function GET(request: NextRequest) { return NextResponse.redirect(new URL("/hoi-vien/dang-nhap", request.url), { status: 303 }); }
