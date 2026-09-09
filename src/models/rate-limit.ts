import { Schema, model, models } from "mongoose";

const rateLimitSchema = new Schema(
  {
    _id: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { versionKey: false }
);

export const RateLimitModel = models.RateLimit || model("RateLimit", rateLimitSchema);
