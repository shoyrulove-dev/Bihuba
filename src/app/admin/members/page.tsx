import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getMembers } from "@/lib/content";

export default async function AdminMembersPage() {
  await requireAdminPage("/admin/members");

  const members = await getMembers();

  return (
    <AdminShell
      title="Quản lý hội viên"
      description="Quản lý hồ sơ hội viên doanh nghiệp, cá nhân, hội và câu lạc bộ thành viên."
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
              { label: "Hội / Câu lạc bộ", value: "club" },
            ],
          },
          { name: "groupType", label: "Nhóm hiển thị" },
          { name: "description", label: "Mô tả", type: "textarea" },
          {
            name: "logo",
            label: "Logo",
            type: "image",
            helpText: "Dán link hoặc upload logo. Gợi ý: 1200 x 1200 px, tỷ lệ 1:1.",
          },
          {
            name: "coverImage",
            label: "Banner doanh nghiệp",
            type: "image",
            helpText:
              "Dùng làm banner ngoài danh sách hội viên và đầu trang hồ sơ. Khuyến nghị 1920 x 840 px hoặc 1600 x 700 px, tỷ lệ 16:7, JPG/WebP nhẹ.",
          },
          {
            name: "introImage",
            label: "Ảnh / logo giới thiệu",
            type: "image",
            helpText: "Ảnh trong khung giới thiệu hồ sơ. Gợi ý: 1200 x 900 px.",
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
