import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { EkycApplicationModel } from "@/models/ekyc-application";

export const dynamic = "force-dynamic";

export default async function AdminEkycPage() {
  await requireAdminPage("/admin/ekyc");
  await connectToDatabase();
  const reports = JSON.parse(
    JSON.stringify(await EkycApplicationModel.find({ status: "needs_review" }).sort({ reportedAt: -1 }).lean())
  ) as Array<Record<string, string>>;

  return (
    <AdminShell
      title="Duyệt hồ sơ E-KYC"
      description="Mọi hồ sơ mới đều cần Văn phòng BIHUBA kiểm tra trước khi xuất hiện trong danh bạ hội viên."
    >
      <section className="space-y-4">
        {reports.length ? (
          reports.map((item) => (
            <article key={item._id} className="rounded-2xl border border-amber-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{item.companyName}</h2>
                  <p className="mt-1 text-sm text-slate-500">MST: {item.taxCode} · {item.email}</p>
                  <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">{item.reportReason}</p>
                </div>
                <div className="flex gap-2">
                  <form action={`/api/admin/ekyc/${item._id}`} method="post">
                    <input type="hidden" name="action" value="reject" />
                    <button className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700">Từ chối</button>
                  </form>
                  <form action={`/api/admin/ekyc/${item._id}`} method="post">
                    <input type="hidden" name="action" value="approve" />
                    <button className="rounded-xl bg-[#1769e8] px-4 py-2.5 text-sm font-semibold text-white">Duyệt hồ sơ</button>
                  </form>
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <Link href={item.logoUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#1769e8]">Xem logo</Link>
                <Link href={item.certificateUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#1769e8]">Xem giấy tờ</Link>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 shadow-[0_8px_24px_rgba(15,23,42,0.045)]">Không có hồ sơ chờ duyệt.</div>
        )}
      </section>
    </AdminShell>
  );
}
