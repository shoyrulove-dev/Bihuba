import { Schema, model, models } from "mongoose";

const ActivityLogSchema = new Schema(
  {
    action: { type: String, required: true, index: true },
    actorId: { type: Number, default: null, index: true },
    actorName: { type: String, default: "Khách" },
    actorRole: { type: String, default: "guest", index: true },
    targetType: { type: String, default: "", index: true },
    targetId: { type: String, default: "" },
    description: { type: String, default: "" },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ actorId: 1, createdAt: -1 });
ActivityLogSchema.index({ targetType: 1, createdAt: -1 });

export const ActivityLogModel = models.ActivityLog || model("ActivityLog", ActivityLogSchema);
