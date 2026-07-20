import Link from "next/link";
import { DownloadCard } from "@/components/site/download-card";
import { FeatureBannerCarousel } from "@/components/site/feature-banner-carousel";
import { MemberCard } from "@/components/site/member-card";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getDownloads, getMembers, getPosts, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

const impactItems = [
  {
    title: "K\u1ebft n\u1ed1i",
    body: "Li\u00ean k\u1ebft doanh nghi\u1ec7p, chuy\u00ean gia v\u00e0 \u0111\u1ed1i t\u00e1c trong khu v\u1ef1c B\u00ecnh H\u01b0ng.",
  },
  {
    title: "\u0110\u1ed3ng h\u00e0nh",
    body: "H\u1ed7 tr\u1ee3 truy\u1ec1n th\u00f4ng, s\u1ef1 ki\u1ec7n, x\u00fac ti\u1ebfn th\u01b0\u01a1ng m\u1ea1i v\u00e0 n\u00e2ng cao n\u0103ng l\u1ef1c v\u1eadn h\u00e0nh.",
  },
  {
    title: "Ph\u00e1t tri\u1ec3n",
    body: "T\u1ea1o n\u1ec1n t\u1ea3ng n\u1ed9i dung v\u00e0 h\u00ecnh \u1ea3nh chung cho c\u1ed9ng \u0111\u1ed3ng doanh nghi\u1ec7p \u0111\u1ecba ph\u01b0\u01a1ng.",
  },
];

const actionLinks = [
  { label: "Tin t\u1ee9c n\u1ed5i b\u1eadt", href: "/tin-tuc" },
  { label: "S\u1ef1 ki\u1ec7n s\u1eafp di\u1ec5n ra", href: "/su-kien" },
  { label: "K\u1ebft n\u1ed1i giao th\u01b0\u01a1ng", href: "/ket-noi-giao-thuong" },
  { label: "Danh b\u1ea1 h\u1ed9i vi\u00ean", href: "/hoi-vien" },
];

export default async function Home() {
  const [settings, posts, members, downloads] = await Promise.all([
    getSiteSettings(),
    getPosts(),
    getMembers(),
    getDownloads(),
  ]);

  const featuredPosts = posts.filter((item) => item.isFeatured).slice(0, 3);
  const latestPosts = [
    { label: "Tin tức", href: "/tin-tuc", post: posts.find((item) => item.type === "news") },
    { label: "Sự kiện", href: "/su-kien", post: posts.find((item) => item.type === "event") },
    { label: "Lịch làm việc", href: "/lich-tuan", post: posts.find((item) => item.type === "schedule") },
    { label: "Form mẫu", href: "/form-mau", post: posts.find((item) => item.type === "form") },
  ];
  const featuredMembers = members.slice(0, 6);
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
              {"C\u1ed9ng \u0111\u1ed3ng doanh nghi\u1ec7p B\u00ecnh H\u01b0ng - Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh"}
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
                {"Xem danh b\u1ea1 h\u1ed9i vi\u00ean"}
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
                    {"H\u00ecnh \u1ea3nh ho\u1ea1t \u0111\u1ed9ng"}
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
            <SectionHeading eyebrow={"Gi\u1edbi thi\u1ec7u"} title={settings.introTitle} body={settings.introBody} />
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{"Hoạt động mới"}</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-black uppercase leading-tight">
                {"Tin tức, sự kiện và kết nối doanh nghiệp mới nhất"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/88">
                {"Cập nhật nhanh các hoạt động nổi bật, lịch kết nối, cơ hội giao thương và thông tin dành cho cộng đồng doanh nghiệp Bình Hưng."}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {latestPosts.map((item) => (
                <Link
                  key={item.label}
                  href={item.post ? `/bai-viet/${item.post.slug}` : item.href}
                  className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4 transition hover:bg-white/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">
                    {item.post?.title || `Xem ${item.label.toLowerCase()}`}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={"Tin n\u1ed5i b\u1eadt"}
          title={"B\u00e0i vi\u1ebft v\u00e0 ho\u1ea1t \u0111\u1ed9ng m\u1edbi"}
          body={"Nh\u00f3m b\u00e0i n\u1ed5i b\u1eadt lu\u00f4n \u0111\u01b0\u1ee3c \u01b0u ti\u00ean hi\u1ec3n th\u1ecb r\u00f5 \u0111\u1ec3 ng\u01b0\u1eddi xem n\u1eafm nhanh th\u00f4ng tin m\u1edbi nh\u1ea5t."}
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
              eyebrow={"H\u1ed9i vi\u00ean"}
              title={"Doanh nghi\u1ec7p ti\u00eau bi\u1ec3u"}
            />
            <div className="mt-6 grid gap-4">
              {featuredMembers.map((member) => (
                <MemberCard key={member.slug} member={member} variant="list" />
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow={"T\u00e0i li\u1ec7u"}
              title={"T\u00e0i li\u1ec7u c\u1ea7n theo d\u00f5i"}
              body={"C\u00e1c t\u00e0i li\u1ec7u m\u1edbi \u0111\u01b0\u1ee3c g\u1ee3i \u00fd ngay tr\u00ean trang ch\u1ee7 \u0111\u1ec3 thu\u1eadn ti\u1ec7n truy c\u1eadp nhanh."}
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
