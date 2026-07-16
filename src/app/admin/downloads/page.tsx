import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getDownloads } from "@/lib/content";

export default async function AdminDownloadsPage() {
  const downloads = await getDownloads();

  return (
    <AdminShell
      title="Quản lý tài liệu"
      description="Quản trị download, báo cáo, thông báo và tài liệu công khai cho hội viên."
    >
      <CollectionManager
        collection="downloads"
        title="Tài liệu"
        description="Tương đương nhóm download/download-category trên HUBA."
        initialItems={downloads as unknown as Record<string, unknown>[]}
        fields={[
          { name: "title", label: "Tiêu đề" },
          { name: "slug", label: "Slug" },
          { name: "category", label: "Danh mục" },
          { name: "publishedAt", label: "Ngày đăng", type: "date" },
          { name: "summary", label: "Tóm tắt", type: "textarea" },
          {
            name: "fileUrl",
            label: "Link file",
            type: "file",
            helpText: "Upload PDF, DOC, XLS hoặc dán đường dẫn tài liệu.",
          },
        ]}
      />
    </AdminShell>
  );
}
