import { SettingsSectionManager } from "@/components/admin/settings-section-manager";
import { brandingFields } from "@/lib/admin-settings-fields";

export default async function AdminSettingsBrandingPage() {
  return SettingsSectionManager({
    title: "Nhận diện website",
    description: "Chỉnh tên website, tên ngắn, logo và slogan.",
    fields: brandingFields,
  });
}
