import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getPosts } from "@/lib/content";

export default async function AdminPostsPage() {
  const session = await requireAdminPage("/admin/posts");
  const posts = await getPosts(undefined, { includeUnpublished: true });
  const isAdmin = session.role === "admin";
  const isBusiness = session.role === "business";
  const visiblePosts = isAdmin ? posts : posts.filter((post) => post.submittedBy === session.userId);
  const postFields = [
    { name: "title", label: "Tiêu đề", section: "Soạn bài", fullWidth: true },
    { name: "slug", label: "Slug", section: "Thiết lập" },
    {
      name: "type",
      label: "Loại",
      type: "select" as const,
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
    ...(isAdmin
      ? [
          {
            name: "status",
            label: "Trạng thái duyệt",
            type: "select" as const,
            section: "Thiết lập",
            helpText: "Chọn Đã xuất bản để duyệt và hiển thị ngoài website.",
            options: [
              { label: "Bản nháp", value: "draft" },
              { label: "Chờ duyệt", value: "pending" },
              { label: "Đã xuất bản", value: "published" },
            ],
          },
        ]
      : []),
    {
      name: "publishedAt",
      label: "Ngày đăng",
      type: "date" as const,
      section: "Thiết lập",
    },
    {
      name: "displayDate",
      label: "Ngày hiển thị",
      type: "date" as const,
      section: "Thiết lập",
      helpText: "Nếu để trống sẽ dùng ngày đăng. Bài bắt đầu hiển thị từ 01:00 sáng ngày này.",
    },
    {
      name: "excerpt",
      label: "Tóm tắt",
      type: "textarea" as const,
      section: "Soạn bài",
      fullWidth: true,
    },
    {
      name: "content",
      label: "Nội dung",
      type: "richtext" as const,
      section: "Trình soạn thảo",
      fullWidth: true,
      helpText: "Editor hỗ trợ định dạng, highlight, heading, bullet, link, ảnh upload ImageKit và video YouTube.",
    },
    {
      name: "featuredImage",
      label: "Ảnh đại diện",
      type: "image" as const,
      section: "Media",
      fullWidth: true,
      helpText: "Dán link hoặc upload ảnh. Gợi ý: 1600 x 900 px, JPG/WebP dưới 1 MB.",
    },
    ...(isAdmin
      ? [
          {
            name: "isFeatured",
            label: "Tin nổi bật",
            type: "checkbox" as const,
            section: "Thiết lập",
          },
        ]
      : []),
  ];

  return (
    <AdminShell
      title="Quản lý bài viết"
      description={
        isAdmin
          ? "Admin có quyền đăng, duyệt và xuất bản bài viết."
          : isBusiness
            ? "Tài khoản doanh nghiệp có thể đăng bài và tự chịu trách nhiệm với nội dung đã đăng."
            : "Quản lý có thể soạn bài mới. Bài viết sẽ chờ admin duyệt trước khi hiển thị ngoài website."
      }
    >
      <CollectionManager
        collection="posts"
        title="Bài viết"
        description="Danh sách tin tức, sự kiện, lịch tuần và bài kết nối giao thương."
        initialItems={visiblePosts as unknown as Record<string, unknown>[]}
        panelMaxWidthClass="max-w-[1360px]"
        fields={postFields}
      />
    </AdminShell>
  );
}
