import { Schema, model, models } from "mongoose";

const NotificationLogSchema = new Schema(
  {
    channel: { type: String, enum: ["zalo_oa", "email", "internal"], default: "email", index: true },
    recipient: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["draft", "queued", "sent", "delivered", "read", "failed"], default: "draft", index: true },
    externalId: { type: String, default: "", trim: true },
    sentAt: { type: String, default: "" },
    deliveredAt: { type: String, default: "" },
    readAt: { type: String, default: "" },
    errorMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

NotificationLogSchema.index({ status: 1, createdAt: -1 });
NotificationLogSchema.index({ externalId: 1 });

export const NotificationLogModel = models.NotificationLog || model("NotificationLog", NotificationLogSchema);
