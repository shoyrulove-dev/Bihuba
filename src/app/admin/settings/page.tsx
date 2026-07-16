import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getSiteSettings } from "@/lib/content";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell
      title="Cấu hình website"
      description="Cấu hình tên site, logo, hero, CTA và các khối giới thiệu chính."
    >
      <CollectionManager
        collection="settings"
        title="Cấu hình website"
        description="Cập nhật tên website, khu vực nổi bật, menu điều hướng, số liệu hiển thị và thông tin liên hệ."
        initialItems={[settings as unknown as Record<string, unknown>]}
        singleton
        allowDelete={false}
        fields={[
          { name: "siteName", label: "Tên đầy đủ" },
          { name: "shortName", label: "Tên ngắn" },
          {
            name: "logoUrl",
            label: "Logo website",
            type: "image",
            helpText: "Logo hiển thị ở header, footer và hero.",
          },
          { name: "slogan", label: "Slogan" },
          { name: "heroTitle", label: "Tiêu đề hero" },
          { name: "heroSubtitle", label: "Mô tả hero", type: "textarea" },
          { name: "heroCtaLabel", label: "Nhãn CTA" },
          { name: "heroCtaHref", label: "Link CTA" },
          { name: "introTitle", label: "Tiêu đề giới thiệu" },
          { name: "introBody", label: "Nội dung giới thiệu", type: "textarea" },
          {
            name: "memberStats",
            label: "Thống kê trang chủ",
            type: "stats",
            helpText: "Mỗi dòng gồm nhãn hiển thị và con số tương ứng.",
          },
          {
            name: "nav",
            label: "Menu điều hướng",
            type: "nav",
            helpText: "Cập nhật tên mục menu và đường dẫn hiển thị ở đầu trang.",
          },
          {
            name: "contact",
            label: "Thông tin liên hệ",
            type: "contact",
            helpText: "Thông tin hiển thị ở footer và trang liên hệ.",
          },
        ]}
      />
    </AdminShell>
  );
}
