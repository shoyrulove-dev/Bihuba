import { ADMIN_SESSION_COOKIE, getAdminCredentials } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin");
  const credentials = getAdminCredentials();

  if (
    username !== credentials.username ||
    password !== credentials.password
  ) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), {
    status: 303,
  });
  response.cookies.set(ADMIN_SESSION_COOKIE, credentials.sessionSecret, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 303,
  });
}
