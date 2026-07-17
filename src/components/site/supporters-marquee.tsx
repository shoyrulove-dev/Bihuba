import Link from "next/link";
import { SupporterItem } from "@/types/cms";

function SupporterBubble({ item }: { item: SupporterItem }) {
  const bubble = (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-cyan-300/18 bg-white/10 p-4 shadow-[0_16px_32px_rgba(2,6,23,0.18)] backdrop-blur transition hover:-translate-y-1 hover:bg-white/14">
      {item.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.logoUrl} alt={item.name} className="h-full w-full rounded-full object-contain" />
      ) : (
        <span className="text-center text-[10px] font-bold uppercase text-white">{item.name}</span>
      )}
    </div>
  );

  if (item.website) {
    return (
      <Link href={item.website} target="_blank" rel="noreferrer" className="shrink-0">
        {bubble}
      </Link>
    );
  }

  return <div className="shrink-0">{bubble}</div>;
}

export function SupportersMarquee({ items }: { items: SupporterItem[] }) {
  if (!items.length) return null;

  const loop = [...items, ...items];

  return (
    <section className="border-t border-cyan-300/10 bg-[#021126] py-7">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
            Doanh nghiệp đồng hành
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-5">
            {loop.map((item, index) => (
              <SupporterBubble key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
