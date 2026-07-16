import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getUsers } from "@/lib/content";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <AdminShell
      title="Quản lý user"
      description="Quản lý tài khoản đăng nhập quản trị."
    >
      <CollectionManager
        collection="users"
        title="Users"
        description=""
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
