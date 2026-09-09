import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { seoFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsSeoPage() {
  await requireAdminPage("/admin/settings/seo");
  return SettingsSectionManager({ title: "SEO & Google", description: "Cập nhật tiêu đề, mô tả và từ khóa hiển thị trên Google và khi chia sẻ mạng xã hội.", fields: seoFields, panelMaxWidthClass: "max-w-[calc(100vw-4rem)]" });
}
