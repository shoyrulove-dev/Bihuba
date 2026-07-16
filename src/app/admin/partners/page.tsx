import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getPartners } from "@/lib/content";

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <AdminShell
      title="Quản lý đối tác"
      description="Quản lý danh sách đối tác và đơn vị đồng hành."
    >
      <CollectionManager
        collection="partners"
        title="Đối tác"
        description="Danh sách đối tác đang hiển thị ngoài website."
        initialItems={partners as unknown as Record<string, unknown>[]}
        fields={[
          { name: "name", label: "Tên đối tác" },
          { name: "slug", label: "Slug" },
          { name: "partnerType", label: "Loại đối tác" },
          { name: "website", label: "Website", type: "url" },
          { name: "description", label: "Mô tả", type: "textarea" },
          {
            name: "logo",
            label: "Logo",
            type: "image",
            helpText: "Dán link hoặc upload logo.",
          },
        ]}
      />
    </AdminShell>
  );
}
