import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { getActivityLogs, getOperationsSummary, getRfqs, getTransactions } from "@/lib/operations";

type Props = { searchParams: Promise<{ period?: string }> };

function money(value: number) { return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value); }

export default async function AdminReportsPage({ searchParams }: Props) {
  await requireAdminPage("/admin/reports");
  const { period = "year" } = await searchParams;
  const [summary, rfqs, transactions, activities] = await Promise.all([getOperationsSummary(), getRfqs(), getTransactions(), getActivityLogs(1000)]);
  const now = new Date();
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 11 + index, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    return { key, label: `T${date.getMonth() + 1}`, activity: activities.filter((row) => String(row.createdAt).startsWith(key)).length };
  });
  const maxActivity = Math.max(1, ...months.map((item) => item.activity));
  const points = months.map((item, index) => `${24 + index * 48},${154 - (item.activity / maxActivity) * 120}`).join(" ");
  const cards = [
    ["Tổng RFQ", summary.rfqTotal], ["RFQ đã ghép", summary.rfqMatched], ["Giao dịch", summary.transactionTotal], ["Doanh thu ghi nhận", money(summary.paidAmount)],
  ];
  return <AdminShell title="Báo cáo điều hành" description="Tổng hợp chỉ số theo tháng, quý hoặc năm và xuất dữ liệu phục vụ đối soát.">
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex gap-2">{[["month","Tháng"],["quarter","Quý"],["year","Năm"]].map(([value,label]) => <Link key={value} href={`/admin/reports?period=${value}`} className={`rounded-xl px-4 py-2 text-sm font-semibold ${period === value ? "bg-[#1769e8] text-white" : "bg-slate-100 text-slate-600"}`}>{label}</Link>)}</div>
      <div className="flex gap-2"><a href={`/api/admin/reports/export?period=${period}`} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Xuất Excel (.csv)</a><Link href={`/admin/reports/print?period=${period}`} target="_blank" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">In / Lưu PDF</Link></div>
    </div>
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label,value]) => <article key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p></article>)}</section>
    <section className="grid gap-5 lg:grid-cols-12">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-8"><h2 className="font-semibold text-slate-900">Hoạt động hệ thống 12 tháng</h2><svg viewBox="0 0 580 180" className="mt-5 h-[230px] w-full" preserveAspectRatio="none">{[35,75,115,155].map((y) => <line key={y} x1="20" y1={y} x2="565" y2={y} stroke="#e8eef6" />)}<polyline points={points} fill="none" stroke="#1769e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />{points.split(" ").map((point) => { const [cx,cy] = point.split(","); return <circle key={point} cx={cx} cy={cy} r="3" fill="white" stroke="#1769e8" strokeWidth="2" />; })}</svg><div className="grid grid-cols-12 text-center text-[10px] text-slate-400">{months.map((month) => <span key={month.key}>{month.label}</span>)}</div></article>
      <article className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-4"><h2 className="font-semibold text-slate-900">Tỷ lệ xử lý</h2><div className="mt-6 space-y-5">{[["Ghép RFQ", summary.rfqTotal ? Math.round(summary.rfqMatched / summary.rfqTotal * 100) : 0],["Đối soát giao dịch", transactions.length ? Math.round(transactions.filter((row) => row.status === "reconciled").length / transactions.length * 100) : 0],["Thông báo đã đọc", summary.notificationTotal ? Math.round(summary.readNotifications / summary.notificationTotal * 100) : 0]].map(([label,value]) => <div key={String(label)}><div className="flex justify-between text-sm"><span className="text-slate-600">{label}</span><strong>{value}%</strong></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#1769e8]" style={{ width: `${value}%` }} /></div></div>)}</div><p className="mt-7 rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-700">Các tỷ lệ sẽ tự chuyển từ 0% sang dữ liệu thật khi RFQ, giao dịch và webhook Zalo bắt đầu phát sinh.</p></article>
    </section>
    {!rfqs.length ? <p className="text-xs text-slate-500">Chưa có RFQ thật; báo cáo hiện chỉ hiển thị dữ liệu đã phát sinh trong hệ thống.</p> : null}
  </AdminShell>;
}
