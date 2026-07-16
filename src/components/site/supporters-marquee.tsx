import Link from "next/link";
import { SupporterItem } from "@/types/cms";

function SupporterBadge({ item }: { item: SupporterItem }) {
  const badge = (
    <div className="flex min-w-[220px] items-center gap-4 rounded-full border border-cyan-300/18 bg-white/8 px-5 py-3 text-white backdrop-blur">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#0E4FAF]">
        {item.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.logoUrl} alt={item.name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          item.name.slice(0, 2).toUpperCase()
        )}
      </div>
      <span className="truncate text-sm font-semibold">{item.name}</span>
    </div>
  );

  if (item.website) {
    return (
      <Link href={item.website} target="_blank" rel="noreferrer" className="shrink-0">
        {badge}
      </Link>
    );
  }

  return <div className="shrink-0">{badge}</div>;
}

export function SupportersMarquee({ items }: { items: SupporterItem[] }) {
  if (!items.length) return null;

  const loop = [...items, ...items];

  return (
    <section className="border-t border-cyan-300/10 bg-[#021126] py-6">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
            Doanh nghiệp đồng hành
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-4">
            {loop.map((item, index) => (
              <SupporterBadge key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
