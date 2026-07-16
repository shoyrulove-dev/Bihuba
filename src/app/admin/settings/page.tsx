import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { getSiteSettings } from "@/lib/content";

const sections = [
  {
    href: "/admin/settings/branding",
    title: "Nhận diện website",
    description: "Tên website, tên ngắn, logo và slogan.",
  },
  {
    href: "/admin/settings/homepage",
    title: "Nội dung trang chủ",
    description: "Hero, giới thiệu và các thống kê đang hiện ngoài trang chủ.",
  },
  {
    href: "/admin/settings/contact",
    title: "Menu và liên hệ",
    description: "Menu đầu trang, thông tin liên hệ và 3 nút nổi bên phải.",
  },
  {
    href: "/admin/settings/supporters",
    title: "Doanh nghiệp đồng hành",
    description: "Danh sách logo chạy dưới footer.",
  },
  {
    href: "/admin/settings/theme",
    title: "Giao diện",
    description: "Màu sắc và cỡ chữ chính của website.",
  },
];

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
      description="Chọn từng nhóm nhỏ để chỉnh sửa nhanh và gọn hơn."
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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/30 hover:bg-white/8"
          >
            <p className="text-sm font-semibold text-white">{section.title}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{section.description}</p>
          </Link>
        ))}
      </section>
    </AdminShell>
  );
}
