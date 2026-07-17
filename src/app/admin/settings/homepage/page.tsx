import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { homepageFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsHomepagePage() {
  return SettingsSectionManager({
    title: "Nội dung trang chủ",
    description: "Chỉnh hero, giới thiệu, banner hoạt động nổi bật và thống kê.",
    fields: homepageFields,
    panelMaxWidthClass: "max-w-[calc(100vw-4rem)]",
  });
}
