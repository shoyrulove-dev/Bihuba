import Link from "next/link";
import { MemberShape } from "@/types/cms";

export function MemberCard({ member }: { member: MemberShape }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
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
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">
              {member.groupType}
            </p>
            <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-950">{member.name}</h3>
            {member.companyTagline ? (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                {member.companyTagline}
              </p>
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
