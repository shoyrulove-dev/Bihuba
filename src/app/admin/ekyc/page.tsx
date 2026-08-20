import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { EkycApplicationModel } from "@/models/ekyc-application";

export const dynamic = "force-dynamic";

export default async function AdminEkycPage() {
  await requireAdminPage("/admin/ekyc");
  await connectToDatabase();
  const reports = JSON.parse(JSON.stringify(await EkycApplicationModel.find({ status: "needs_review" }).sort({ reportedAt: -1 }).lean())) as Array<Record<string, string>>;
  return (
    <AdminShell title="Cảnh báo E-KYC" description="Chỉ hồ sơ có cảnh báo từ hệ thống mới xuất hiện ở đây. Hồ sơ đủ điều kiện được duyệt và tạo hồ sơ doanh nghiệp tự động.">
      <section className="space-y-4">
        {reports.length ? reports.map((item) => <article key={item._id} className="rounded-2xl border border-amber-300/30 bg-white/5 p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-semibold text-white">{item.companyName}</h2><p className="mt-1 text-sm text-slate-300">MST: {item.taxCode} · {item.email}</p><p className="mt-3 rounded-xl bg-amber-400/10 px-3 py-2 text-sm text-amber-100">{item.reportReason}</p></div><form action={`/api/admin/ekyc/${item._id}`} method="post"><input type="hidden" name="action" value="approve" /><button className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">Duyệt hồ sơ</button></form></div><div className="mt-4 flex gap-4 text-sm"><Link href={item.logoUrl} target="_blank" className="text-cyan-300">Xem logo</Link><Link href={item.certificateUrl} target="_blank" className="text-cyan-300">Xem giấy tờ</Link></div></article>) : <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">Không có hồ sơ cần can thiệp.</div>}
      </section>
    </AdminShell>
  );
}
