import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { NotificationLogModel } from "@/models/notification-log";
import { recordActivity } from "@/lib/activity-log";

const statusMap: Record<string, "delivered" | "read" | "failed"> = {
  delivered: "delivered", received: "delivered", read: "read", failed: "failed", error: "failed",
};

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.ZALO_OA_WEBHOOK_SECRET;
  if (!expectedSecret || request.headers.get("x-bihuba-webhook-secret") !== expectedSecret) {
    return NextResponse.json({ message: "Webhook không hợp lệ." }, { status: 401 });
  }
  const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!payload || !(await connectToDatabase())) return NextResponse.json({ message: "Dữ liệu không hợp lệ." }, { status: 400 });
  const externalId = String(payload.message_id || payload.messageId || payload.externalId || "");
  const rawStatus = String(payload.status || payload.event_name || payload.event || "").toLowerCase();
  const status = statusMap[rawStatus];
  if (!externalId || !status) return NextResponse.json({ ok: true, ignored: true });
  const now = new Date().toISOString();
  const update: Record<string, unknown> = { status };
  if (status === "delivered") update.deliveredAt = now;
  if (status === "read") update.readAt = now;
  if (status === "failed") update.errorMessage = String(payload.error || payload.message || "Zalo OA phản hồi lỗi");
  const notification = await NotificationLogModel.findOneAndUpdate({ externalId }, update, { new: true }).lean();
  if (notification) await recordActivity({ action: "zalo_webhook", actorName: "Zalo OA", actorRole: "system", targetType: "notification", targetId: String(notification._id), description: `Zalo OA cập nhật trạng thái ${status}` });
  return NextResponse.json({ ok: true });
}
