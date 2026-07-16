import Link from "next/link";
import { PartnerShape } from "@/types/cms";

export function PartnerCard({ partner }: { partner: PartnerShape }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">
        {partner.partnerType}
      </p>
      <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-slate-950">{partner.name}</h3>
      <div className="mt-5 flex gap-3">
        <Link
          href={`/doi-tac/${partner.slug}`}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
        >
          Chi tiết
        </Link>
        {partner.website ? (
          <a
            href={partner.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
          >
            Website
          </a>
        ) : null}
      </div>
    </article>
  );
}
