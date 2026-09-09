import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getAdminMembersPage } from "@/lib/content";

export default async function AdminMembersPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; filter?: string }> }) {
  await requireAdminPage("/admin/members");
  const params = await searchParams;
  const page = Math.max(Number(params.page) || 1, 1);
  const result = await getAdminMembersPage({ page, query: params.q, memberType: params.filter });

  return (
    <AdminShell
      title="Quản lý hội viên"
      description="Quản lý hồ sơ hội viên doanh nghiệp, cá nhân, hội và câu lạc bộ thành viên."
    >
      <CollectionManager
        key={`members-${result.page}-${params.q || ""}-${params.filter || ""}`}
        collection="members"
        title="Danh sách hội viên"
        description="Danh sách hồ sơ hội viên đang hiển thị ngoài website."
        initialItems={result.items as unknown as Record<string, unknown>[]}
        serverPagination={{ page: result.page, pageSize: result.pageSize, totalItems: result.totalItems, query: params.q || "", filter: params.filter || "" }}
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
            label: "Banner hội viên",
            type: "image",
            helpText:
              "Chuẩn đồng bộ 16:9 cho banner hội viên. Khuyến nghị 1600 x 900 px hoặc 1200 x 675 px, JPG/WebP nhẹ dưới 1 MB. Ảnh quá lớn sẽ tự co vừa khung, không crop; nội dung chính nên nằm giữa ảnh.",
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
