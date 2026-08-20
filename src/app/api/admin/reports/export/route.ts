import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminUser } from "@/lib/auth";
import { getRfqs, getTransactions } from "@/lib/operations";

function csvCell(value: unknown) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }

export async function GET(request: NextRequest) {
  const session = await getCurrentAdminUser();
  if (!session || session.role !== "admin") return NextResponse.json({ message: "Không có quyền truy cập." }, { status: 403 });
  const [rfqs, transactions] = await Promise.all([getRfqs(), getTransactions()]);
  const rows: unknown[][] = [
    ["BIHUBA - BÁO CÁO ĐIỀU HÀNH", request.nextUrl.searchParams.get("period") || "year"], [],
    ["RFQ", "Mã", "Doanh nghiệp", "Trạng thái", "Ngân sách", "Ngày tạo"],
    ...rfqs.map((row) => [row.title, row.code, row.requester, row.status, row.budget, row.createdAt]), [],
    ["GIAO DỊCH", "Mã", "Hội viên", "Trạng thái", "Số tiền", "Mã QR", "Ngày tạo"],
    ...transactions.map((row) => [row.transactionType, row.code, row.memberName, row.status, row.amount, row.qrReference, row.createdAt]),
  ];
  const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="bihuba-report-${new Date().toISOString().slice(0,10)}.csv"` } });
}
