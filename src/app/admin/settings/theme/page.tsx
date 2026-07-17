import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { themeFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsThemePage() {
  await requireAdminPage("/admin/settings/theme");

  return SettingsSectionManager({
    title: "Giao diện",
    description: "Điều chỉnh màu chính, màu nhấn và cỡ chữ của website.",
    fields: themeFields,
    panelMaxWidthClass: "max-w-[calc(100vw-4rem)]",
  });
}
