import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { contactFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsContactPage() {
  await requireAdminPage("/admin/settings/contact");

  return SettingsSectionManager({
    title: "Menu và liên hệ",
    description: "Cập nhật menu đầu trang, thông tin liên hệ và liên kết mạng xã hội.",
    fields: contactFields,
    panelMaxWidthClass: "max-w-[calc(100vw-4rem)]",
  });
}
