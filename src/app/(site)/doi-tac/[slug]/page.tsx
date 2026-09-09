import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublicPartnerBySlug as getPartnerBySlug } from "@/lib/public-content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const partner = await getPartnerBySlug((await params).slug);
  if (!partner) return {};
  return { title: partner.name, description: partner.description, alternates: { canonical: `/doi-tac/${partner.slug}` }, openGraph: { title: partner.name, description: partner.description, images: partner.logo ? [partner.logo] : [] } };
}

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  const activityImages = partner.activityImages || [];

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-[#061a39] text-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="overflow-hidden rounded-[1.6rem] border border-white/12 bg-slate-950">
            {partner.bannerImage ? (
              <Image
                src={partner.bannerImage}
                alt={partner.name}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 1152px) calc(100vw - 48px), 1152px"
                className="aspect-[16/9] w-full bg-slate-950 object-contain"
              />
            ) : (
              <div className="flex aspect-[16/9] w-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(86,214,255,0.24),transparent_34%),linear-gradient(135deg,#061a39,#0f2f61)] px-8 text-center">
                {partner.logo ? (
                  <Image src={partner.logo} alt={partner.name} width={128} height={128} className="h-32 w-32 rounded-3xl bg-white object-contain p-4" />
                ) : (
                  <span className="text-3xl font-bold">{partner.name}</span>
                )}
              </div>
            )}
            <div className="border-t border-white/10 bg-slate-950/82 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                {partner.partnerType || "Đối tác chiến lược"}
              </p>
              <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">{partner.name}</h1>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={80}
                height={80}
                className="h-20 w-20 rounded-2xl border border-slate-200 object-contain p-2"
              />
            ) : null}
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Thông tin đối tác
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">{partner.name}</h2>
            {partner.website ? (
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
              >
                Mở website đối tác
              </a>
            ) : null}
          </aside>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Dòng tin hợp tác</p>
            <div className="mt-3 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <p className="text-lg leading-8 text-slate-700">
                {partner.description ||
                  "Thông tin hợp tác, chương trình làm việc và hoạt động kết nối giữa BIHUBA và đối tác sẽ được cập nhật tại đây."}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Hình ảnh và poster hoạt động
              </p>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                {activityImages.length ? (
                  activityImages.map((item, index) => (
                    <article
                      key={`${item.imageUrl}-${index}`}
                      className="overflow-hidden rounded-[1.3rem] border border-slate-200 bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)]"
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title || partner.name}
                          width={800}
                          height={450}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="aspect-[16/9] w-full bg-slate-100 object-contain"
                        />
                      ) : null}
                      <div className="p-5">
                        <h3 className="line-clamp-2 text-lg font-semibold text-slate-950">
                          {item.title || "Hoạt động hợp tác"}
                        </h3>
                        {item.subtitle ? (
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.subtitle}</p>
                        ) : null}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[1.3rem] border border-dashed border-slate-300 bg-white p-6 text-sm leading-7 text-slate-500 md:col-span-2">
                    Hình ảnh hoạt động đang được cập nhật.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
