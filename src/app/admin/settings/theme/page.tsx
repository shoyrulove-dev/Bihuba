import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { themeFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsThemePage() {
  return SettingsSectionManager({
    title: "Giao diện website",
    description: "Chỉnh màu sắc và cỡ chữ chính.",
    fields: themeFields,
  });
}
