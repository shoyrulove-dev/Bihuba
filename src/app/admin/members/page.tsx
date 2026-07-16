import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getMembers } from "@/lib/content";

export default async function AdminMembersPage() {
  const members = await getMembers();

  return (
    <AdminShell
      title="Quản lý hội viên"
      description="Quản trị hội viên doanh nghiệp, hội viên cá nhân và hội hoặc câu lạc bộ thành viên."
    >
      <CollectionManager
        collection="members"
        title="Danh sách hội viên"
        description="Đây là module tương ứng với khu hội viên trên site mẫu HUBA."
        initialItems={members as unknown as Record<string, unknown>[]}
        fields={[
          { name: "name", label: "Tên hội viên" },
          { name: "slug", label: "Slug" },
          {
            name: "memberType",
            label: "Loại hội viên",
            type: "select",
            options: [
              { label: "Doanh nghiệp", value: "business" },
              { label: "Cá nhân", value: "individual" },
              { label: "Hội / CLB", value: "club" },
            ],
          },
          { name: "groupType", label: "Nhóm hiển thị" },
          { name: "description", label: "Mô tả", type: "textarea" },
          {
            name: "logo",
            label: "Logo",
            type: "image",
            helpText: "Upload logo hội viên lên ImageKit hoặc dán URL có sẵn.",
          },
          { name: "address", label: "Địa chỉ" },
          { name: "phone", label: "Điện thoại" },
          { name: "email", label: "Email" },
          { name: "website", label: "Website", type: "url" },
          { name: "industry", label: "Lĩnh vực" },
        ]}
      />
    </AdminShell>
  );
}
