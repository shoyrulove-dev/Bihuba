import Link from "next/link";
import type { Metadata } from "next";
import { DownloadCard } from "@/components/site/download-card";
import { FeatureBannerCarousel } from "@/components/site/feature-banner-carousel";
import { MemberCard } from "@/components/site/member-card";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPublicDownloads as getDownloads, getPublicMembers as getMembers, getPublicPosts as getPosts, getPublicSiteSettings as getSiteSettings } from "@/lib/public-content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const marketplaceSteps = [
  { number: "01", title: "Tìm đúng đối tác", body: "Tra cứu doanh nghiệp, ngành nghề, sản phẩm và năng lực cung ứng trong cộng đồng." },
  { number: "02", title: "Kết nối giao thương", body: "Tiếp cận cơ hội hợp tác, chương trình xúc tiến, sự kiện và nhu cầu mua bán B2B." },
  { number: "03", title: "Giao dịch tin cậy", body: "Từng bước chuẩn hóa quy trình xác thực, hợp đồng và thanh toán số khép kín." },
  { number: "04", title: "Vận hành thông minh", body: "Hướng đến bot tự động, giao tiếp nội bộ và quản trị số trên một nền tảng thống nhất." },
];

const actionLinks = [
  { label: "Khám phá doanh nghiệp", detail: "Danh bạ hội viên", href: "/hoi-vien" },
  { label: "Tìm cơ hội hợp tác", detail: "Kết nối giao thương", href: "/ket-noi-giao-thuong" },
  { label: "Theo dõi hoạt động", detail: "Tin tức & sự kiện", href: "/tin-tuc" },
  { label: "Tải biểu mẫu", detail: "Tài liệu doanh nghiệp", href: "/form-mau" },
];

function isFormDownload(item: { category?: string; categorySlug?: string; documentType?: string }) {
  const values = [item.category, item.categorySlug, item.documentType].map((value) => String(value || "").toLowerCase());
  return values.some((value) => value.includes("form") || value.includes("bieu-mau") || value.includes("biểu mẫu") || value.includes("mẫu"));
}

export default async function Home() {
  const [settings, posts, members, downloads] = await Promise.all([
    getSiteSettings(), getPosts(), getMembers(), getDownloads(),
  ]);
  const featuredPosts = posts.filter((item) => item.isFeatured).slice(0, 3);
  const latestItems = [
    { label: "Tin tức", href: "/tin-tuc", post: posts.find((item) => item.type === "news") },
    { label: "Sự kiện", href: "/su-kien", post: posts.find((item) => item.type === "event") },
    { label: "Giao thương", href: "/ket-noi-giao-thuong", post: posts.find((item) => item.type === "trade") },
    { label: "Form mẫu", href: "/form-mau", download: downloads.find(isFormDownload) },
  ];
  const featuredMembers = members.slice(0, 6);
  const featuredDownloads = downloads.slice(0, 3);

  return (
    <div className="overflow-hidden bg-[#f7f9fc] pb-14">
      <section className="mx-auto max-w-[1600px] px-3 pt-4 sm:px-6 sm:pt-6">
        <FeatureBannerCarousel items={settings.featureBanners || []} />
      </section>

      <section className="relative mt-8 overflow-hidden bg-[#031634] text-white sm:mt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(86,214,255,0.22),transparent_28%),radial-gradient(circle_at_90%_75%,rgba(14,79,175,0.48),transparent_35%),linear-gradient(135deg,#03142d_0%,#072e68_54%,#03142d_100%)]" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-cyan-100">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(86,214,255,0.9)]" />
              Cổng giao thương B2B của cộng đồng Bình Hưng
            </div>
            <h1 className="mt-6 max-w-4xl text-3xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50/86 sm:text-lg">
              {settings.heroSubtitle} BIHUBA xây dựng một điểm chạm số chung để doanh nghiệp dễ tìm thấy nhau, giới thiệu năng lực và hình thành cơ hội hợp tác thực chất.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/hoi-vien" className="rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-black text-slate-950 shadow-[0_12px_28px_rgba(86,214,255,0.2)] transition hover:bg-cyan-200">Khám phá doanh nghiệp</Link>
              <Link href="/dang-ky-hoi-vien" className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">Đăng ký hội viên</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {settings.memberStats.map((item, index) => (
              <div key={item.label} className={`rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur sm:p-6 ${index === 0 ? "col-span-2 bg-white/12" : ""}`}>
                <p className="text-3xl font-black text-cyan-300 sm:text-4xl">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-blue-50/76">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-40">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Giới thiệu BIHUBA</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.02em] text-slate-950 sm:text-4xl">{settings.introTitle}</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{settings.introBody}</p>
            <p className="mt-4 text-base leading-8 text-slate-600">Nền tảng được tổ chức theo hành trình từ khám phá, kết nối đến giao dịch và vận hành, sẵn sàng mở rộng phục vụ gần 9.000 doanh nghiệp trên địa bàn xã Bình Hưng.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {marketplaceSteps.map((item, index) => (
              <article key={item.number} className={`relative overflow-hidden rounded-[1.7rem] border p-6 shadow-[0_18px_45px_rgba(14,79,175,0.07)] ${index === 0 ? "border-[#0E4FAF] bg-[#0E4FAF] text-white" : "border-sky-100 bg-white text-slate-950"}`}>
                <span className={`text-xs font-black tracking-[0.2em] ${index === 0 ? "text-cyan-300" : "text-cyan-700"}`}>{item.number}</span>
                <h3 className="mt-8 text-xl font-black">{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${index === 0 ? "text-blue-50/82" : "text-slate-600"}`}>{item.body}</p>
                {index > 1 ? <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Định hướng phát triển</span> : null}
              </article>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actionLinks.map((item) => (
            <Link key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-300 hover:shadow-[0_16px_35px_rgba(14,79,175,0.09)]">
              <span><span className="block text-sm font-black text-slate-950">{item.label}</span><span className="mt-1 block text-xs text-slate-500">{item.detail}</span></span>
              <span className="text-xl text-[#0E4FAF] transition group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Marketplace BIHUBA" title="Doanh nghiệp tiêu biểu" body="Khám phá năng lực, sản phẩm và dịch vụ của các doanh nghiệp trong cộng đồng BIHUBA." />
            <Link href="/hoi-vien" className="inline-flex shrink-0 items-center gap-2 text-sm font-black text-[#0E4FAF] hover:text-cyan-700">Xem toàn bộ danh bạ <span aria-hidden>→</span></Link>
          </div>
          <div className="-mx-6 mt-8 flex snap-x gap-5 overflow-x-auto px-6 pb-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
            {featuredMembers.map((member) => <MemberCard key={member.slug} member={member} variant="showcase" />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="rounded-[2rem] bg-[#061a39] p-6 text-white shadow-[0_24px_80px_rgba(2,12,27,0.18)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Điểm chạm mỗi ngày</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Thông tin mới cho cộng đồng doanh nghiệp</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100/80">Tin hoạt động, lịch kết nối, cơ hội giao thương và biểu mẫu được gom về một nơi để doanh nghiệp truy cập nhanh, không bỏ lỡ thông tin quan trọng.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {latestItems.map((item) => (
                <Link key={item.label} href={"post" in item && item.post ? `/bai-viet/${item.post.slug}` : "download" in item && item.download ? `/download/${item.download.slug}` : item.href} className="group rounded-[1.3rem] border border-white/10 bg-white/6 p-4 transition hover:border-cyan-300/35 hover:bg-white/10">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">{item.label}</p>
                  <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-white">{("post" in item && item.post?.title) || ("download" in item && item.download?.title) || `Xem ${item.label.toLowerCase()}`}</p>
                  <span className="mt-3 inline-block text-sm text-cyan-200 transition group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featuredPosts.length ? (
        <section className="mx-auto max-w-7xl px-6 pb-14 sm:pb-20">
          <SectionHeading eyebrow="Tin nổi bật" title="Hoạt động và cơ hội mới" body="Cập nhật các chương trình kết nối, thông tin thị trường và hoạt động nổi bật của cộng đồng." />
          <div className="mt-7 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">{featuredPosts.map((post) => <PostCard key={post.slug} post={post} />)}</div>
        </section>
      ) : null}

      {featuredDownloads.length ? (
        <section className="mx-auto max-w-7xl px-6 pb-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Trung tâm tài liệu" title="Tài liệu cần theo dõi" body="Biểu mẫu, thông báo và tài liệu điều hành mới dành cho doanh nghiệp hội viên." />
            <Link href="/download" className="shrink-0 text-sm font-black text-[#0E4FAF] hover:text-cyan-700">Xem tất cả tài liệu →</Link>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">{featuredDownloads.map((item) => <DownloadCard key={item.slug} item={item} />)}</div>
        </section>
      ) : null}
    </div>
  );
}
