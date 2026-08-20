import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { getDownloads, getMembers, getPartners, getPosts, getSiteSettings } from "@/lib/content";

function TrendIcon() { return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m4 16 5-5 4 4 7-8" /><path d="M15 7h5v5" /></svg>; }
function PeopleIcon() { return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3 20a6 6 0 0 1 12 0M15 20a4 4 0 0 1 6 0" /></svg>; }
function FileIcon() { return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 3h7l4 4v14H7zM14 3v5h5M9 13h6M9 17h5" /></svg>; }
function BuildingIcon() { return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 21V5h10v16M14 10h6v11M7 8h4M7 12h4M7 16h4M16 13h2M16 17h2" /></svg>; }

export default async function AdminDashboardPage() {
  await requireAdminPage("/admin");
  const [settings, posts, members, partners, downloads] = await Promise.all([getSiteSettings(), getPosts(undefined, { includeUnpublished: true }), getMembers(), getPartners(), getDownloads()]);
  const statCards = [
    { label: "Hội viên", value: members.length, href: "/admin/members", icon: PeopleIcon, color: "bg-blue-50 text-[#1769e8]" },
    { label: "Đối tác", value: partners.length, href: "/admin/partners", icon: BuildingIcon, color: "bg-cyan-50 text-cyan-700" },
    { label: "Bài viết", value: posts.length, href: "/admin/posts", icon: TrendIcon, color: "bg-violet-50 text-violet-700" },
    { label: "Tài liệu", value: downloads.length, href: "/admin/downloads", icon: FileIcon, color: "bg-emerald-50 text-emerald-700" },
  ];
  const recentPosts = posts.slice(0, 5);
  const totalDirectoryItems = members.length + partners.length;

  return <AdminShell title="Tổng quan điều hành" description="Theo dõi nhanh dữ liệu nội dung, hội viên, đối tác và tài liệu đang vận hành trên cổng giao thương BIHUBA.">
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((item) => { const StatIcon = item.icon; return <Link key={item.label} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{item.label}</p><p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{item.value}</p><p className="mt-2 text-xs text-emerald-600">Dữ liệu đang hiển thị</p></div><span className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}><StatIcon /></span></div></Link>; })}
    </section>

    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-slate-900">Nội dung mới cập nhật</p><p className="mt-1 text-xs text-slate-500">Bài viết lấy từ dữ liệu hiện có trên website</p></div><Link href="/admin/posts" className="text-xs font-semibold text-[#1769e8] hover:underline">Quản lý bài viết →</Link></div><div className="mt-5 divide-y divide-slate-100">{recentPosts.length ? recentPosts.map((post) => <Link key={post._id} href={`/admin/posts?mode=edit&edit=${post._id}`} className="flex items-center gap-3 py-3 transition hover:bg-slate-50"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-[#1769e8]">{String(post.type || "B").slice(0, 1).toUpperCase()}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-slate-800">{post.title}</span><span className="mt-1 block truncate text-xs text-slate-500">{post.displayDate || post.publishedAt || "Chưa có ngày"}</span></span><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${post.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{post.status === "published" ? "Đã xuất bản" : "Bản nháp"}</span></Link>) : <p className="py-8 text-center text-sm text-slate-500">Chưa có bài viết.</p>}</div></article>
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] sm:p-6"><p className="text-sm font-semibold text-slate-900">Sức khỏe dữ liệu</p><p className="mt-1 text-xs text-slate-500">Tổng hợp theo các mô-đun đang dùng</p><div className="mt-6 space-y-5"><div><div className="flex justify-between text-sm"><span className="text-slate-600">Danh bạ doanh nghiệp</span><span className="font-semibold text-slate-900">{totalDirectoryItems}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-full rounded-full bg-[#1769e8]" /></div></div><div><div className="flex justify-between text-sm"><span className="text-slate-600">Nội dung đã tạo</span><span className="font-semibold text-slate-900">{posts.length + downloads.length}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-3/4 rounded-full bg-cyan-500" /></div></div><div><div className="flex justify-between text-sm"><span className="text-slate-600">Thiết lập website</span><span className="font-semibold text-slate-900">Sẵn sàng</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-full rounded-full bg-emerald-500" /></div></div></div><Link href="/admin/settings" className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[#0b2d5c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1769e8]">Mở cấu hình hệ thống</Link></aside>
    </section>

    <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(120deg,#082a55,#0c4d9c)] p-6 text-white shadow-[0_14px_32px_rgba(8,42,85,0.18)]"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Không gian quản trị</p><h2 className="mt-2 text-xl font-semibold">{settings.shortName || "BIHUBA"} B2B Admin Dashboard</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">Dữ liệu hiển thị trên dashboard được lấy trực tiếp từ các mô-đun đã có. Không thêm dữ liệu minh họa hay doanh nghiệp giả.</p></section>
  </AdminShell>;
}
