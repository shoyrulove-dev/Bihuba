import Link from "next/link";
import { DownloadCard } from "@/components/site/download-card";
import { FeatureBannerCarousel } from "@/components/site/feature-banner-carousel";
import { MemberCard } from "@/components/site/member-card";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getDownloads, getMembers, getPosts, getSiteSettings } from "@/lib/content";

const impactItems = [
  {
    title: "Kết nối",
    body: "Liên kết doanh nghiệp, chuyên gia và đối tác trong khu vực Bình Hưng.",
  },
  {
    title: "Đồng hành",
    body: "Hỗ trợ truyền thông, sự kiện, xúc tiến thương mại và nâng cao năng lực vận hành.",
  },
  {
    title: "Phát triển",
    body: "Tạo nền tảng nội dung và hình ảnh chung cho cộng đồng doanh nghiệp địa phương.",
  },
];

const actionLinks = [
  { label: "Tin tức nổi bật", href: "/tin-tuc" },
  { label: "Sự kiện sắp diễn ra", href: "/su-kien" },
  { label: "Kết nối giao thương", href: "/ket-noi-giao-thuong" },
  { label: "Danh bạ hội viên", href: "/hoi-vien" },
];

export default async function Home() {
  const [settings, posts, members, downloads] = await Promise.all([
    getSiteSettings(),
    getPosts(),
    getMembers(),
    getDownloads(),
  ]);

  const featuredPosts = posts.filter((item) => item.isFeatured).slice(0, 3);
  const latestPosts = posts.slice(0, 4);
  const featuredMembers = members.slice(0, 3);
  const featuredDownloads = downloads.slice(0, 3);

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden bg-[#031634] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(86,214,255,0.35),_transparent_30%),radial-gradient(circle_at_85%_15%,_rgba(14,79,175,0.55),_transparent_30%),linear-gradient(135deg,_#021126_0%,_#083c87_42%,_#021126_100%)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-white/8 px-4 py-2 text-sm text-cyan-100">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
              Cộng đồng doanh nghiệp Bình Hưng - Thành phố Hồ Chí Minh
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50/90">{settings.heroSubtitle}</p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={settings.heroCtaHref}
                className="rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                {settings.heroCtaLabel}
              </Link>
              <Link
                href="/hoi-vien"
                className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Xem danh bạ hội viên
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {actionLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.25rem] border border-white/15 bg-white/8 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/14"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/8 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.25)] backdrop-blur">
            <div
              className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(1,17,38,0.08), rgba(2,14,34,0.62)), url('${settings.heroImage || "/bihuba-hero-generated.svg"}')`,
              }}
            >
              <div className="p-6 sm:p-8">
                <div className="rounded-[1.5rem] border border-cyan-300/20 bg-[#031634]/78 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.4)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                    Hình ảnh hoạt động
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-white">{settings.siteName}</h2>
                  <p className="mt-3 text-sm leading-7 text-blue-100/88">{settings.slogan}</p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {settings.memberStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.2rem] bg-white/92 p-4 text-slate-950 shadow-[0_12px_24px_rgba(2,6,23,0.12)]"
                    >
                      <p className="text-2xl font-black text-[#0E4FAF]">{item.value}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Giới thiệu" title={settings.introTitle} body={settings.introBody} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {impactItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.6rem] border border-sky-100 bg-white p-5 shadow-[0_18px_45px_rgba(14,79,175,0.08)]"
              >
                <p className="text-2xl font-black uppercase text-[#0E4FAF]">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <FeatureBannerCarousel items={settings.featureBanners || []} />
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-[1.8rem] bg-[#061a39] p-6 text-white shadow-[0_24px_80px_rgba(2,12,27,0.2)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Nhịp vận hành</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-black uppercase leading-tight">
                Nội dung cập nhật, gọn và dễ điều phối cho website cộng đồng doanh nghiệp
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/88">
                Bài viết, sự kiện, hội viên, tài liệu và chương trình đồng hành đều có thể quản lý trực tiếp từ admin.
                Bố cục mới rút bớt khoảng trắng và ưu tiên các khối nhìn nhanh, dễ tra cứu.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/bai-viet/${post.slug}`}
                  className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4 transition hover:bg-white/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    {post.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">{post.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Tin nổi bật"
          title="Bài viết và hoạt động mới"
          body="Nhóm bài nổi bật luôn được ưu tiên hiển thị rõ để người xem nắm nhanh thông tin mới nhất."
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Hội viên"
              title="Doanh nghiệp tiêu biểu"
              body="Danh bạ hội viên giữ vai trò như hồ sơ thương mại và điểm chạm kết nối giữa các doanh nghiệp."
            />
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              {featuredMembers.map((member) => (
                <MemberCard key={member.slug} member={member} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Tài liệu"
              title="Tài liệu cần theo dõi"
              body="Các tài liệu mới được gợi ý ngay trên trang chủ để thuận tiện truy cập nhanh."
            />
            <div className="mt-6 grid gap-4">
              {featuredDownloads.map((item) => (
                <DownloadCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
