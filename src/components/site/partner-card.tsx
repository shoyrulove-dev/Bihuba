import Link from "next/link";
import { PartnerShape } from "@/types/cms";

export function PartnerCard({ partner }: { partner: PartnerShape }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <Link href={`/doi-tac/${partner.slug}`} className="flex aspect-video w-full items-center justify-center overflow-hidden bg-slate-100">
        {partner.bannerImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={partner.bannerImage} alt={partner.name} className="h-full w-full object-contain" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(86,214,255,0.24),transparent_34%),linear-gradient(135deg,#061a39,#0f2f61)] px-6 text-center">
            {partner.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={partner.logo} alt={partner.name} className="h-24 w-24 rounded-2xl bg-white object-contain p-3" />
            ) : (
              <span className="text-xl font-bold text-white">{partner.name}</span>
            )}
          </div>
        )}
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
          {partner.partnerType || "Đối tác chiến lược"}
        </p>
        <h3 className="mt-2 line-clamp-2 text-xl font-bold text-slate-950">{partner.name}</h3>
        {partner.description ? (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{partner.description}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-3">
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
      </div>
    </article>
  );
}
