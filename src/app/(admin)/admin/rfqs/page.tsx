import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getRfqs } from "@/lib/operations";

const statuses = [
  { label: "Mới tiếp nhận", value: "open" },
  { label: "Đang tìm đối tác", value: "matching" },
  { label: "Đã ghép nối", value: "matched" },
  { label: "Đã nhận báo giá", value: "quoted" },
  { label: "Hoàn tất", value: "closed" },
  { label: "Đã hủy", value: "cancelled" },
];

export default async function AdminRfqsPage() {
  await requireAdminPage("/admin/rfqs");
  const items = await getRfqs();
  return <AdminShell title="RFQ và ghép nối doanh nghiệp" description="Tiếp nhận yêu cầu báo giá, theo dõi quá trình tìm đối tác và kết quả ghép nối.">
    <CollectionManager collection="rfqs" title="Danh sách RFQ" description="Mỗi RFQ có mã riêng và trạng thái xuyên suốt từ tiếp nhận đến hoàn tất." initialItems={items} filterField="status" filterOptions={statuses} fields={[
      { name: "code", label: "Mã RFQ", placeholder: "RFQ-2026-001" },
      { name: "title", label: "Nhu cầu mua hàng / dịch vụ" },
      { name: "requester", label: "Doanh nghiệp yêu cầu" },
      { name: "category", label: "Lĩnh vực" },
      { name: "description", label: "Mô tả yêu cầu", type: "textarea", fullWidth: true },
      { name: "budget", label: "Ngân sách dự kiến (VNĐ)" },
      { name: "deadline", label: "Hạn nhận báo giá", type: "date" },
      { name: "status", label: "Trạng thái ghép nối", type: "select", options: statuses },
      { name: "matchedBusiness", label: "Doanh nghiệp được ghép" },
      { name: "quoteCount", label: "Số báo giá đã nhận" },
      { name: "matchNote", label: "Ghi chú ghép nối", type: "textarea", fullWidth: true },
    ]} />
  </AdminShell>;
}
