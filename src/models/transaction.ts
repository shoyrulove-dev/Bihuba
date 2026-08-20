import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, index: true },
    memberName: { type: String, required: true, trim: true },
    transactionType: { type: String, enum: ["membership_fee", "b2b_order", "other"], default: "membership_fee" },
    amount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ["qr", "bank_transfer", "cash", "other"], default: "qr" },
    qrReference: { type: String, default: "", trim: true, index: true },
    status: { type: String, enum: ["pending", "paid", "reconciled", "failed", "refunded"], default: "pending", index: true },
    dueDate: { type: String, default: "" },
    paidAt: { type: String, default: "" },
    reconciledAt: { type: String, default: "" },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

export const TransactionModel = models.Transaction || model("Transaction", TransactionSchema);
