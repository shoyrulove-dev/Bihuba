import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "business"],
      default: "manager",
    },
    permissions: {
      type: [String],
      default: ["posts"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isProtected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = models.User || model("User", userSchema);
