import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminUser, getCurrentMemberUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { recordActivity } from "@/lib/activity-log";
import { DownloadModel } from "@/models/download";

type Context = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, context: Context) {
  const { slug } = await context.params;
  if (!(await connectToDatabase())) return NextResponse.redirect(new URL("/download", request.url));
  const document = await DownloadModel.findOne({ slug }).lean();
  if (!document?.fileUrl) return NextResponse.redirect(new URL(`/download/${slug}`, request.url));
  const session = (await getCurrentMemberUser()) || (await getCurrentAdminUser());
  await recordActivity({ action: "document_download", actorId: session?.userId, actorName: session?.name || "Khách", actorRole: session?.role || "guest", targetType: "download", targetId: String(document._id), description: `Tải tài liệu: ${document.title}` });
  return NextResponse.redirect(new URL(String(document.fileUrl), request.url));
}
