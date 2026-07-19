import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getUsers } from "@/lib/content";

export default async function AdminUsersPage() {
  await requireAdminPage("/admin/users");

  const users = await getUsers();

  return (
    <AdminShell
      title="Quản lý tài khoản"
      description="Admin toàn quyền. Tài khoản quản lý chỉ dùng các chức năng được cấp."
    >
      <CollectionManager
        collection="users"
        title="Tài khoản"
        description="Danh sách tài khoản đăng nhập admin."
        initialItems={users as unknown as Record<string, unknown>[]}
        fields={[
          { name: "name", label: "Tên hiển thị" },
          { name: "username", label: "Tài khoản" },
          {
            name: "role",
            label: "Nhóm quyền",
            type: "select",
            options: [
              { label: "Admin", value: "admin" },
              { label: "Quản lý", value: "manager" },
            ],
          },
          {
            name: "permissions",
            label: "Quyền chức năng",
            type: "permissions",
            fullWidth: true,
            helpText: "Admin luôn có toàn quyền. Với tài khoản quản lý, chọn các mục được phép thao tác.",
          },
          {
            name: "password",
            label: "Mật khẩu",
            type: "password",
            helpText: "Để trống khi sửa nếu không muốn đổi mật khẩu.",
          },
        ]}
      />
    </AdminShell>
  );
}
