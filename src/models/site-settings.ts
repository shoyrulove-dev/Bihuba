import { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    siteName: { type: String, required: true },
    shortName: { type: String, required: true },
    slogan: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroCtaLabel: { type: String, default: "" },
    heroCtaHref: { type: String, default: "" },
    introTitle: { type: String, default: "" },
    introBody: { type: String, default: "" },
    memberStats: { type: Array, default: [] },
    nav: { type: Array, default: [] },
    contact: { type: Object, default: {} },
  },
  { timestamps: true }
);

export const SiteSettingsModel =
  models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
