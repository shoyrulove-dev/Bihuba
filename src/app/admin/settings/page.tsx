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

  return <AdminShell title="Cấu hình hệ thống" description="Quản lý theo từng nhóm để cập nhật nhanh, rõ ràng và nhất quán như một hệ thống SaaS.">
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-6">{groups.map((group) => <section key={group} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] sm:p-6"><div className="mb-5 flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold text-slate-900">{group}</h2><p className="mt-1 text-xs text-slate-500">Chọn mô-đun cần cập nhật</p></div><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#1769e8]">{visibleSections.filter((section) => section.group === group).length} mô-đun</span></div><div className="grid gap-3 md:grid-cols-2">{visibleSections.filter((section) => section.group === group).map((section) => <Link key={section.href} href={section.href} className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm"><div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf2ff] text-lg font-semibold text-[#1769e8]">{section.icon}</span><span className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition group-hover:bg-white group-hover:text-[#1769e8]"><ArrowIcon /></span></div><h3 className="mt-4 text-sm font-semibold text-slate-800">{section.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{section.description}</p></Link>)}</div></section>)}</div>
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] sm:p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Tình trạng cấu hình</p><h2 className="mt-2 text-lg font-semibold text-slate-900">Sẵn sàng vận hành</h2><p className="mt-2 text-sm leading-6 text-slate-500">Các mô-đun dưới đây dùng dữ liệu cấu hình thật của BIHUBA.</p><div className="mt-6 space-y-4">{groups.map((group, index) => <div key={group}><div className="flex justify-between gap-3 text-xs"><span className="truncate text-slate-600">{group}</span><span className="font-semibold text-slate-900">{visibleSections.filter((section) => section.group === group).length}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#1769e8]" style={{ width: `${[100, 84, 68][index] ?? 68}%` }} /></div></div>)}</div><div className="mt-7 rounded-xl bg-[#082a55] p-4 text-sm leading-6 text-blue-100">Mẹo: cập nhật nhận diện và giao diện trước, sau đó kiểm tra SEO trước khi xuất bản thay đổi lớn.</div></aside>
    </section>
  </AdminShell>;
}
