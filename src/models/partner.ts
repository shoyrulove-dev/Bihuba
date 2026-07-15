import { Schema, model, models } from "mongoose";

const PartnerSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    logo: { type: String, default: "" },
    website: { type: String, default: "" },
    partnerType: { type: String, default: "" },
  },
  { timestamps: true }
);

export const PartnerModel = models.Partner || model("Partner", PartnerSchema);
