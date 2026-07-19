import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_DEFAULT,
  SESSION_MAX_AGE_REMEMBER,
  authenticateAdmin,
  createSessionToken,
} from "@/lib/auth";
import { getDefaultAdminPath } from "@/lib/permissions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin");
  const remember = String(formData.get("remember") ?? "") === "30d";
  const user = await authenticateAdmin(username, password);

  if (!user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const targetPath = nextPath === "/admin" && user.role !== "admin" ? await getDefaultAdminPath(user) : nextPath;

  const response = NextResponse.redirect(new URL(targetPath, request.url), {
    status: 303,
  });
  const maxAge = remember ? SESSION_MAX_AGE_REMEMBER : SESSION_MAX_AGE_DEFAULT;
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(user, maxAge), {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
    maxAge,
  });

  return response;
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 303,
  });
}
