import { MEMBER_SESSION_COOKIE } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/hoi-vien/dang-nhap", request.url), { status: 303 });
  response.cookies.set(MEMBER_SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge: 0 });
  return response;
}
