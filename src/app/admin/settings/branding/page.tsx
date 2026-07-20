import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { brandingFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsBrandingPage() {
  await requireAdminPage("/admin/settings/branding");

  return SettingsSectionManager({
    title: "Nhận diện website",
    description: "Chỉnh tên hiển thị, một logo thương hiệu chuẩn 1:1 và slogan.",
    fields: brandingFields,
    panelMaxWidthClass: "max-w-[calc(100vw-4rem)]",
  });
}
