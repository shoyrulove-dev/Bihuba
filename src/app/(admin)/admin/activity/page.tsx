import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { getActivityLogs } from "@/lib/operations";

const actionLabels: Record<string, string> = {
  admin_login: "Đăng nhập quản trị", member_login: "Đăng nhập hội viên", profile_update: "Cập nhật hồ sơ",
  document_download: "Tải tài liệu", create: "Tạo dữ liệu", update: "Cập nhật dữ liệu", delete: "Xóa dữ liệu",
};

export default async function AdminActivityPage() {
  await requireAdminPage("/admin/activity");
  const logs = await getActivityLogs(250);
  return <AdminShell title="Nhật ký hoạt động" description="Theo dõi đăng nhập, cập nhật hồ sơ, tải tài liệu và thao tác quản trị quan trọng.">
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)]">
      <div className="grid grid-cols-[150px_170px_minmax(220px,1fr)_minmax(240px,1.5fr)] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span>Thời gian</span><span>Hoạt động</span><span>Người thực hiện</span><span>Chi tiết</span>
      </div>
      <div className="divide-y divide-slate-100 overflow-x-auto">
        {logs.map((log) => <div key={String(log._id)} className="grid min-w-[850px] grid-cols-[150px_170px_minmax(220px,1fr)_minmax(240px,1.5fr)] gap-4 px-5 py-4 text-sm">
          <span className="text-slate-500">{new Date(log.createdAt).toLocaleString("vi-VN")}</span>
          <span className="font-semibold text-slate-800">{actionLabels[log.action] || log.action}</span>
          <span><strong className="block text-slate-800">{log.actorName || "Không xác định"}</strong><small className="text-slate-500">{log.actorRole} · {log.ipAddress || "Không có IP"}</small></span>
          <span className="text-slate-600">{log.description || `${log.targetType || "Hệ thống"} ${log.targetId || ""}`}</span>
        </div>)}
        {!logs.length ? <div className="px-5 py-12 text-center text-sm text-slate-500">Nhật ký sẽ bắt đầu ghi nhận từ bản cập nhật này.</div> : null}
      </div>
    </section>
  </AdminShell>;
}
