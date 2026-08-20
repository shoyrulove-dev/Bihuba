import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { getCurrentAdminUser } from "@/lib/auth";
import { getRfqs, getTransactions } from "@/lib/operations";

function applySheetStyle(sheet: ExcelJS.Worksheet) {
  sheet.views = [{ state: "frozen", ySplit: 4 }];
  sheet.getRow(1).height = 28;
  sheet.mergeCells("A1:F1");
  const title = sheet.getCell("A1");
  title.value = "BIHUBA - BÁO CÁO ĐIỀU HÀNH B2B";
  title.font = { bold: true, size: 16, color: { argb: "FFFFFFFF" } };
  title.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF082A55" } };
  title.alignment = { vertical: "middle", horizontal: "left" };
  sheet.getRow(3).font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(3).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1769E8" } };
  sheet.getRow(3).alignment = { vertical: "middle" };
}

function applyBorders(sheet: ExcelJS.Worksheet, lastRow: number, columns: number) {
  for (let row = 3; row <= lastRow; row += 1) {
    for (let col = 1; col <= columns; col += 1) {
      sheet.getCell(row, col).border = { bottom: { style: "hair", color: { argb: "FFD9E2EF" } } };
    }
  }
}

export async function GET(request: NextRequest) {
  const session = await getCurrentAdminUser();
  if (!session || session.role !== "admin") return NextResponse.json({ message: "Không có quyền truy cập." }, { status: 403 });
  const [rfqs, transactions] = await Promise.all([getRfqs(), getTransactions()]);
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "BIHUBA B2B Admin";
  workbook.created = new Date();
  const overview = workbook.addWorksheet("Tổng quan");
  overview.columns = [{ width: 30 }, { width: 24 }, { width: 24 }, { width: 24 }, { width: 28 }, { width: 28 }];
  applySheetStyle(overview);
  overview.getCell("A2").value = `Kỳ báo cáo: ${request.nextUrl.searchParams.get("period") || "Năm"} · Xuất lúc ${new Date().toLocaleString("vi-VN")}`;
  overview.mergeCells("A2:F2");
  overview.addRow(["Chỉ số", "Giá trị"]);
  const paid = transactions.filter((row) => ["paid", "reconciled"].includes(String(row.status))).reduce((sum, row) => sum + Number(row.amount || 0), 0);
  overview.addRows([["Tổng RFQ", rfqs.length], ["RFQ đã ghép", rfqs.filter((row) => ["matched", "quoted", "closed"].includes(String(row.status))).length], ["Tổng giao dịch", transactions.length], ["Doanh thu đã ghi nhận (VNĐ)", paid]]);
  applyBorders(overview, overview.rowCount, 2);
  overview.getColumn(2).numFmt = "#,##0";

  const rfqSheet = workbook.addWorksheet("RFQ");
  rfqSheet.columns = [{ width: 16 }, { width: 34 }, { width: 28 }, { width: 18 }, { width: 18 }, { width: 18 }];
  applySheetStyle(rfqSheet);
  rfqSheet.getCell("A2").value = "Danh sách yêu cầu báo giá và trạng thái ghép nối";
  rfqSheet.mergeCells("A2:F2");
  rfqSheet.addRow(["Mã RFQ", "Nhu cầu", "Doanh nghiệp", "Trạng thái", "Ngân sách (VNĐ)", "Ngày tạo"]);
  rfqs.forEach((row) => rfqSheet.addRow([row.code, row.title, row.requester, row.status, Number(row.budget || 0), new Date(String(row.createdAt)).toLocaleDateString("vi-VN")]));
  applyBorders(rfqSheet, rfqSheet.rowCount, 6);
  rfqSheet.getColumn(5).numFmt = "#,##0";

  const transactionSheet = workbook.addWorksheet("Giao dịch");
  transactionSheet.columns = [{ width: 16 }, { width: 26 }, { width: 18 }, { width: 18 }, { width: 20 }, { width: 28 }];
  applySheetStyle(transactionSheet);
  transactionSheet.getCell("A2").value = "Sổ giao dịch, phí hội viên và đối soát QR";
  transactionSheet.mergeCells("A2:F2");
  transactionSheet.addRow(["Mã giao dịch", "Hội viên", "Loại", "Trạng thái", "Số tiền (VNĐ)", "Mã QR / tham chiếu"]);
  transactions.forEach((row) => transactionSheet.addRow([row.code, row.memberName, row.transactionType, row.status, Number(row.amount || 0), row.qrReference]));
  applyBorders(transactionSheet, transactionSheet.rowCount, 6);
  transactionSheet.getColumn(5).numFmt = "#,##0";

  const buffer = await workbook.xlsx.writeBuffer();
  return new NextResponse(buffer, { headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Content-Disposition": `attachment; filename="bihuba-report-${new Date().toISOString().slice(0,10)}.xlsx"` } });
}
