import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getDownloadCategories, getDownloads } from "@/lib/content";

export default async function AdminDownloadsPage() {
  const [categories, downloads] = await Promise.all([getDownloadCategories(), getDownloads()]);

  return (
    <AdminShell
      title="Quản lý tài liệu"
      description="Quản lý danh mục và file tài liệu theo cấu trúc folder rõ ràng, dễ nhìn."
    >
      <CollectionManager
        collection="downloadCategories"
        title="Danh mục tài liệu"
        description="Tạo và sắp xếp các nhóm như Thông báo, Biểu mẫu, Tài liệu hội viên."
        initialItems={categories as unknown as Record<string, unknown>[]}
        fields={[
          { name: "name", label: "Tên danh mục" },
          { name: "slug", label: "Slug" },
          { name: "order", label: "Thứ tự" },
          { name: "description", label: "Mô tả", type: "textarea" },
        ]}
      />

      <CollectionManager
        collection="downloads"
        title="File tài liệu"
        description="Mỗi file hiển thị gọn một dòng và gắn vào danh mục tương ứng."
        initialItems={downloads as unknown as Record<string, unknown>[]}
        fields={[
          { name: "title", label: "Tiêu đề" },
          { name: "slug", label: "Slug" },
          {
            name: "category",
            label: "Tên danh mục",
            type: "select",
            options: categories.map((item) => ({ label: item.name, value: item.name })),
          },
          {
            name: "categorySlug",
            label: "Slug danh mục",
            type: "select",
            options: categories.map((item) => ({ label: item.slug, value: item.slug })),
          },
          { name: "publishedAt", label: "Ngày đăng", type: "date" },
          { name: "summary", label: "Tóm tắt", type: "textarea" },
          {
            name: "fileUrl",
            label: "Link file",
            type: "file",
            helpText: "Upload file hoặc dán đường dẫn tài liệu.",
          },
        ]}
      />
    </AdminShell>
  );
}
