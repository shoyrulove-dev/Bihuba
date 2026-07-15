import Link from "next/link";
import { MemberShape } from "@/types/cms";

export function MemberCard({ member }: { member: MemberShape }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">
            {member.groupType}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{member.name}</h3>
        </div>
        <div className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800">
          {member.memberType}
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{member.description}</p>
      <div className="mt-6 space-y-2 text-sm text-slate-500">
        <p>{member.industry}</p>
        <p>{member.address}</p>
      </div>
      <Link
        href={`/hoi-vien/${member.slug}`}
        className="mt-6 inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
      >
        Xem ho so
      </Link>
    </article>
  );
}
