import { Schema, model, models } from "mongoose";

const MemberSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    memberType: {
      type: String,
      enum: ["business", "individual", "club"],
      required: true,
    },
    groupType: { type: String, default: "" },
    description: { type: String, default: "" },
    logo: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },
    industry: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    introImage: { type: String, default: "" },
    companyTagline: { type: String, default: "" },
    products: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const MemberModel = models.Member || model("Member", MemberSchema);
