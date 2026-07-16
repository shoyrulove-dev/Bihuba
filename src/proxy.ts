import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, parseSessionToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/auth/login")
  ) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthorized = Boolean(parseSessionToken(session));

  if (pathname.startsWith("/api/admin")) {
    if (!isAuthorized) {
      return NextResponse.json(
        { message: "Unauthorized admin request." },
        { status: 401 }
      );
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (pathname.startsWith("/admin") && !isAuthorized) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
