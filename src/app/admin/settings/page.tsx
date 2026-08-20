import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { getSessionPermissions } from "@/lib/permissions";

function ArrowIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>; }

const sections = [
  { href: "/admin/settings/branding?mode=edit", title: "Nhận diện website", description: "Logo, tên hiển thị và thông tin thương hiệu.", permission: "settings", icon: "✦", group: "Thương hiệu & giao diện" },
  { href: "/admin/settings/theme?mode=edit", title: "Giao diện", description: "Màu sắc, font chữ và tỷ lệ nội dung.", permission: "settings", icon: "◐", group: "Thương hiệu & giao diện" },
  { href: "/admin/settings/homepage?mode=edit", title: "Nội dung trang chủ", description: "Banner, giới thiệu và khối thông tin nổi bật.", permission: "settings", icon: "▦", group: "Nội dung & giao thương" },
  { href: "/admin/settings/supporters?mode=edit", title: "Doanh nghiệp đồng hành", description: "Logo, liên kết và thứ tự hiển thị đối tác.", permission: "supporters", icon: "◎", group: "Nội dung & giao thương" },
  { href: "/admin/settings/contact?mode=edit", title: "Menu & liên hệ", description: "Điều hướng, thông tin liên lạc và mạng xã hội.", permission: "settings", icon: "⌁", group: "Nội dung & giao thương" },
  { href: "/admin/settings/seo?mode=edit", title: "SEO & Google", description: "Tiêu đề, mô tả và dữ liệu hiển thị tìm kiếm.", permission: "settings", icon: "↗", group: "Hệ thống & tăng trưởng" },
  { href: "/admin/settings/ai?mode=edit", title: "Trợ lý BIHUBA AI", description: "Thiết lập trợ lý và nội dung hỗ trợ người dùng.", permission: "settings", icon: "◌", group: "Hệ thống & tăng trưởng" },
];

export default async function AdminSettingsPage() {
  const session = await requireAdminPage("/admin/settings");
  const permissions = await getSessionPermissions(session);
  const visibleSections = session.role === "admin" ? sections : sections.filter((section) => permissions.includes(section.permission as (typeof permissions)[number]));
  const groups = Array.from(new Set(visibleSections.map((section) => section.group)));

  return <AdminShell title="Cấu hình hệ thống" description="Các mô-đun được sắp xếp dạng danh sách để dễ rà soát và cập nhật nhanh.">
    <section className="mx-auto max-w-5xl space-y-6">
      {groups.map((group) => {
        const items = visibleSections.filter((section) => section.group === group);
        return <section key={group} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,.045)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"><div><h2 className="text-base font-semibold text-slate-900">{group}</h2><p className="mt-1 text-xs text-slate-500">Chọn mô-đun cần cập nhật</p></div><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#1769e8]">{items.length} mô-đun</span></div>
          <div className="divide-y divide-slate-100">{items.map((section) => <Link key={section.href} href={section.href} className="group flex items-center gap-4 px-5 py-4 transition hover:bg-blue-50/50 sm:px-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff] text-lg font-semibold text-[#1769e8]">{section.icon}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-800">{section.title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{section.description}</span></span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition group-hover:bg-white group-hover:text-[#1769e8]"><ArrowIcon /></span></Link>)}</div>
        </section>;
      })}
      <aside className="rounded-2xl bg-[#082a55] p-5 text-sm leading-6 text-blue-100"><strong className="text-white">Gợi ý vận hành:</strong> cập nhật nhận diện và giao diện trước, sau đó kiểm tra SEO trước khi xuất bản các thay đổi lớn.</aside>
    </section>
  </AdminShell>;
}
