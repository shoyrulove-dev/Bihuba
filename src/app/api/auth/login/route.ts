import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_DEFAULT,
  SESSION_MAX_AGE_REMEMBER,
  authenticateAdmin,
  createSessionToken,
} from "@/lib/auth";
import { getDefaultAdminPath } from "@/lib/permissions";
import { NextRequest, NextResponse } from "next/server";
import { recordActivity } from "@/lib/activity-log";
import { enforceRateLimit, rejectCrossSiteRequest, safeInternalPath } from "@/lib/request-security";

export async function POST(request: NextRequest) {
  const rejected = rejectCrossSiteRequest(request);
  if (rejected) return rejected;
  const limited = await enforceRateLimit(request, { scope: "admin-login", limit: 8, windowSeconds: 900 });
  if (limited) return limited;

  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = safeInternalPath(String(formData.get("next") ?? "/admin"), "/admin");
  const remember = String(formData.get("remember") ?? "") === "30d";
  const user = await authenticateAdmin(username, password);

  if (!user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  if (user.role === "business") {
    return NextResponse.redirect(new URL("/hoi-vien/dang-nhap?error=member", request.url), { status: 303 });
  }

  const targetPath =
    nextPath === "/hoi-vien/dashboard"
      ? "/admin"
      : nextPath === "/admin" && user.role !== "admin"
        ? await getDefaultAdminPath(user)
        : nextPath;

  const response = NextResponse.redirect(new URL(targetPath, request.url), {
    status: 303,
  });
  await recordActivity({ action: "admin_login", actorId: user.userId, actorName: user.name, actorRole: user.role, targetType: "session", description: "Đăng nhập khu vực quản trị" });
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
