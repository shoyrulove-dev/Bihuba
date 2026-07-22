import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberBySlug } from "@/lib/content";

function getMemberFallbackBanner(member: Awaited<ReturnType<typeof getMemberBySlug>>) {
  if (!member) return "/member-banners/manufacturing-trade.png";
  const text = `${member.name} ${member.industry} ${member.groupType}`.toLowerCase();
  if (text.includes("tài") || text.includes("bank") || text.includes("finance")) return "/member-banners/finance-partner.png";
  if (text.includes("nha") || text.includes("dental") || text.includes("presmile")) {
    return "/member-banners/presmile-dental-center.png";
  }
  return "/member-banners/manufacturing-trade.png";
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const heroImage =
    member.coverImage ||
    member.introImage ||
    getMemberFallbackBanner(member);

  return (
    <div className="pb-16">
      <section className="bg-[#031634] px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_70px_rgba(2,6,23,0.28)]">
          <div className="flex aspect-[16/9] items-center justify-center overflow-hidden bg-slate-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={member.name} className="h-full w-full object-contain" />
          </div>
          <div className="grid gap-6 border-t border-white/10 bg-slate-950/70 p-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.4rem] bg-white p-2">
              {member.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.logo} alt={member.name} className="h-full w-full object-contain" />
              ) : (
                <span className="text-xl font-black text-[var(--theme-primary)]">
                  {member.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                {member.groupType || member.industry || "Hội viên BIHUBA"}
              </p>
              <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                {member.name}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-blue-50/90">
                {member.companyTagline || member.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {member.website ? (
                <Link
                  href={member.website}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Truy cập website
                </Link>
              ) : null}
              {member.phone ? (
                <a
                  href={`tel:${member.phone}`}
                  className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white"
                >
                  Gọi ngay
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--theme-primary)]">
            Giới thiệu
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Hồ sơ doanh nghiệp</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{member.description}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              ["Lĩnh vực", member.industry],
              ["Loại hội viên", member.memberType],
              ["Địa chỉ", member.address],
              ["Điện thoại", member.phone],
              ["Email", member.email],
              ["Website", member.website || "Đang cập nhật"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.4rem] bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
                <p className="mt-2 break-words text-sm font-medium text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-[1.6rem] bg-slate-100 p-4">
              {member.introImage || member.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.introImage || member.logo}
                  alt={member.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="px-8 text-center text-3xl font-black text-[var(--theme-primary)]">
                  {member.name}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--theme-primary)]">
              Liên hệ nhanh
            </p>
            <div className="mt-4 space-y-3">
              {member.phone ? (
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center justify-center rounded-full bg-[var(--theme-primary)] px-4 py-3 text-sm font-semibold text-white"
                >
                  Gọi tư vấn
                </a>
              ) : null}
              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900"
                >
                  Gửi email
                </a>
              ) : null}
              {member.website ? (
                <Link
                  href={member.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900"
                >
                  Xem website
                </Link>
              ) : null}
            </div>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--theme-primary)]">
              Sản phẩm / dịch vụ
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              Giải pháp nổi bật của doanh nghiệp
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(member.products || []).map((product, index) => (
              <article
                key={`${product.title}-${index}`}
                className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-50"
              >
                <div className="flex h-44 items-center justify-center bg-slate-100">
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.imageUrl} alt={product.title} className="h-full w-full object-contain" />
                  ) : (
                    <div className="px-6 text-center text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {product.type === "product" ? "Sản phẩm" : "Dịch vụ"}
                    </div>
                  )}
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-primary)]">
                    {product.type === "product" ? "Sản phẩm" : "Dịch vụ"}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-950">{product.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{product.summary}</p>
                  {product.price ? <p className="text-sm font-semibold text-slate-900">{product.price}</p> : null}
                  {product.link ? (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]"
                    >
                      Xem chi tiết
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
