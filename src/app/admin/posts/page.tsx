import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getPosts } from "@/lib/content";

export default async function AdminPostsPage() {
  await requireAdminPage("/admin/posts");

  const posts = await getPosts();

  return (
    <AdminShell
      title="Quản lý bài viết"
      description="Quản lý tin tức, sự kiện, lịch tuần và bài kết nối giao thương hiển thị ngoài website."
    >
      <CollectionManager
        collection="posts"
        title="Bài viết"
        description="Danh sách bài viết đang hiển thị ngoài website."
        initialItems={posts as unknown as Record<string, unknown>[]}
        fields={[
          { name: "title", label: "Tiêu đề" },
          { name: "slug", label: "Slug" },
          {
            name: "type",
            label: "Loại",
            type: "select",
            options: [
              { label: "Tin tức", value: "news" },
              { label: "Sự kiện", value: "event" },
              { label: "Lịch tuần", value: "schedule" },
              { label: "Giao thương", value: "trade" },
              { label: "Đồng hành", value: "sponsor" },
            ],
          },
          { name: "category", label: "Danh mục" },
          { name: "excerpt", label: "Tóm tắt", type: "textarea" },
          {
            name: "content",
            label: "Nội dung",
            type: "richtext",
            helpText: "Có thể chèn ảnh, liên kết và video YouTube.",
          },
          {
            name: "featuredImage",
            label: "Ảnh đại diện",
            type: "image",
            helpText: "Dán link hoặc upload ảnh. Gợi ý: 1600 x 900 px.",
          },
          { name: "publishedAt", label: "Ngày đăng", type: "date" },
          { name: "isFeatured", label: "Nổi bật", type: "checkbox" },
        ]}
      />
    </AdminShell>
  );
}
