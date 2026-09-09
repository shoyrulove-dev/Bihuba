import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { supporterFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsSupportersPage() {
  await requireAdminPage("/admin/settings/supporters");

  return SettingsSectionManager({
    title: "Doanh nghiệp đồng hành",
    description: "Quản lý nhóm hiển thị, logo và liên kết của các đơn vị đồng hành.",
    fields: supporterFields,
    panelMaxWidthClass: "max-w-[calc(100vw-3rem)]",
  });
}
