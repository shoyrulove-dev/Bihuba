import Link from "next/link";
import { MemberShape } from "@/types/cms";

function MemberLogoBadge({ member }: { member: MemberShape }) {
  return (
    <Link
      href={`/hoi-vien/${member.slug}`}
      className="flex min-w-[220px] items-center gap-4 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-[var(--theme-primary)]">
        {member.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.logo} alt={member.name} className="h-10 w-10 rounded-full object-contain" />
        ) : (
          member.name.slice(0, 2).toUpperCase()
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{member.name}</p>
        <p className="truncate text-xs uppercase tracking-[0.18em] text-slate-500">
          {member.groupType}
        </p>
      </div>
    </Link>
  );
}

export function MemberLogoMarquee({ members }: { members: MemberShape[] }) {
  if (!members.length) return null;

  const loop = [...members, ...members];

  return (
    <section className="py-10">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--theme-accent)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--theme-primary)]">
          Danh bạ hội viên
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max gap-4">
          {loop.map((member, index) => (
            <MemberLogoBadge key={`${member.slug}-${index}`} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
