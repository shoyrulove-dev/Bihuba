import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getNotificationLogs } from "@/lib/operations";

const statuses = [
  { label: "Bản nháp", value: "draft" }, { label: "Chờ gửi", value: "queued" },
  { label: "Đã gửi", value: "sent" }, { label: "Đã nhận", value: "delivered" },
  { label: "Đã đọc", value: "read" }, { label: "Gửi lỗi", value: "failed" },
];

export default async function AdminNotificationsPage() {
  await requireAdminPage("/admin/notifications");
  const items = await getNotificationLogs();
  const zaloReady = Boolean(process.env.ZALO_OA_ACCESS_TOKEN && process.env.ZALO_OA_ID);
  const emailReady = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);

  return <AdminShell title="Trung tâm thông báo" description="Quản lý thông báo email, nội bộ và Zalo OA theo từng người nhận, có lịch sử trạng thái rõ ràng.">
    <div className="grid gap-3 md:grid-cols-2">
      <div className={`rounded-2xl border p-4 text-sm ${emailReady ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-blue-200 bg-blue-50 text-blue-800"}`}>
        <strong>Email là kênh ưu tiên.</strong>
        <p className="mt-1">{emailReady ? "Dịch vụ email đã sẵn sàng kết nối gửi thông báo." : "Có thể soạn và xếp hàng email ngay. Cần cấu hình Resend hoặc SMTP để gửi thật."}</p>
      </div>
      <div className={`rounded-2xl border p-4 text-sm ${zaloReady ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
        <strong>Zalo OA là kênh bổ sung.</strong>
        <p className="mt-1">{zaloReady ? "Zalo OA đã có cấu hình; cần xác nhận mẫu tin và webhook trước khi gửi production." : "Không bắt buộc ở giai đoạn này. Có thể bật sau cho nhắc việc hoặc thông báo khẩn."}</p>
      </div>
    </div>
    <CollectionManager collection="notifications" title="Nhật ký thông báo" description="Email là kênh mặc định. Trạng thái gửi/đọc của Zalo sẽ được webhook cập nhật khi kết nối OA." initialItems={items} filterField="status" filterOptions={statuses} fields={[
      { name: "channel", label: "Kênh", type: "select", options: [{ label: "Email", value: "email" }, { label: "Nội bộ", value: "internal" }, { label: "Zalo OA (tùy chọn)", value: "zalo_oa" }] },
      { name: "recipient", label: "Email người nhận / Zalo UID" },
      { name: "title", label: "Tiêu đề" },
      { name: "message", label: "Nội dung", type: "textarea", fullWidth: true },
      { name: "status", label: "Trạng thái", type: "select", options: statuses },
      { name: "externalId", label: "Mã tin từ nhà cung cấp" },
      { name: "sentAt", label: "Ngày gửi", type: "date" },
      { name: "deliveredAt", label: "Ngày nhận", type: "date" },
      { name: "readAt", label: "Ngày đọc", type: "date" },
      { name: "errorMessage", label: "Nội dung lỗi", type: "textarea", fullWidth: true },
    ]} />
  </AdminShell>;
}
