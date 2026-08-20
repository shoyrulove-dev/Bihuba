import { Schema, model, models } from "mongoose";

const RfqSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    requester: { type: String, required: true, trim: true },
    category: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    budget: { type: Number, default: 0 },
    deadline: { type: String, default: "" },
    status: {
      type: String,
      enum: ["open", "matching", "matched", "quoted", "closed", "cancelled"],
      default: "open",
      index: true,
    },
    matchedBusiness: { type: String, default: "", trim: true },
    matchNote: { type: String, default: "" },
    quoteCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const RfqModel = models.Rfq || model("Rfq", RfqSchema);
