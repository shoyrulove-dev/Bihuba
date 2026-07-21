import Link from "next/link";
import { MemberShape } from "@/types/cms";

function getMemberFallbackBanner(member: MemberShape) {
  const text = `${member.name} ${member.industry} ${member.groupType}`.toLowerCase();
  if (text.includes("tài") || text.includes("bank") || text.includes("finance")) return "/member-banners/finance-partner.png";
  if (text.includes("nha") || text.includes("dental") || text.includes("presmile")) {
    return "/member-banners/presmile-dental-center.png";
  }
  return "/member-banners/manufacturing-trade.png";
}

export function MemberCard({
  member,
  variant = "card",
}: {
  member: MemberShape;
  variant?: "card" | "list" | "banner";
}) {
  const bannerImage = member.coverImage || member.introImage || getMemberFallbackBanner(member);

  if (variant === "list") {
    return (
      <article className="rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
        <div className="grid gap-3 sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem] bg-slate-100 text-xs font-bold text-[var(--theme-primary)]">
            {member.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.logo} alt={member.name} className="h-11 w-11 rounded-[0.75rem] object-contain" />
            ) : (
              member.name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-base font-semibold text-slate-950">{member.name}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">
              {member.memberType}
            </p>
          </div>
          <Link
            href={`/hoi-vien/${member.slug}`}
            className="inline-flex h-10 items-center justify-center rounded-full border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
          >
            Xem hồ sơ
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "banner") {
    return (
      <article className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <Link
          href={`/hoi-vien/${member.slug}`}
          className="flex aspect-[16/7] w-full items-center justify-center bg-slate-100 p-2"
        >
          {bannerImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={bannerImage} alt={member.name} className="max-h-full max-w-full object-contain" loading="lazy" />
          ) : (
            <div className="px-8 text-center text-3xl font-black text-[var(--theme-primary)]">{member.name}</div>
          )}
        </Link>
        <div className="border-t border-slate-100 p-4">
          <Link
            href={`/hoi-vien/${member.slug}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 hover:text-slate-950"
          >
            Xem hồ sơ
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] bg-slate-100 text-xs font-bold text-[var(--theme-primary)]">
            {member.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.logo} alt={member.name} className="h-12 w-12 rounded-[1rem] object-cover" />
            ) : (
              member.name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
              {member.groupType}
            </p>
            <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-950">{member.name}</h3>
            {member.companyTagline ? (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{member.companyTagline}</p>
            ) : null}
          </div>
        </div>
        <div className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800">
          {member.memberType}
        </div>
      </div>
      <div className="mt-5 space-y-1 text-sm text-slate-500">
        <p>{member.industry}</p>
        <p className="line-clamp-1">{member.address}</p>
      </div>
      <Link
        href={`/hoi-vien/${member.slug}`}
        className="mt-5 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
      >
        Xem hồ sơ
      </Link>
    </article>
  );
}
