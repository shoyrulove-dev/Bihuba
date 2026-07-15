import Link from "next/link";
import { PartnerShape } from "@/types/cms";

export function PartnerCard({ partner }: { partner: PartnerShape }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">
        {partner.partnerType}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-slate-950">{partner.name}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{partner.description}</p>
      <div className="mt-6 flex gap-3">
        <Link
          href={`/doi-tac/${partner.slug}`}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
        >
          Chi tiết
        </Link>
        {partner.website ? (
          <a
            href={partner.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900"
          >
            Website
          </a>
        ) : null}
      </div>
    </article>
  );
}
