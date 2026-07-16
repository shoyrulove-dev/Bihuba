import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { homepageFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsHomepagePage() {
  return SettingsSectionManager({
    title: "Nội dung trang chủ",
    description: "Chỉnh hero, giới thiệu và các thống kê ngoài trang chủ.",
    fields: homepageFields,
  });
}
