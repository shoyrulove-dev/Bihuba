import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getPosts } from "@/lib/content";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <AdminShell
      title="Quản lý bài viết"
      description="Dùng cho tin tức, sự kiện, lịch tuần, kết nối giao thương và doanh nghiệp đồng hành."
    >
      <CollectionManager
        collection="posts"
        title="Bài viết"
        description="Tập trung quản lý tin tức, sự kiện, lịch tuần và các nội dung nổi bật."
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
            helpText: "Editor hỗ trợ heading, link, highlight, ảnh upload và video YouTube.",
          },
          {
            name: "featuredImage",
            label: "Ảnh đại diện",
            type: "image",
            helpText: "Có thể dán URL hoặc upload ảnh trực tiếp qua ImageKit. Gợi ý: 1600 x 900 hoặc 1920 x 1080.",
          },
          { name: "publishedAt", label: "Ngày đăng", type: "date" },
          { name: "isFeatured", label: "Nổi bật", type: "checkbox" },
        ]}
      />
    </AdminShell>
  );
}
