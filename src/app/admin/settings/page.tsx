import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { getSessionPermissions } from "@/lib/permissions";

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path d="M13 7l4 4" />
    </svg>
  );
}

const sections = [
  { href: "/admin/settings/branding?mode=edit", title: "Nhận diện website", permission: "settings" },
  { href: "/admin/settings/homepage?mode=edit", title: "Nội dung trang chủ", permission: "settings" },
  { href: "/admin/settings/contact?mode=edit", title: "Menu và liên hệ", permission: "settings" },
  { href: "/admin/settings/supporters?mode=edit", title: "Doanh nghiệp đồng hành", permission: "supporters" },
  { href: "/admin/settings/theme?mode=edit", title: "Giao diện", permission: "settings" },
];

export default async function AdminSettingsPage() {
  const session = await requireAdminPage("/admin/settings");
  const permissions = await getSessionPermissions(session);
  const visibleSections =
    session.role === "admin"
      ? sections
      : sections.filter((section) => permissions.includes(section.permission as (typeof permissions)[number]));

  return (
    <AdminShell title="Cấu hình website" description="Chọn nhóm nội dung cần cập nhật.">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="space-y-3">
          {visibleSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-slate-950/35 px-4 py-3 transition hover:border-cyan-300/30 hover:bg-white/5"
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
