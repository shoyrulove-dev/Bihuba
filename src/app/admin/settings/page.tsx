import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionManager } from "@/components/admin/collection-manager";
import { getSiteSettings } from "@/lib/content";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const imageKitConfigured = Boolean(
    process.env.IMAGEKIT_PUBLIC_KEY &&
      process.env.IMAGEKIT_PRIVATE_KEY &&
      process.env.IMAGEKIT_URL_ENDPOINT
  );

  return (
    <AdminShell
      title="Cấu hình website"
      description="Tất cả thông tin website, menu, liên hệ, ImageKit, nút nổi, doanh nghiệp đồng hành và giao diện đều chỉnh trong một nơi."
    >
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-300">
        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Website
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              {settings.contact.website || "Chưa cấu hình"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              ImageKit
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              {imageKitConfigured ? "Đã kết nối" : "Chưa cấu hình"}
            </p>
            <p className="text-xs text-slate-400">
              {process.env.IMAGEKIT_URL_ENDPOINT || "Thiếu biến môi trường ImageKit"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Thư mục upload
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              {process.env.IMAGEKIT_BASE_FOLDER || "bihuba"}
            </p>
          </div>
        </div>
      </section>

      <CollectionManager
        collection="settings"
        title="Cấu hình website"
        description="Tại đây bạn chỉnh toàn bộ logo, nội dung trang chủ, menu, thông tin liên hệ, nút nổi, doanh nghiệp đồng hành và giao diện website."
        initialItems={[settings as unknown as Record<string, unknown>]}
        singleton
        allowDelete={false}
        fields={[
          { name: "siteName", label: "Tên đầy đủ" },
          { name: "shortName", label: "Tên ngắn" },
          {
            name: "logoUrl",
            label: "Logo website",
            type: "image",
            helpText: "Logo hiển thị ở header, footer và hero. Gợi ý: PNG vuông 1200 x 1200 nền trong suốt.",
          },
          { name: "slogan", label: "Slogan" },
          { name: "heroTitle", label: "Tiêu đề hero" },
          { name: "heroSubtitle", label: "Mô tả hero", type: "textarea" },
          { name: "heroCtaLabel", label: "Nhãn CTA" },
          { name: "heroCtaHref", label: "Link CTA" },
          { name: "introTitle", label: "Tiêu đề giới thiệu" },
          { name: "introBody", label: "Nội dung giới thiệu", type: "textarea" },
          {
            name: "memberStats",
            label: "Thống kê trang chủ",
            type: "stats",
            helpText: "Mỗi dòng gồm nhãn hiển thị và con số tương ứng.",
          },
          {
            name: "nav",
            label: "Menu điều hướng",
            type: "nav",
            helpText: "Cập nhật tên mục menu và đường dẫn hiển thị ở đầu trang.",
          },
          {
            name: "contact",
            label: "Thông tin liên hệ",
            type: "contact",
            helpText: "Thông tin hiển thị ở footer và trang liên hệ.",
          },
          {
            name: "floatingActions",
            label: "Nút nổi bên phải",
            type: "social",
            helpText: "Cấu hình Zalo, Facebook và nút gọi nhanh hiển thị ở góc phải màn hình.",
          },
          {
            name: "supporterCompanies",
            label: "Doanh nghiệp đồng hành",
            type: "supporters",
            helpText: "Danh sách logo chạy ngang phía dưới footer.",
          },
          {
            name: "theme",
            label: "Giao diện website",
            type: "theme",
            helpText: "Điều chỉnh màu chính, màu nhấn, nền sáng và cỡ chữ toàn website.",
          },
        ]}
      />
    </AdminShell>
  );
}
