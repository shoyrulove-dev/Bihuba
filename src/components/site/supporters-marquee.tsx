import Link from "next/link";
import { SupporterItem } from "@/types/cms";

function SupporterLogoCard({ item }: { item: SupporterItem }) {
  const card = (
    <div className="group flex h-[126px] w-[126px] shrink-0 items-center justify-center rounded-[2rem] border border-cyan-300/16 bg-white/8 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.18)] backdrop-blur transition hover:-translate-y-1 hover:bg-white/12">
      {item.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.logoUrl} alt={item.name} className="h-full w-full object-contain" />
      ) : (
        <span className="text-center text-sm font-bold uppercase text-white">{item.name}</span>
      )}
    </div>
  );

  if (item.website) {
    return (
      <Link href={item.website} target="_blank" rel="noreferrer" className="shrink-0">
        {card}
      </Link>
    );
  }

  return <div className="shrink-0">{card}</div>;
}

export function SupportersMarquee({ items }: { items: SupporterItem[] }) {
  if (!items.length) return null;

  return (
    <section className="border-t border-cyan-300/10 bg-[#021126] py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
            Doanh nghiệp đồng hành
          </p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-4">
            {items.map((item) => (
              <SupporterLogoCard key={`${item.name}-${item.logoUrl || "no-logo"}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
