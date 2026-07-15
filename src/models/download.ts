import { Schema, model, models } from "mongoose";

const DownloadSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, default: "" },
    fileUrl: { type: String, default: "" },
    category: { type: String, default: "khac" },
    publishedAt: { type: String, required: true },
  },
  { timestamps: true }
);

export const DownloadModel =
  models.Download || model("Download", DownloadSchema);
