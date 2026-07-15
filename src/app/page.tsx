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
    value: "Ket noi",
    label: "Lien ket doanh nghiep, chuyen gia va doi tac trong khu vuc Binh Hung.",
  },
  {
    value: "Dong hanh",
    label: "Ho tro truyen thong, su kien, xuc tien thuong mai va nang luc van hanh.",
  },
  {
    value: "Phat trien",
    label: "Tao nen tang noi dung va hinh anh chung cho cong dong doanh nghiep dia phuong.",
  },
];

const actionLinks = [
  { label: "Tin tuc noi bat", href: "/tin-tuc" },
  { label: "Su kien sap dien ra", href: "/su-kien" },
  { label: "Ket noi giao thuong", href: "/ket-noi-giao-thuong" },
  { label: "Danh ba hoi vien", href: "/hoi-vien" },
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
              Cong dong doanh nghiep Binh Hung - Thanh pho Ho Chi Minh
            </div>

            <div className="mt-8 flex items-center gap-5">
              <Image
                src="/bihuba-mark.svg"
                alt="Bihuba mark"
                width={112}
                height={112}
                className="h-24 w-24 rounded-full border border-white/25 bg-white/10 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:h-28 md:w-28"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.38em] text-cyan-200">
                  {settings.shortName}
                </p>
                <p className="mt-2 max-w-md text-sm text-blue-100/90">
                  {settings.slogan}
                </p>
              </div>
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">
              Hoi doanh nghiep xa Binh Hung thanh pho Ho Chi Minh
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
                Xem danh ba hoi vien
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
                      Hinh anh hoat dong demo
                    </p>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
                      {heroPost?.title ?? "Su kien ket noi doanh nghiep BIHUBA"}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-blue-100/85">
                      {heroPost?.excerpt ??
                        "Khong gian trang chu da duoc chuyen sang huong hiep hoi doanh nghiep, co banner su kien, logo trung tam va khoi noi dung noi bat."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="rounded-full bg-cyan-300/18 px-3 py-1 text-xs font-semibold text-cyan-100">
                        Doan ket
                      </span>
                      <span className="rounded-full bg-cyan-300/18 px-3 py-1 text-xs font-semibold text-cyan-100">
                        Doi moi
                      </span>
                      <span className="rounded-full bg-cyan-300/18 px-3 py-1 text-xs font-semibold text-cyan-100">
                        Hoi nhap
                      </span>
                      <span className="rounded-full bg-cyan-300/18 px-3 py-1 text-xs font-semibold text-cyan-100">
                        Phat trien
                      </span>
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
              eyebrow="Gioi thieu"
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
                <p className="text-2xl font-black uppercase text-[#0E4FAF]">
                  {item.value}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeading
          eyebrow="Noi bat"
          title="Tin tuc va hoat dong demo tu cau truc HUBA"
          body="Homepage da duoc nap san bai demo de nhanh co do day noi dung. Sau nay BIHUBA co the thay the bang bai viet, hinh anh va lich hoat dong chinh thuc ngay trong admin."
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
              Nhip van hanh
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
              Giao dien phu hop cho to chuc hoi, cau lac bo va cong dong doanh nghiep dia phuong
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/88">
              Muc tieu cua ban nay la de BIHUBA co the len song voi hinh anh ro rang,
              co du block tin tuc, su kien, hoi vien va tai lieu. Toan bo khoi noi dung
              hien tai van duoc quan ly tu admin panel nen rat de thay doi sau ban giao.
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
              Khu vuc uu tien
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Thong tin dieu hanh va lich tuan cho Ban chap hanh",
                "Tin bai va hinh anh hoat dong hoi doanh nghiep",
                "Danh ba hoi vien, doi tac va doanh nghiep dong hanh",
                "Thong bao, bieu mau va tai lieu can tai xuong",
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
          eyebrow="Hoi vien"
          title="Danh sach hoi vien tieu bieu"
          body="Module hoi vien duoc tach rieng de BIHUBA co the cap nhat ho so, nganh nghe, dia chi va thong tin lien he cho tung doanh nghiep."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {featuredMembers.map((member) => (
            <MemberCard key={member.slug} member={member} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeading
          eyebrow="Tai lieu"
          title="Download, thong bao va bieu mau"
          body="Khu vuc tai lieu duoc giu don gian de van phong hoi co the dang thong bao, file PDF, bao cao va bieu mau hoi vien bat ky luc nao."
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
