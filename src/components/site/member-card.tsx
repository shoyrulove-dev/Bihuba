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
  variant?: "card" | "list" | "banner" | "showcase";
}) {
  const bannerImage = member.coverImage || member.introImage || getMemberFallbackBanner(member);

  if (variant === "showcase") {
    return (
      <article className="group flex h-full min-w-[300px] snap-start flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_28px_70px_rgba(14,79,175,0.14)] sm:min-w-[360px] lg:min-w-0">
        <Link
          href={`/hoi-vien/${member.slug}`}
          className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#edf7ff,#f8fafc)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bannerImage}
            alt={`Banner ${member.name}`}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/45 to-transparent" />
          <span className="absolute bottom-3 left-4 rounded-full border border-white/40 bg-slate-950/72 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
            {member.memberType === "business" ? "Doanh nghiệp hội viên" : member.groupType}
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white text-xs font-black text-[var(--theme-primary)] shadow-sm">
              {member.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.logo} alt="" className="h-full w-full object-contain p-1" loading="lazy" />
              ) : (
                member.name.slice(0, 2).toUpperCase()
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-700">
                {member.industry || "Cộng đồng BIHUBA"}
              </p>
              <h3 className="mt-1 line-clamp-2 text-lg font-black leading-6 text-slate-950">{member.name}</h3>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
            {member.companyTagline || member.description}
          </p>

          <Link
            href={`/hoi-vien/${member.slug}`}
            className="mt-5 inline-flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-[var(--theme-primary)] transition group-hover:text-cyan-700"
          >
            Xem hồ sơ doanh nghiệp
            <span aria-hidden className="text-lg">→</span>
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
        <div className="grid gap-3 sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem] bg-slate-100 text-xs font-bold text-[var(--theme-primary)]">
            {member.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.logo}
                alt={member.name}
                className="h-11 w-11 rounded-[0.75rem] object-contain"
                loading="lazy"
                decoding="async"
              />
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
          className="flex aspect-video w-full items-center justify-center overflow-hidden bg-slate-100"
        >
          {bannerImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bannerImage}
              alt={member.name}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
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
              <img
                src={member.logo}
                alt={member.name}
                className="h-12 w-12 rounded-[1rem] object-contain"
                loading="lazy"
                decoding="async"
              />
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
