import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { homepageFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsHomepagePage() {
  await requireAdminPage("/admin/settings/homepage");

  return SettingsSectionManager({
    title: "Nội dung trang chủ",
    description: "Chỉnh hero, giới thiệu, banner hoạt động nổi bật và thống kê.",
    fields: homepageFields,
    panelMaxWidthClass: "max-w-[calc(100vw-4rem)]",
    defaultSectionsOpen: false,
  });
}
