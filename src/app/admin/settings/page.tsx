import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path d="M13 7l4 4" />
    </svg>
  );
}

const sections = [
  { href: "/admin/settings/branding", title: "Nhận diện website" },
  { href: "/admin/settings/homepage", title: "Nội dung trang chủ" },
  { href: "/admin/settings/contact", title: "Menu và liên hệ" },
  { href: "/admin/settings/supporters", title: "Doanh nghiệp đồng hành" },
  { href: "/admin/settings/theme", title: "Giao diện" },
];

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Cấu hình website" description="Chọn mục cần chỉnh sửa.">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="space-y-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={`${section.href}?mode=edit`}
              className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-slate-950/35 px-4 py-3 transition hover:border-cyan-300/30"
            >
              <span className="truncate text-sm font-semibold text-white">{section.title}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                <EditIcon />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
