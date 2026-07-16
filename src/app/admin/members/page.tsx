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
        description="Quản lý hồ sơ hội viên, phân nhóm hiển thị và thông tin liên hệ."
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
            helpText: "Upload logo hội viên lên ImageKit hoặc dán URL có sẵn. Gợi ý: PNG vuông 1200 x 1200 nền trong suốt.",
          },
          {
            name: "coverImage",
            label: "Ảnh bìa doanh nghiệp",
            type: "image",
            helpText: "Ảnh ngang cho phần đầu hồ sơ. Gợi ý: 1600 x 900 hoặc 1920 x 1080.",
          },
          {
            name: "introImage",
            label: "Ảnh / logo giới thiệu",
            type: "image",
            helpText: "Ảnh minh họa trong khung giới thiệu. Gợi ý: 1200 x 900.",
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
            helpText: "Hiển thị ở cuối hồ sơ doanh nghiệp để giới thiệu và quảng bá sản phẩm, dịch vụ.",
          },
        ]}
      />
    </AdminShell>
  );
}
