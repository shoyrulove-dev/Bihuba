"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function Icon({ children }: { children: ReactNode }) { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">{children}</svg>; }
const DashboardIcon = () => <Icon><path d="M4 13h7V4H4zM13 20h7v-9h-7zM13 11h7V4h-7zM4 20h7v-5H4z" /></Icon>;
const PostIcon = () => <Icon><path d="M6 4h12v16H6z" /><path d="M9 8h6M9 12h6M9 16h4" /></Icon>;
const GroupIcon = () => <Icon><path d="M7.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path d="M3.5 19a4 4 0 0 1 8 0M13.5 19a3.5 3.5 0 0 1 7 0" /></Icon>;
const PartnerIcon = () => <Icon><path d="M8 8l4 4 4-4" /><path d="M6 16l6-6 6 6" /></Icon>;
const FileIcon = () => <Icon><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></Icon>;
const SettingsIcon = () => <Icon><circle cx="12" cy="12" r="3.5" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a8 8 0 0 0-1.7-1L14.5 3h-4L10 6a8 8 0 0 0-1.7 1L6 6 4 9.5 6 11a7 7 0 0 0 0 2l-2 1.5L6 18l2.3-1a8 8 0 0 0 1.7 1l.5 3h4l.3-3a8 8 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5a7 7 0 0 0 .1-1Z" /></Icon>;
const UserIcon = () => <Icon><circle cx="12" cy="8" r="4" /><path d="M5 20a7 7 0 0 1 14 0" /></Icon>;
const ShieldIcon = () => <Icon><path d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></Icon>;
const LogoutIcon = () => <Icon><path d="M10 17l5-5-5-5M15 12H4M20 4v16" /></Icon>;
const MenuIcon = () => <Icon><path d="M4 7h16M4 12h16M4 17h16" /></Icon>;
const CloseIcon = () => <Icon><path d="m6 6 12 12M18 6 6 18" /></Icon>;
const BellIcon = () => <Icon><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></Icon>;
const HomeIcon = () => <Icon><path d="M4 10.5 12 4l8 6.5M6.5 9.5V20h11V9.5" /></Icon>;

const nav = [
  { key: "dashboard", label: "Tổng quan", href: "/admin", icon: DashboardIcon },
  { key: "ekyc", label: "Hồ sơ E-KYC", href: "/admin/ekyc", icon: ShieldIcon },
  { key: "members", label: "Hội viên", href: "/admin/members", icon: GroupIcon },
  { key: "partners", label: "Đối tác", href: "/admin/partners", icon: PartnerIcon },
  { key: "posts", label: "Tin tức & bài viết", href: "/admin/posts", icon: PostIcon },
  { key: "downloads", label: "Tài liệu", href: "/admin/downloads", icon: FileIcon },
  { key: "users", label: "Người dùng", href: "/admin/users", icon: UserIcon },
  { key: "settings", label: "Cấu hình hệ thống", href: "/admin/settings", icon: SettingsIcon },
];

export function AdminShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  const pathname = usePathname();
  const [allowedNav, setAllowedNav] = useState<string[] | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/admin/me", { cache: "no-store" }).then((response) => response.ok ? response.json() : null).then((data) => {
      if (isMounted) setAllowedNav(Array.isArray(data?.navKeys) ? data.navKeys : []);
    }).catch(() => { if (isMounted) setAllowedNav([]); });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => { const timer = window.setTimeout(() => setIsNavigating(false), 80); return () => window.clearTimeout(timer); }, [pathname]);
  const visibleNav = allowedNav ? nav.filter((item) => allowedNav.includes(item.key)) : nav;

  const menu = (
    <>
      <div className="flex items-center gap-3 px-3 pb-7 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 text-lg font-black text-[#062143] shadow-[0_10px_26px_rgba(34,211,238,0.24)]">B</div>
        <div><p className="text-lg font-bold tracking-tight text-white">BIHUBA</p><p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-200/80">B2B Admin</p></div>
      </div>
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Điều hành</p>
      <nav className="space-y-1">
        {visibleNav.map((item) => {
          const ItemIcon = item.icon;
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          return <Link key={item.href} href={item.href} onClick={() => { setIsMobileMenuOpen(false); if (item.href !== pathname) setIsNavigating(true); }} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-[#1769e8] text-white shadow-[0_10px_25px_rgba(23,105,232,0.34)]" : "text-slate-300 hover:bg-white/8 hover:text-white"}`}><ItemIcon /><span>{item.label}</span></Link>;
        })}
      </nav>
      <div className="mt-auto rounded-xl border border-cyan-200/10 bg-white/5 px-3 py-3 text-xs leading-5 text-slate-400">Khu vực điều hành nội dung, hội viên và dữ liệu giao thương BIHUBA.</div>
    </>
  );

  return <div className="admin-root min-h-screen overflow-x-hidden bg-[#f4f7fb] text-slate-900">
    <div className={`fixed left-0 top-0 z-[100] h-1 bg-cyan-400 transition-all duration-300 ${isNavigating ? "w-full opacity-100" : "w-0 opacity-0"}`} />
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[270px] flex-col bg-[linear-gradient(180deg,#071d3b_0%,#082a55_55%,#061a35_100%)] px-4 py-6 shadow-[10px_0_40px_rgba(2,18,43,0.14)] lg:flex">{menu}</aside>
    {isMobileMenuOpen ? <div className="fixed inset-0 z-[70] bg-slate-950/50 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileMenuOpen(false)}><aside className="flex h-full w-[290px] flex-col bg-[#08234a] px-4 py-6 shadow-2xl" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setIsMobileMenuOpen(false)} className="absolute right-4 top-4 text-slate-300"><CloseIcon /></button>{menu}</aside></div> : null}
    <div className="min-w-0 min-h-screen lg:pl-[270px]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-3"><div className="flex items-center gap-3"><button type="button" onClick={() => setIsMobileMenuOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"><MenuIcon /></button><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">BIHUBA / Quản trị</p><p className="hidden text-sm font-semibold text-slate-700 sm:block">Trung tâm điều hành B2B</p></div></div><div className="flex items-center gap-1.5"><Link href="/" className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#1769e8]"><HomeIcon /><span className="hidden md:inline">Xem website</span></Link><form action="/api/auth/logout" method="post"><button type="submit" className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"><LogoutIcon /><span className="hidden md:inline">Đăng xuất</span></button></form><button type="button" aria-label="Thông báo" className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-[#1769e8]"><BellIcon /></button><Link href="/admin/profile" className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 pr-3 text-sm font-semibold text-slate-700 shadow-sm"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e6f2ff] text-[#1769e8]"><UserIcon /></span><span className="hidden sm:inline">Hồ sơ</span></Link></div></div>
      </header>
      <main className="mx-auto min-w-0 max-w-[1560px] space-y-5 px-4 py-5 lg:px-6 lg:py-6 2xl:px-8"><section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end"><div><h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{description}</p></div><div className="hidden rounded-xl bg-blue-50 px-3 py-2 text-xs font-medium text-[#1769e8] md:block">Hệ thống vận hành BIHUBA</div></section>{children}</main>
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500 lg:px-8">Copyright @2026 Theme BIHUBA B2B Admin Dashboard</footer>
    </div>
  </div>;
}
