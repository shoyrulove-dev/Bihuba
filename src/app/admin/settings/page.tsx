import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getSiteSettings } from "@/lib/content";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell
      title="Site settings"
      description="Cấu hình tên site, hero, CTA và đoạn giới thiệu chính. Đây là phần tối thiểu để quản trị landing page."
    >
      <CollectionManager
        collection="settings"
        title="Cấu hình website"
        description="Nếu database đang trống, lần lưu đầu tiên sẽ tạo bản ghi settings duy nhất."
        initialItems={[settings as unknown as Record<string, unknown>]}
        fields={[
          { name: "siteName", label: "Tên đầy đủ" },
          { name: "shortName", label: "Tên ngắn" },
          { name: "slogan", label: "Slogan" },
          { name: "heroTitle", label: "Tiêu đề hero" },
          { name: "heroSubtitle", label: "Mô tả hero", type: "textarea" },
          { name: "heroCtaLabel", label: "Nhãn CTA" },
          { name: "heroCtaHref", label: "Link CTA" },
          { name: "introTitle", label: "Tiêu đề giới thiệu" },
          { name: "introBody", label: "Nội dung giới thiệu", type: "textarea" },
        ]}
      />
    </AdminShell>
  );
}
