import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getTransactions } from "@/lib/operations";

const statuses = [
  { label: "Chờ thanh toán", value: "pending" },
  { label: "Đã thanh toán", value: "paid" },
  { label: "Đã đối soát", value: "reconciled" },
  { label: "Thất bại", value: "failed" },
  { label: "Đã hoàn tiền", value: "refunded" },
];

export default async function AdminTransactionsPage() {
  await requireAdminPage("/admin/transactions");
  const items = await getTransactions();
  return <AdminShell title="Giao dịch, phí hội viên và QR" description="Theo dõi khoản thu, mã tham chiếu QR và trạng thái đối soát trên một sổ giao dịch thống nhất.">
    <CollectionManager collection="transactions" title="Sổ giao dịch" description="Có thể nhập giao dịch thủ công ngay; kết nối ngân hàng sẽ tự cập nhật trạng thái đối soát sau." initialItems={items} filterField="status" filterOptions={statuses} fields={[
      { name: "code", label: "Mã giao dịch", placeholder: "GD-2026-001" },
      { name: "memberName", label: "Hội viên / doanh nghiệp" },
      { name: "transactionType", label: "Loại khoản thu", type: "select", options: [{ label: "Phí hội viên", value: "membership_fee" }, { label: "Giao dịch B2B", value: "b2b_order" }, { label: "Khác", value: "other" }] },
      { name: "amount", label: "Số tiền (VNĐ)" },
      { name: "paymentMethod", label: "Phương thức", type: "select", options: [{ label: "QR", value: "qr" }, { label: "Chuyển khoản", value: "bank_transfer" }, { label: "Tiền mặt", value: "cash" }, { label: "Khác", value: "other" }] },
      { name: "qrReference", label: "Mã tham chiếu QR / ngân hàng" },
      { name: "status", label: "Trạng thái", type: "select", options: statuses },
      { name: "dueDate", label: "Hạn thanh toán", type: "date" },
      { name: "paidAt", label: "Ngày thanh toán", type: "date" },
      { name: "reconciledAt", label: "Ngày đối soát", type: "date" },
      { name: "note", label: "Ghi chú", type: "textarea", fullWidth: true },
    ]} />
  </AdminShell>;
}
