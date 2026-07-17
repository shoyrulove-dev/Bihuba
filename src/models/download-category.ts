import { Schema, model, models } from "mongoose";

const DownloadCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const DownloadCategoryModel =
  models.DownloadCategory || model("DownloadCategory", DownloadCategorySchema);
