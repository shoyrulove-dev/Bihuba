import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { contactFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsContactPage() {
  return SettingsSectionManager({
    title: "Menu và liên hệ",
    description: "Chỉnh menu, liên hệ và các nút nổi bên phải.",
    fields: contactFields,
  });
}
