import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getMembers } from "@/lib/content";

export default async function AdminMembersPage() {
  const members = await getMembers();

  return (
    <AdminShell
      title="Quản lý hội viên"
      description="Quản lý hồ sơ hội viên doanh nghiệp, cá nhân và hội, câu lạc bộ thành viên."
    >
      <CollectionManager
        collection="members"
        title="Danh sách hội viên"
        description="Danh sách hồ sơ hội viên đang hiển thị ngoài website."
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
            helpText: "Dán link hoặc upload logo. Gợi ý: 1200 x 1200.",
          },
          {
            name: "coverImage",
            label: "Ảnh bìa doanh nghiệp",
            type: "image",
            helpText: "Ảnh ngang phần đầu hồ sơ. Gợi ý: 1600 x 900.",
          },
          {
            name: "introImage",
            label: "Ảnh / logo giới thiệu",
            type: "image",
            helpText: "Ảnh trong khung giới thiệu. Gợi ý: 1200 x 900.",
          },
          { name: "companyTagline", label: "Dòng giới thiệu ngắn" },
          { name: "address", label: "Địa chỉ" },
          { name: "phone", label: "Điện thoại" },
          { name: "email", label: "Email" },
          { name: "website", label: "Website", type: "url" },
          { name: "industry", label: "Lĩnh vực" },
          {
            name: "products",
            label: "Sản phẩm / dịch vụ",
            type: "products",
            helpText: "Hiển thị ở cuối hồ sơ doanh nghiệp.",
          },
        ]}
      />
    </AdminShell>
  );
}
