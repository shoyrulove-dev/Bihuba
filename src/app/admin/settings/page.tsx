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
  const systemCards = [
    {
      label: "Website",
      value: settings.contact.website || "Chưa cấu hình",
      helper: "Địa chỉ website công khai",
    },
    {
      label: "Trang quản trị",
      value: "/admin/login",
      helper: "Đường dẫn đăng nhập quản trị",
    },
    {
      label: "ImageKit",
      value: imageKitConfigured ? "Đã kết nối" : "Chưa cấu hình",
      helper:
        process.env.IMAGEKIT_URL_ENDPOINT ||
        "Thiếu IMAGEKIT_PUBLIC_KEY / IMAGEKIT_PRIVATE_KEY / IMAGEKIT_URL_ENDPOINT",
    },
    {
      label: "Thư mục upload",
      value: process.env.IMAGEKIT_BASE_FOLDER || "bihuba",
      helper: "Thư mục media đang dùng cho website",
    },
  ];

  return (
    <AdminShell
      title="Cấu hình website"
      description="Cấu hình tên site, logo, hero, CTA và các khối giới thiệu chính."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {systemCards.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {item.label}
            </p>
            <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.helper}</p>
          </article>
        ))}
      </section>

      <CollectionManager
        collection="settings"
        title="Cấu hình website"
        description="Cập nhật tên website, khu vực nổi bật, menu điều hướng, số liệu hiển thị và thông tin liên hệ."
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
            helpText: "Logo hiển thị ở header, footer và hero.",
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
        ]}
      />
    </AdminShell>
  );
}
