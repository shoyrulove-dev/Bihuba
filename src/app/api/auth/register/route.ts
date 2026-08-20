import { NextRequest, NextResponse } from "next/server";

// Business accounts must complete the E-KYC form. This endpoint remains only
// for compatibility with older links and cannot bypass onboarding.
export async function POST(request: NextRequest) {
  return NextResponse.redirect(new URL("/dang-ky-hoi-vien", request.url), { status: 303 });
}
