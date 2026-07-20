import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getPartners } from "@/lib/content";

export default async function AdminPartnersPage() {
  await requireAdminPage("/admin/partners");

  const partners = await getPartners();

  return (
    <AdminShell
      title="Quản lý đối tác"
      description="Quản lý danh sách đối tác và đơn vị đồng hành hiển thị ngoài website."
    >
      <CollectionManager
        collection="partners"
        title="Đối tác"
        description="Danh sách đối tác đang hiển thị ngoài website."
        initialItems={partners as unknown as Record<string, unknown>[]}
        fields={[
          { name: "name", label: "Tên đối tác", section: "Thông tin", fullWidth: true },
          { name: "slug", label: "Slug", section: "Thông tin" },
          { name: "partnerType", label: "Loại đối tác", section: "Thông tin" },
          { name: "website", label: "Website", type: "url" as const, section: "Thông tin" },
          { name: "description", label: "Dòng tin hợp tác", type: "textarea" as const, section: "Nội dung", fullWidth: true },
          {
            name: "logo",
            label: "Logo",
            type: "image" as const,
            section: "Media",
            helpText: "Logo chỉ dùng làm dấu nhận diện nhỏ nếu banner chưa có logo.",
          },
          {
            name: "bannerImage",
            label: "Banner đối tác",
            type: "image" as const,
            section: "Media",
            fullWidth: true,
            helpText: "Mỗi đối tác nên có 1 banner thiết kế riêng. Gợi ý: 1920 x 760 px hoặc 1600 x 640 px.",
          },
          {
            name: "activityImages",
            label: "Ảnh/banner hoạt động hợp tác",
            type: "banners" as const,
            section: "Hoạt động hợp tác",
            fullWidth: true,
            helpText: "Thêm hình BIHUBA làm việc, poster chương trình, banner ký kết hoặc hoạt động chung với đối tác.",
          },
        ]}
      />
    </AdminShell>
  );
}
