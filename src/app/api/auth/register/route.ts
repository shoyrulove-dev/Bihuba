import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_REMEMBER,
  createSessionToken,
  getNextUserId,
  hashPassword,
} from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";

function redirectWithError(request: NextRequest, message: string) {
  const url = new URL("/", request.url);
  url.searchParams.set("auth", "register");
  url.searchParams.set("error", message);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const nextPath = String(formData.get("next") ?? "/admin/posts");

  if (!email || !email.includes("@") || password.length < 6 || !phone) {
    return redirectWithError(request, "invalid");
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return redirectWithError(request, "database");
  }

  const existed = await UserModel.findOne({
    $or: [{ username: email }, { email }],
  }).lean();

  if (existed) {
    return redirectWithError(request, "existed");
  }

  const userId = await getNextUserId();
  const name = email.split("@")[0] || "Doanh nghiệp";

  await UserModel.create({
    userId,
    name,
    username: email,
    email,
    phone,
    role: "business",
    permissions: ["posts"],
    passwordHash: hashPassword(password),
    isProtected: false,
  });

  const sessionUser = {
    userId,
    username: email,
    role: "business" as const,
    name,
  };
  const response = NextResponse.redirect(new URL(nextPath, request.url), { status: 303 });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(sessionUser, SESSION_MAX_AGE_REMEMBER), {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
    maxAge: SESSION_MAX_AGE_REMEMBER,
  });

  return response;
}
