import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { themeFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsThemePage() {
  return SettingsSectionManager({
    title: "Giao diện",
    description: "Điều chỉnh màu chính, màu nhấn và cỡ chữ của website.",
    fields: themeFields,
    panelMaxWidthClass: "max-w-[calc(100vw-4rem)]",
  });
}
