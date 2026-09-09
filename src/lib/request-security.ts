import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { RateLimitModel } from "@/models/rate-limit";

type RateLimitOptions = {
  scope: string;
  limit: number;
  windowSeconds: number;
};

function requestAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function hashedKey(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}

export async function enforceRateLimit(request: Request, options: RateLimitOptions) {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  const bucket = Math.floor(now / windowMs);
  const id = `${options.scope}:${hashedKey(requestAddress(request))}:${bucket}`;
  const expiresAt = new Date((bucket + 2) * windowMs);

  if (!(await connectToDatabase())) return null;

  const record = await RateLimitModel.findOneAndUpdate(
    { _id: id },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  if (Number(record?.count || 0) <= options.limit) return null;

  return NextResponse.json(
    { message: "Bạn thao tác quá nhanh. Vui lòng thử lại sau." },
    {
      status: 429,
      headers: { "Retry-After": String(options.windowSeconds) },
    }
  );
}

export function rejectCrossSiteRequest(request: NextRequest) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") {
    return NextResponse.json({ message: "Yêu cầu không hợp lệ." }, { status: 403 });
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) {
        return NextResponse.json({ message: "Yêu cầu không hợp lệ." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ message: "Yêu cầu không hợp lệ." }, { status: 403 });
    }
  }

  return null;
}

export function rejectOversizedBody(request: Request, maxBytes: number) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return NextResponse.json({ message: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
  }
  return null;
}

export function safeInternalPath(value: string, fallback: string) {
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
  return value;
}
