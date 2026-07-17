import Link from "next/link";
import { DownloadShape } from "@/types/cms";

function buildTree(items: DownloadShape[]) {
  const grouped = new Map<string, Map<string, DownloadShape[]>>();

  items.forEach((item) => {
    const category = item.category?.trim() || "Khác";
    const year = item.publishedAt?.slice(0, 4) || "Chưa rõ";
    if (!grouped.has(category)) {
      grouped.set(category, new Map());
    }
    const years = grouped.get(category)!;
    if (!years.has(year)) {
      years.set(year, []);
    }
    years.get(year)!.push(item);
  });

  return Array.from(grouped.entries()).map(([category, years]) => ({
    category,
    years: Array.from(years.entries())
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, docs]) => ({ year, docs })),
  }));
}

function toAnchorId(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function DownloadBrowser({ items }: { items: DownloadShape[] }) {
  if (!items.length) return null;

  const tree = buildTree(items);

  return (
    <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
      <aside className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
          Cây tài liệu
        </h3>
        <div className="mt-4 space-y-4">
          {tree.map((group) => (
            <div key={group.category} className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
              <a
                href={`#download-${toAnchorId(group.category)}`}
                className="text-sm font-semibold text-slate-900"
              >
                {group.category}
              </a>
              <div className="mt-2 space-y-2 border-l border-slate-200 pl-3">
                {group.years.map((yearGroup) => (
                  <div key={yearGroup.year}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {yearGroup.year}
                    </p>
                    <ul className="mt-1 space-y-1">
                      {yearGroup.docs.slice(0, 4).map((item) => (
                        <li key={item.slug}>
                          <a
                            href={`#file-${item.slug}`}
                            className="line-clamp-1 text-sm text-slate-600 transition hover:text-cyan-700"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="space-y-6">
        {tree.map((group) => (
          <section
            key={group.category}
            id={`download-${toAnchorId(group.category)}`}
            className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-950">{group.category}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {group.years.reduce((total, year) => total + year.docs.length, 0)} tài liệu
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-5">
              {group.years.map((yearGroup) => (
                <section key={yearGroup.year}>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    {yearGroup.year}
                  </h4>
                  <div className="mt-3 overflow-hidden rounded-[1.2rem] border border-slate-200">
                    {yearGroup.docs.map((item, index) => (
                      <article
                        key={item.slug}
                        id={`file-${item.slug}`}
                        className={`grid gap-3 px-4 py-4 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:items-center ${
                          index !== yearGroup.docs.length - 1 ? "border-b border-slate-200" : ""
                        }`}
                      >
                        <div className="text-sm font-semibold text-slate-500">{item.publishedAt}</div>
                        <div className="min-w-0">
                          <h5 className="text-base font-semibold text-slate-900">{item.title}</h5>
                          {item.summary ? (
                            <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                              {item.summary}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href={`/download/${item.slug}`}
                            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
                          >
                            Xem
                          </Link>
                          {item.fileUrl ? (
                            <Link
                              href={item.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                              Tải
                            </Link>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
