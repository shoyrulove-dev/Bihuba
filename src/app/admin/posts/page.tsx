import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getPosts } from "@/lib/content";

export default async function AdminPostsPage() {
  const session = await requireAdminPage("/admin/posts");
  const posts = await getPosts(undefined, { includeUnpublished: true });
  const isAdmin = session.role === "admin";

  return (
    <AdminShell
      title="Quản lý bài viết"
      description={
        isAdmin
          ? "Admin có quyền đăng, duyệt và xuất bản bài viết."
          : "Quản lý có thể soạn bài mới. Bài viết sẽ chờ admin duyệt trước khi hiển thị ngoài website."
      }
    >
      <CollectionManager
        collection="posts"
        title="Bài viết"
        description="Danh sách tin tức, sự kiện, lịch tuần và bài kết nối giao thương."
        initialItems={posts as unknown as Record<string, unknown>[]}
        panelMaxWidthClass="max-w-6xl"
        fields={[
          { name: "title", label: "Tiêu đề", section: "Soạn bài", fullWidth: true },
          { name: "slug", label: "Slug", section: "Thiết lập" },
          {
            name: "type",
            label: "Loại",
            type: "select",
            section: "Thiết lập",
            options: [
              { label: "Tin tức", value: "news" },
              { label: "Sự kiện", value: "event" },
              { label: "Lịch tuần", value: "schedule" },
              { label: "Giao thương", value: "trade" },
              { label: "Đồng hành", value: "sponsor" },
            ],
          },
          { name: "category", label: "Danh mục", section: "Thiết lập" },
          {
            name: "status",
            label: "Trạng thái duyệt",
            type: "select",
            section: "Thiết lập",
            helpText: isAdmin ? "Chọn Published để duyệt và hiển thị ngoài website." : "Tài khoản quản lý luôn gửi bài ở trạng thái Chờ duyệt.",
            options: [
              { label: "Bản nháp", value: "draft" },
              { label: "Chờ duyệt", value: "pending" },
              { label: "Đã xuất bản", value: "published" },
            ],
          },
          {
            name: "publishedAt",
            label: "Ngày đăng",
            type: "date",
            section: "Thiết lập",
          },
          {
            name: "excerpt",
            label: "Tóm tắt",
            type: "textarea",
            section: "Soạn bài",
            fullWidth: true,
          },
          {
            name: "content",
            label: "Nội dung",
            type: "richtext",
            section: "Trình soạn thảo",
            fullWidth: true,
            helpText: "Editor hỗ trợ định dạng, highlight, heading, bullet, link, ảnh upload ImageKit và video YouTube.",
          },
          {
            name: "featuredImage",
            label: "Ảnh đại diện",
            type: "image",
            section: "Media",
            fullWidth: true,
            helpText: "Dán link hoặc upload ảnh. Gợi ý: 1600 x 900 px, JPG/WebP dưới 1 MB.",
          },
          {
            name: "isFeatured",
            label: "Tin nổi bật",
            type: "checkbox",
            section: "Thiết lập",
          },
        ]}
      />
    </AdminShell>
  );
}
