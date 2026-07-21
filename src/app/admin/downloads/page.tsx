import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getDownloadCategories, getDownloads } from "@/lib/content";

export default async function AdminDownloadsPage() {
  await requireAdminPage("/admin/downloads");

  const [categories, downloads] = await Promise.all([getDownloadCategories(), getDownloads()]);

  return (
    <AdminShell
      title="Quản lý tài liệu"
      description="Quản lý danh mục và file tài liệu theo cấu trúc rõ ràng, hỗ trợ ảnh bìa và upload file trực tiếp từ máy."
    >
      <CollectionManager
        collection="downloadCategories"
        title="Danh mục tài liệu"
        description="Tạo và sắp xếp các nhóm như Thông báo, Form mẫu, Tài liệu hội viên."
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
        description="Mỗi tài liệu có thumbnail gọn ngoài danh sách, ảnh bìa riêng trong trang chi tiết và file gốc để xem hoặc tải."
        initialItems={downloads as unknown as Record<string, unknown>[]}
        fields={[
          { name: "title", label: "Tiêu đề" },
          { name: "slug", label: "Slug" },
          {
            name: "documentType",
            label: "Loại tài liệu",
            type: "select",
            options: [
              { label: "Thông báo", value: "Thông báo" },
              { label: "Form mẫu", value: "Form mẫu" },
              { label: "Quyết định", value: "Quyết định" },
              { label: "Báo cáo", value: "Báo cáo" },
              { label: "Văn bản", value: "Văn bản" },
            ],
          },
          {
            name: "category",
            label: "Tên danh mục",
            type: "select",
            options: categories.map((item) => ({ label: item.name, value: item.name })),
          },
          { name: "publishedAt", label: "Ngày đăng", type: "date" },
          {
            name: "fileFormat",
            label: "Định dạng file",
            type: "select",
            options: [
              { label: "PDF", value: "pdf" },
              { label: "DOC", value: "doc" },
              { label: "DOCX", value: "docx" },
              { label: "XLS", value: "xls" },
              { label: "XLSX", value: "xlsx" },
              { label: "PPT", value: "ppt" },
              { label: "Khác", value: "other" },
            ],
          },
          { name: "summary", label: "Tóm tắt", type: "textarea" },
          {
            name: "coverImage",
            label: "Ảnh bìa",
            type: "image",
            helpText:
              "Dùng làm thumbnail ngoài danh sách và banner gọn trong trang chi tiết. Khuyến nghị ảnh ngang 1600x900px hoặc 1200x675px, JPG/WebP nhẹ.",
          },
          {
            name: "fileUrl",
            label: "File PDF / DOC / XLS",
            type: "file",
            helpText: "Tải file từ máy lên ImageKit hoặc dán đường dẫn file tài liệu.",
          },
        ]}
      />
    </AdminShell>
  );
}
