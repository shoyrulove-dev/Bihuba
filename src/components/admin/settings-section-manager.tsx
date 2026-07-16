import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager, type FieldConfig } from "@/components/admin/collection-manager";
import { getSiteSettings } from "@/lib/content";

export async function SettingsSectionManager({
  title,
  description,
  fields,
}: {
  title: string;
  description: string;
  fields: FieldConfig[];
}) {
  const settings = await getSiteSettings();

  return (
    <AdminShell title={title} description={description}>
      <CollectionManager
        collection="settings"
        title={title}
        description={description}
        initialItems={[settings as unknown as Record<string, unknown>]}
        singleton
        allowDelete={false}
        hideSingletonEditButton
        fields={fields}
      />
    </AdminShell>
  );
}
