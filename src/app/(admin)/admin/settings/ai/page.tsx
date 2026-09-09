import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { aiFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsAiPage() {
  await requireAdminPage("/admin/settings/ai");

  return SettingsSectionManager({
    title: "Cấu hình AI",
    description: "Bật/tắt Trợ Lý BIHUBA và chỉnh cách trợ lý trả lời ngoài website.",
    fields: aiFields,
    panelMaxWidthClass: "max-w-5xl",
  });
}
