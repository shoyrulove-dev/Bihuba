import Image from "next/image";
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

const impactItems = [
  {
    value: "Kết nối",
    label: "Liên kết doanh nghiệp, chuyên gia và đối tác trong khu vực Bình Hưng.",
  },
  {
    value: "Đồng hành",
    label: "Hỗ trợ truyền thông, sự kiện, xúc tiến thương mại và năng lực vận hành.",
  },
  {
    value: "Phát triển",
    label: "Tạo nền tảng nội dung và hình ảnh chung cho cộng đồng doanh nghiệp địa phương.",
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
  const heroPost = featuredPosts[0];

  return (
    <div className="pb-10">
      <section className="relative overflow-hidden bg-[#031634] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(86,214,255,0.35),_transparent_32%),radial-gradient(circle_at_85%_15%,_rgba(14,79,175,0.55),_transparent_30%),linear-gradient(135deg,_#021126_0%,_#083c87_42%,_#021126_100%)]" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-18 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-white/8 px-4 py-2 text-sm text-cyan-100">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
              Cộng đồng doanh nghiệp Bình Hưng - Thành phố Hồ Chí Minh
            </div>

            <div className="mt-8 flex items-center gap-5">
              <div className="flex h-30 w-30 items-center justify-center rounded-[2rem] border border-white/20 bg-white/8 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <Image
                  src={settings.logoUrl || "/bihuba-mark.svg"}
                  alt="BIHUBA"
                  width={160}
                  height={160}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.38em] text-cyan-200">
                  {settings.shortName}
                </p>
                <p className="mt-2 max-w-md text-sm text-blue-100/90">{settings.slogan}</p>
              </div>
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">
              {settings.heroTitle ||
                "Hội Doanh nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50/90">
              {settings.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
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

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {actionLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.4rem] border border-white/15 bg-white/8 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/14"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/8 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.25)] backdrop-blur">
            <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#071d3d]">
              <div
                className="relative min-h-[420px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(1,17,38,0.18), rgba(2,14,34,0.78)), url('https://huba.vn/wp-content/uploads/2026/07/soket-3.webp')",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-cyan-300/10 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <div className="rounded-[1.5rem] border border-cyan-300/25 bg-[#031634]/82 p-5 shadow-[0_18px_50px_rgba(2,6,23,0.4)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                      Hình ảnh hoạt động demo
                    </p>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
                      {heroPost?.title ?? "Sự kiện kết nối doanh nghiệp BIHUBA"}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-blue-100/85">
                      {heroPost?.excerpt ??
                        "Không gian trang chủ được dựng theo hướng hiệp hội doanh nghiệp, có banner sự kiện, logo trung tâm và các khối nội dung nổi bật."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {["Đoàn kết", "Đổi mới", "Hội nhập", "Phát triển"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-cyan-300/18 px-3 py-1 text-xs font-semibold text-cyan-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 border-t border-white/10 bg-[#07224a] p-4 md:grid-cols-2">
                {settings.memberStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.2rem] bg-white/92 p-4 text-slate-950"
                  >
                    <p className="text-2xl font-black text-[#0E4FAF]">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Giới thiệu"
              title={settings.introTitle}
              body={settings.introBody}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {impactItems.map((item) => (
              <article
                key={item.value}
                className="rounded-[1.8rem] border border-sky-100 bg-white p-6 shadow-[0_18px_45px_rgba(14,79,175,0.08)]"
              >
                <p className="text-2xl font-black uppercase text-[#0E4FAF]">{item.value}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeading
          eyebrow="Nổi bật"
          title="Tin tức và hoạt động demo từ cấu trúc HUBA"
          body="Trang chủ đã được nạp sẵn bài demo để có độ dày nội dung. Sau này BIHUBA có thể thay bằng bài viết, hình ảnh và lịch hoạt động chính thức ngay trong admin."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-[#061a39] p-7 text-white shadow-[0_24px_80px_rgba(2,12,27,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
              Nhịp vận hành
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
              Giao diện phù hợp cho tổ chức hội, câu lạc bộ và cộng đồng doanh nghiệp địa phương
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/88">
              Mục tiêu của bản này là để BIHUBA có thể lên sóng với hình ảnh rõ ràng, có
              đủ block tin tức, sự kiện, hội viên và tài liệu. Toàn bộ nội dung hiện tại vẫn
              được quản lý từ admin panel nên rất dễ thay đổi sau bàn giao.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/bai-viet/${post.slug}`}
                  className="rounded-[1.3rem] border border-white/10 bg-white/6 p-4 transition hover:bg-white/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    {post.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0E4FAF]">
              Khu vực ưu tiên
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Thông tin điều hành và lịch tuần cho Ban chấp hành",
                "Tin bài và hình ảnh hoạt động hội doanh nghiệp",
                "Danh bạ hội viên, đối tác và doanh nghiệp đồng hành",
                "Thông báo, biểu mẫu và tài liệu cần tải xuống",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] bg-sky-50 px-4 py-4 text-sm font-medium leading-7 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeading
          eyebrow="Hội viên"
          title="Danh sách hội viên tiêu biểu"
          body="Module hội viên được tách riêng để BIHUBA có thể cập nhật hồ sơ, ngành nghề, địa chỉ và thông tin liên hệ cho từng doanh nghiệp."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {featuredMembers.map((member) => (
            <MemberCard key={member.slug} member={member} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeading
          eyebrow="Tài liệu"
          title="Download, thông báo và biểu mẫu"
          body="Khu vực tài liệu được giữ đơn giản để văn phòng hội có thể đăng thông báo, file PDF, báo cáo và biểu mẫu hội viên bất kỳ lúc nào."
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
