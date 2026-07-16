import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getSiteSettings } from "@/lib/content";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell
      title="Cấu hình website"
      description="Cấu hình tên site, logo, hero, CTA và các khối giới thiệu chính. Đây là phần tối thiểu để quản trị landing page."
    >
      <CollectionManager
        collection="settings"
        title="Cấu hình website"
        description="Lần lưu đầu tiên sẽ tạo bản ghi settings duy nhất. Các field JSON cho phép quản lý menu, thống kê và liên hệ ngay trong admin."
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
            type: "json",
            helpText: 'Dùng mảng JSON dạng [{"label":"Hội viên","value":"120+"}].',
          },
          {
            name: "nav",
            label: "Menu điều hướng",
            type: "json",
            helpText: 'Dùng mảng JSON dạng [{"label":"Trang chủ","href":"/"}].',
          },
          {
            name: "contact",
            label: "Thông tin liên hệ",
            type: "json",
            helpText:
              'Dùng object JSON dạng {"address":"...","phone":"...","email":"...","website":"..."}.',
          },
        ]}
      />
    </AdminShell>
  );
}
