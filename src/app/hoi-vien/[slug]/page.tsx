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

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-[#031634] text-white">
        <div
          className="min-h-[320px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.25), rgba(2,6,23,0.82)), url('${member.coverImage || member.introImage || member.logo || "https://huba.vn/wp-content/uploads/2026/07/soket-3.webp"}')`,
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
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <h2 className="text-2xl font-semibold text-slate-950">Giới thiệu doanh nghiệp</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{member.description}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <p><strong>Lĩnh vực:</strong> {member.industry}</p>
            <p><strong>Địa chỉ:</strong> {member.address}</p>
            <p><strong>Điện thoại:</strong> {member.phone}</p>
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Website:</strong> {member.website}</p>
            <p><strong>Loại hội viên:</strong> {member.memberType}</p>
          </div>
        </section>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
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
