import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["news", "event", "schedule", "trade", "sponsor"],
      required: true,
    },
    category: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    featuredImage: { type: String, default: "" },
    publishedAt: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PostModel = models.Post || model("Post", PostSchema);
