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
  return <AdminShell title="Thông báo và Zalo OA" description="Soạn thông báo và lưu đầy đủ trạng thái gửi, nhận, đọc hoặc lỗi theo từng người nhận.">
    <div className={`rounded-2xl border p-4 text-sm ${zaloReady ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
      {zaloReady ? "Zalo OA đã có cấu hình kết nối. Cần xác nhận mẫu tin và webhook trước khi gửi production." : "Chưa có ZALO_OA_ID và ZALO_OA_ACCESS_TOKEN. Hiện có thể soạn nội dung, xếp hàng và quản lý trạng thái; chưa gửi thật ra Zalo."}
    </div>
    <CollectionManager collection="notifications" title="Nhật ký thông báo" description="Trạng thái gửi/đọc sẽ được cập nhật bởi webhook khi hoàn tất kết nối Zalo OA." initialItems={items} filterField="status" filterOptions={statuses} fields={[
      { name: "channel", label: "Kênh", type: "select", options: [{ label: "Zalo OA", value: "zalo_oa" }, { label: "Email", value: "email" }, { label: "Nội bộ", value: "internal" }] },
      { name: "recipient", label: "Người nhận / Zalo UID" },
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
