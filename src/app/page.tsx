import Link from "next/link";
import { DownloadCard } from "@/components/site/download-card";
import { MemberCard } from "@/components/site/member-card";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import {
  getDownloads,
  getMembers,
  getPosts,
  getSiteSettings,
} from "@/lib/content";

export default async function Home() {
  const [settings, posts, members, downloads] = await Promise.all([
    getSiteSettings(),
    getPosts(),
    getMembers(),
    getDownloads(),
  ]);

  const featuredPosts = posts.filter((item) => item.isFeatured).slice(0, 3);
  const featuredMembers = members.slice(0, 3);
  const featuredDownloads = downloads.slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.35),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.4),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#082f49_45%,_#0f172a_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
              {settings.shortName}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {settings.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={settings.heroCtaHref}
                className="rounded-full bg-cyan-300 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                {settings.heroCtaLabel}
              </Link>
              <Link
                href="/admin"
                className="rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Vào admin panel
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(8,47,73,0.45)] backdrop-blur">
            <div className="rounded-[2rem] bg-linear-to-br from-cyan-300 via-sky-500 to-blue-800 p-8 text-slate-950">
              <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                Core modules
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-semibold">
                <div className="rounded-2xl bg-white/70 p-4">Tin tức</div>
                <div className="rounded-2xl bg-white/70 p-4">Sự kiện</div>
                <div className="rounded-2xl bg-white/70 p-4">Hội viên</div>
                <div className="rounded-2xl bg-white/70 p-4">Đối tác</div>
                <div className="rounded-2xl bg-white/70 p-4">Download</div>
                <div className="rounded-2xl bg-white/70 p-4">Admin CMS</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {settings.memberStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] bg-white p-5 text-slate-950"
                >
                  <p className="text-3xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Giới thiệu"
          title={settings.introTitle}
          body={settings.introBody}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading
          eyebrow="Nổi bật"
          title="Tin tức, sự kiện và hoạt động điều hành"
          body="Trang chủ hiện được cấu hình theo kiểu block, đủ để thay banner, CTA và từng chuyên mục từ admin."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading
          eyebrow="Hội viên"
          title="Danh sách hội viên tiêu biểu"
          body="Module hội viên được tách riêng để bên BIHUBA quản lý hồ sơ doanh nghiệp, hội viên cá nhân và hội/câu lạc bộ."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {featuredMembers.map((member) => (
            <MemberCard key={member.slug} member={member} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading
          eyebrow="Tài liệu"
          title="Download, báo cáo và thông báo"
          body="Đây là bản dựng sẵn cho chuyên mục tài liệu, có thể dùng để public file hoặc cập nhật tài liệu điều hành."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {featuredDownloads.map((item) => (
            <DownloadCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
