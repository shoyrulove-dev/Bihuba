import { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    siteName: { type: String, required: true },
    shortName: { type: String, required: true },
    logoUrl: { type: String, default: "/bihuba-mark.svg" },
    slogan: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroImage: { type: String, default: "/bihuba-hero-generated.svg" },
    heroCtaLabel: { type: String, default: "" },
    heroCtaHref: { type: String, default: "" },
    introTitle: { type: String, default: "" },
    introBody: { type: String, default: "" },
    memberStats: { type: Array, default: [] },
    nav: { type: Array, default: [] },
    contact: { type: Object, default: {} },
    floatingActions: { type: Object, default: {} },
    supporterCompanies: { type: Array, default: [] },
    theme: { type: Object, default: {} },
  },
  { timestamps: true }
);

export const SiteSettingsModel =
  models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
