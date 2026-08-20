import { Schema, model, models } from "mongoose";

const EkycApplicationSchema = new Schema(
  {
    userId: { type: Number, required: true, unique: true, index: true },
    companyName: { type: String, required: true, trim: true },
    taxCode: { type: String, required: true, trim: true, unique: true },
    industry: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    representativeName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    website: { type: String, default: "", trim: true },
    logoUrl: { type: String, required: true },
    certificateUrl: { type: String, required: true },
    status: { type: String, enum: ["approved", "needs_review", "rejected"], default: "needs_review", index: true },
    autoCheck: { type: Object, default: {} },
    reportReason: { type: String, default: "" },
    reportedAt: { type: Date, default: null },
    reviewedAt: { type: Date, default: null },
    reviewedBy: { type: Number, default: null },
    memberId: { type: Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

export const EkycApplicationModel = models.EkycApplication || model("EkycApplication", EkycApplicationSchema);
