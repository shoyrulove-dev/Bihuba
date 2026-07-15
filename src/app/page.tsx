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
  const quickAreas = [
    "Ban chấp hành và điều hành",
    "Kết nối doanh nghiệp địa phương",
    "Tin tức và lịch hoạt động",
    "Hội viên, đối tác, tài liệu",
  ];
  const valuePillars = [
    {
      title: "Kết nối",
      body: "Liên kết doanh nghiệp trong khu vực Bình Hưng và mở rộng mạng lưới hợp tác.",
    },
    {
      title: "Điều hành số",
      body: "Một hệ thống quản trị riêng để quản lý banner, bài viết, hội viên và tài liệu.",
    },
    {
      title: "Phát triển cộng đồng",
      body: "Tạo hạ tầng nội dung bền vững để BIHUBA tự vận hành sau khi bàn giao.",
    },
  ];

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
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {quickAreas.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-sm text-cyan-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(8,47,73,0.45)] backdrop-blur">
            <div className="rounded-[2rem] bg-linear-to-br from-cyan-300 via-sky-500 to-blue-800 p-8 text-slate-950">
              <div className="flex items-center gap-5">
                <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-white/60 bg-white/40 text-center shadow-inner">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
                      Hội
                    </p>
                    <p className="mt-1 text-2xl font-black">BIHUBA</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                    Hệ quản trị trung tâm
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-900/80">
                    Khối hiển thị này thay cho logo hoặc banner thật ở giai đoạn scaffold. Khi có asset chính thức, chỉ cần cập nhật lại từ bộ nhận diện BIHUBA.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-semibold">
                <div className="rounded-2xl bg-white/70 p-4">Tin tức</div>
                <div className="rounded-2xl bg-white/70 p-4">Sự kiện</div>
                <div className="rounded-2xl bg-white/70 p-4">Hội viên</div>
                <div className="rounded-2xl bg-white/70 p-4">Đối tác</div>
                <div className="rounded-2xl bg-white/70 p-4">Download</div>
                <div className="rounded-2xl bg-white/70 p-4">Quản trị riêng</div>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-900/10 bg-slate-950/10 p-4 text-sm font-semibold">
                Đoàn kết - Đổi mới - Hội nhập - Phát triển
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
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {valuePillars.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_45px_rgba(15,23,42,0.05)]"
            >
              <h3 className="text-2xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading
          eyebrow="Nổi bật"
          title="Tin tức, sự kiện và hoạt động điều hành"
          body="Trang chủ hiện được cấu hình theo kiểu block, đủ để thay banner, CTA và từng chuyên mục từ hệ thống quản trị riêng."
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
