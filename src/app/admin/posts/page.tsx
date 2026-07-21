import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { requireAdminPage } from "@/lib/admin-auth";
import { getPosts } from "@/lib/content";
import { canApprovePosts } from "@/lib/permissions";

export default async function AdminPostsPage() {
  const session = await requireAdminPage("/admin/posts");
  const posts = await getPosts(undefined, { includeUnpublished: true });
  const isAdmin = session.role === "admin";
  const isBusiness = session.role === "business";
  const canApprove = await canApprovePosts(session);
  const visiblePosts = isAdmin || canApprove ? posts : posts.filter((post) => post.submittedBy === session.userId);
  const postTypeOptions = [
    { label: "Tin tức", value: "news" },
    { label: "Sự kiện", value: "event" },
    { label: "Lịch làm việc", value: "schedule" },
  ];
  const postFields = [
    { name: "title", label: "Tiêu đề", section: "Soạn bài", fullWidth: true },
    { name: "slug", label: "Slug", section: "Thiết lập" },
    {
      name: "type",
      label: "Hạng mục",
      type: "select" as const,
      section: "Thiết lập",
      helpText: "Chọn hạng mục chính, website sẽ tự chia bài vào đúng khu vực.",
      options: postTypeOptions,
    },
    ...(canApprove
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
      helpText:
        "Chuẩn bắt buộc cho mọi bảng tin: ảnh ngang 16:9 như banner Blissbio. Khuyến nghị 1600 x 900 px hoặc 1200 x 675 px, JPG/WebP nhẹ dưới 1 MB. Nội dung chính nên nằm giữa ảnh để hiển thị đẹp ở Tin tức, Sự kiện, Kết nối giao thương và Lịch làm việc.",
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
        canApprove
          ? "Tài khoản có quyền đăng, duyệt và xuất bản bài viết."
          : isBusiness
            ? "Tài khoản doanh nghiệp có thể gửi bài và tự chịu trách nhiệm với nội dung đã đăng. Bài viết sẽ chờ duyệt trước khi hiển thị."
            : "Quản lý có thể soạn bài mới. Bài viết sẽ chờ admin duyệt trước khi hiển thị ngoài website."
      }
    >
      <CollectionManager
        collection="posts"
        title="Bài viết"
        description="Chọn hạng mục để tự chia bài vào Tin tức, Sự kiện hoặc Lịch làm việc. Form mẫu nằm ở mục Tài liệu/Download."
        initialItems={visiblePosts as unknown as Record<string, unknown>[]}
        panelMaxWidthClass="max-w-[1360px]"
        fields={postFields}
        filterField="type"
        filterOptions={postTypeOptions}
      />
    </AdminShell>
  );
}
