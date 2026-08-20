import { connectToDatabase } from "@/lib/db";
import { ActivityLogModel } from "@/models/activity-log";
import { NotificationLogModel } from "@/models/notification-log";
import { RfqModel } from "@/models/rfq";
import { TransactionModel } from "@/models/transaction";

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export async function getRfqs() {
  if (!(await connectToDatabase())) return [];
  return serialize(await RfqModel.find().sort({ createdAt: -1 }).limit(500).lean());
}

export async function getTransactions() {
  if (!(await connectToDatabase())) return [];
  return serialize(await TransactionModel.find().sort({ createdAt: -1 }).limit(1000).lean());
}

export async function getNotificationLogs() {
  if (!(await connectToDatabase())) return [];
  return serialize(await NotificationLogModel.find().sort({ createdAt: -1 }).limit(500).lean());
}

export async function getActivityLogs(limit = 200) {
  if (!(await connectToDatabase())) return [];
  return serialize(await ActivityLogModel.find().sort({ createdAt: -1 }).limit(limit).lean());
}

export async function getOperationsSummary() {
  if (!(await connectToDatabase())) {
    return { rfqTotal: 0, rfqMatched: 0, transactionTotal: 0, paidAmount: 0, notificationTotal: 0, readNotifications: 0 };
  }
  const [rfqTotal, rfqMatched, transactionTotal, paidRows, notificationTotal, readNotifications] = await Promise.all([
    RfqModel.countDocuments(),
    RfqModel.countDocuments({ status: { $in: ["matched", "quoted", "closed"] } }),
    TransactionModel.countDocuments(),
    TransactionModel.aggregate([{ $match: { status: { $in: ["paid", "reconciled"] } } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    NotificationLogModel.countDocuments(),
    NotificationLogModel.countDocuments({ status: "read" }),
  ]);
  return { rfqTotal, rfqMatched, transactionTotal, paidAmount: Number(paidRows[0]?.total || 0), notificationTotal, readNotifications };
}
