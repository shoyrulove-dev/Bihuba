import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getPartners } from "@/lib/content";

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <AdminShell
      title="Quản lý đối tác"
      description="Dùng cho danh sách đối tác chiến lược, đối tác đào tạo, truyền thông hoặc đơn vị liên kết."
    >
      <CollectionManager
        collection="partners"
        title="Đối tác"
        description="Quản trị tương ứng với module đối tác trên site HUBA."
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
            helpText: "Upload logo đối tác lên ImageKit hoặc dán URL có sẵn.",
          },
        ]}
      />
    </AdminShell>
  );
}
