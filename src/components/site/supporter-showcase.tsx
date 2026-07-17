import Link from "next/link";
import { SupporterItem } from "@/types/cms";

type GroupedItems = Record<string, SupporterItem[]>;

function groupSupporters(items: SupporterItem[]) {
  return items.reduce<GroupedItems>((groups, item) => {
    const key = item.group?.trim() || "Đối tác đồng hành";
    groups[key] ??= [];
    groups[key].push(item);
    return groups;
  }, {});
}

export function SupporterShowcase({ items }: { items: SupporterItem[] }) {
  if (!items.length) return null;

  const groups = Object.entries(groupSupporters(items));

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(14,79,175,0.08)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">
            Đồng hành cùng BIHUBA
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            Hệ sinh thái đối tác và doanh nghiệp đồng hành
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          Các logo được sắp theo nhóm để website dễ quan sát hơn và thuận tiện mở rộng khi số lượng đơn vị tham gia tăng lên.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {groups.map(([group, groupItems]) => (
          <section key={group}>
            <h3 className="text-center text-xl font-semibold text-[#13706C]">{group}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {groupItems.map((item, index) => {
                const card = (
                  <div className="flex h-full min-h-[126px] flex-col items-center justify-center rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-white">
                    {item.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.logoUrl}
                        alt={item.name}
                        className="h-14 w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-800">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <p className="mt-4 line-clamp-2 text-sm font-semibold text-slate-700">
                      {item.name}
                    </p>
                  </div>
                );

                return item.website ? (
                  <Link
                    key={`${group}-${item.name}-${index}`}
                    href={item.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {card}
                  </Link>
                ) : (
                  <div key={`${group}-${item.name}-${index}`}>{card}</div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
