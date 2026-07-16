import { AdminShell } from "@/components/admin/admin-shell";
import {
  getDownloads,
  getMembers,
  getPartners,
  getPosts,
  getSiteSettings,
} from "@/lib/content";

export default async function AdminDashboardPage() {
  const [settings, posts, members, partners, downloads] = await Promise.all([
    getSiteSettings(),
    getPosts(),
    getMembers(),
    getPartners(),
    getDownloads(),
  ]);

  const stats = [
    { label: "Bài viết", value: posts.length },
    { label: "Hội viên", value: members.length },
    { label: "Đối tác", value: partners.length },
    { label: "Tài liệu", value: downloads.length },
  ];

  return (
    <AdminShell
      title="Bảng điều khiển BIHUBA"
      description="Trang điều hành nội dung trung tâm. Từ đây bạn có thể đi tới từng khu vực để cập nhật dữ liệu cho website."
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm text-slate-300">{item.label}</p>
            <p className="mt-3 text-4xl font-semibold">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold">{settings.siteName}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          {settings.introBody}
        </p>
      </section>
    </AdminShell>
  );
}
