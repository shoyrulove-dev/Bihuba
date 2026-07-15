import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, getAdminCredentials } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/auth/login")
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const { sessionSecret } = getAdminCredentials();
  const isAuthorized = session === sessionSecret;

  if (pathname.startsWith("/api/admin")) {
    if (!isAuthorized) {
      return NextResponse.json(
        { message: "Unauthorized admin request." },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !isAuthorized) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
