import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberBySlug } from "@/lib/content";

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
    member.logo ||
    "https://huba.vn/wp-content/uploads/2026/07/soket-3.webp";

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-[#031634] text-white">
        <div
          className="min-h-[340px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.28), rgba(2,6,23,0.86)), url('${heroImage}')`,
          }}
        >
          <div className="mx-auto max-w-7xl px-6 py-18">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              {member.groupType}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
              {member.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50/90">
              {member.companyTagline || member.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Hồ sơ doanh nghiệp
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{member.description}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.4rem] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Lĩnh vực
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{member.industry}</p>
            </div>
            <div className="rounded-[1.4rem] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Loại hội viên
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{member.memberType}</p>
            </div>
            <div className="rounded-[1.4rem] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Địa chỉ
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{member.address}</p>
            </div>
            <div className="rounded-[1.4rem] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Điện thoại
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{member.phone}</p>
            </div>
            <div className="rounded-[1.4rem] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Email
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{member.email}</p>
            </div>
            <div className="rounded-[1.4rem] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Website
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{member.website || "Đang cập nhật"}</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <div className="overflow-hidden rounded-[1.6rem] bg-slate-100">
              {member.introImage || member.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.introImage || member.logo}
                  alt={member.name}
                  className="h-[280px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[280px] items-center justify-center px-8 text-center text-3xl font-black text-[var(--theme-primary)]">
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
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
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
                  {product.price ? (
                    <p className="text-sm font-semibold text-slate-900">{product.price}</p>
                  ) : null}
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
