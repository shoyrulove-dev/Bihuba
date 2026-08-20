import { headers } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import { ActivityLogModel } from "@/models/activity-log";

type ActivityInput = {
  action: string;
  actorId?: number | null;
  actorName?: string;
  actorRole?: string;
  targetType?: string;
  targetId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
};

export async function recordActivity(input: ActivityInput) {
  try {
    if (!(await connectToDatabase())) return;
    let ipAddress = input.ipAddress || "";
    let userAgent = input.userAgent || "";
    if (!ipAddress || !userAgent) {
      const requestHeaders = await headers();
      ipAddress ||= requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
      userAgent ||= requestHeaders.get("user-agent") || "";
    }
    await ActivityLogModel.create({ ...input, ipAddress, userAgent });
  } catch (error) {
    console.warn("Unable to record BIHUBA activity", error);
  }
}
