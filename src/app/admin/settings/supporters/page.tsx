import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { supporterFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsSupportersPage() {
  return SettingsSectionManager({
    title: "Doanh nghiệp đồng hành",
    description: "Chỉnh danh sách logo chạy dưới footer.",
    fields: supporterFields,
  });
}
