import { notFound } from "next/navigation";
import { getPartnerBySlug } from "@/lib/content";

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

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        {partner.partnerType}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
        {partner.name}
      </h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">{partner.description}</p>
      <a
        href={partner.website}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
      >
        Mở website đối tác
      </a>
    </div>
  );
}
