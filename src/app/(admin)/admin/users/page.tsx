import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getAdminUsersPage } from "@/lib/content";

const roleTabs = [
  { label: "Quản trị viên", value: "admin" },
  { label: "Quản lý", value: "manager" },
  { label: "Doanh nghiệp", value: "business" },
];

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; filter?: string }> }) {
  await requireAdminPage("/admin/users");
  const params = await searchParams;
  const page = Math.max(Number(params.page) || 1, 1);
  const result = await getAdminUsersPage({ page, pageSize: 25, query: params.q, role: params.filter });

  return (
    <AdminShell
      title="Quản lý tài khoản"
      description="Theo dõi tài khoản vận hành và doanh nghiệp. Danh sách được chia theo nhóm quyền và tải tối đa 25 tài khoản mỗi trang."
    >
      <CollectionManager
        key={`users-${result.page}-${params.q || ""}-${params.filter || ""}`}
        collection="users"
        title="Tài khoản"
        description="Chọn tab để quản lý từng nhóm tài khoản. Tab Doanh nghiệp được thiết kế sẵn cho danh sách hội viên lớn."
        initialItems={result.items as unknown as Record<string, unknown>[]}
        serverPagination={{ page: result.page, pageSize: result.pageSize, totalItems: result.totalItems, query: params.q || "", filter: params.filter || "" }}
        filterField="role"
        filterOptions={roleTabs}
        fields={[
          { name: "name", label: "Tên hiển thị" },
          { name: "username", label: "Tài khoản" },
          { name: "email", label: "Email" },
          { name: "phone", label: "Số điện thoại" },
          { name: "role", label: "Nhóm quyền", type: "select", options: [{ label: "Admin", value: "admin" }, { label: "Quản lý", value: "manager" }, { label: "Doanh nghiệp", value: "business" }] },
          { name: "permissions", label: "Quyền chức năng", type: "permissions", fullWidth: true, helpText: "Admin có toàn quyền. Các nhóm khác chỉ dùng những mục được cấp." },
          { name: "password", label: "Mật khẩu", type: "password", helpText: "Để trống khi sửa nếu không cần đổi mật khẩu." },
        ]}
      />
    </AdminShell>
  );
}
