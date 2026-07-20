"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 13h7V4H4zM13 20h7v-9h-7zM13 11h7V4h-7zM4 20h7v-5H4z" />
    </svg>
  );
}

function PostIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 4h12v16H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M3.5 19a4 4 0 0 1 8 0M13.5 19a3.5 3.5 0 0 1 7 0" />
    </svg>
  );
}

function PartnerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 8l4 4 4-4" />
      <path d="M6 16l6-6 6 6" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H4" />
      <path d="M20 4v16" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6.5 9.5V20h11V9.5" />
    </svg>
  );
}

const nav = [
  { key: "dashboard", label: "Tổng quan", href: "/admin", icon: DashboardIcon },
  { key: "posts", label: "Bài viết", href: "/admin/posts", icon: PostIcon },
  { key: "members", label: "Hội viên", href: "/admin/members", icon: GroupIcon },
  { key: "partners", label: "Đối tác", href: "/admin/partners", icon: PartnerIcon },
  { key: "downloads", label: "Tài liệu", href: "/admin/downloads", icon: FileIcon },
  { key: "users", label: "Người dùng", href: "/admin/users", icon: UserIcon },
  { key: "settings", label: "Cấu hình", href: "/admin/settings", icon: SettingsIcon },
];

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [allowedNav, setAllowedNav] = useState<string[] | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/admin/me", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted) {
          setAllowedNav(Array.isArray(data?.navKeys) ? data.navKeys : []);
        }
      })
      .catch(() => {
        if (isMounted) setAllowedNav([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    nav.forEach((item) => router.prefetch(item.href));
    router.prefetch("/admin/profile");
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsNavigating(false), 80);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const visibleNav = allowedNav ? nav.filter((item) => allowedNav.includes(item.key)) : nav;

  return (
    <div className="admin-root min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div
        className={`fixed left-0 top-0 z-[80] h-0.5 bg-cyan-300 transition-all duration-300 ${
          isNavigating ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[96px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
          <div className="flex h-full flex-col items-center justify-between gap-4">
            <nav className="flex w-full flex-col items-center gap-2">
              {visibleNav.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    onClick={() => {
                      if (item.href !== pathname) {
                        setIsNavigating(true);
                      }
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                      isActive
                        ? "bg-cyan-400 text-slate-950 shadow-[0_14px_40px_rgba(34,211,238,0.35)]"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <Icon />
                  </Link>
                );
              })}
            </nav>

            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Đăng xuất"
                title="Đăng xuất"
              >
                <LogoutIcon />
              </button>
            </form>
          </div>
        </aside>

        <main className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-4">
            <div>
              <h1 className="text-3xl font-semibold text-white">{title}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
            </div>

            <Link
              href="/"
              prefetch
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <HomeIcon />
              <span>Trang chủ</span>
            </Link>
            <Link
              href="/admin/profile"
              prefetch
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition hover:bg-white/10"
              title="Hồ sơ"
              aria-label="Hồ sơ"
            >
              <UserIcon />
            </Link>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
