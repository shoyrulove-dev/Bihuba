import Link from "next/link";
import { ReactNode } from "react";

const nav = [
  { label: "Tổng quan", href: "/admin" },
  { label: "Bài viết", href: "/admin/posts" },
  { label: "Hội viên", href: "/admin/members" },
  { label: "Đối tác", href: "/admin/partners" },
  { label: "Tài liệu", href: "/admin/downloads" },
  { label: "Site settings", href: "/admin/settings" },
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
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <Link
            href="/"
            className="block rounded-2xl bg-cyan-400 px-4 py-3 font-black text-slate-950"
          >
            BIHUBA CMS
          </Link>
          <nav className="mt-8 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-linear-to-br from-cyan-500 to-blue-700 p-8 text-slate-950">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl font-semibold">{title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-900/80">
                  {description}
                </p>
              </div>
              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="rounded-full border border-slate-950/20 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Đăng xuất
                </button>
              </form>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
