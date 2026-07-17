import Link from "next/link";
import { DownloadCategoryShape, DownloadShape } from "@/types/cms";
import { slugify } from "@/lib/slug";

function normalizeDownloads(items: DownloadShape[]) {
  return items.map((item) => ({
    ...item,
    categorySlug: item.categorySlug || slugify(item.category || "khac"),
  }));
}

export function DownloadBrowser({
  categories,
  items,
}: {
  categories: DownloadCategoryShape[];
  items: DownloadShape[];
}) {
  const downloads = normalizeDownloads(items);
  const sortedCategories = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Danh mục</h3>
        <div className="mt-4 space-y-2">
          {sortedCategories.map((category) => {
            const count = downloads.filter((item) => item.categorySlug === category.slug).length;
            return (
              <a
                key={category.slug}
                href={`#download-${category.slug}`}
                className="flex items-center justify-between rounded-[1rem] border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-cyan-300 hover:text-cyan-700"
              >
                <span className="truncate">{category.name}</span>
                <span className="ml-3 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">{count}</span>
              </a>
            );
          })}
        </div>
      </aside>

      <div className="space-y-5">
        {sortedCategories.map((category) => {
          const files = downloads.filter((item) => item.categorySlug === category.slug);
          return (
            <section
              key={category.slug}
              id={`download-${category.slug}`}
              className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
            >
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-2xl font-semibold text-slate-950">{category.name}</h3>
                {category.description ? (
                  <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
                ) : null}
              </div>

              <div className="mt-4 overflow-hidden rounded-[1.1rem] border border-slate-200">
                {files.length ? (
                  files.map((item, index) => (
                    <article
                      key={item.slug}
                      className={`grid gap-3 px-4 py-4 md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-center ${
                        index !== files.length - 1 ? "border-b border-slate-200" : ""
                      }`}
                    >
                      <div className="text-sm font-medium text-slate-500">{item.publishedAt}</div>
                      <div className="min-w-0">
                        <h4 className="truncate text-base font-semibold text-slate-900">{item.title}</h4>
                        {item.summary ? (
                          <p className="truncate text-sm text-slate-500">{item.summary}</p>
                        ) : null}
                      </div>
                      <div className="flex shrink-0 gap-3">
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
                  ))
                ) : (
                  <div className="px-4 py-6 text-sm text-slate-500">Chưa có tài liệu trong mục này.</div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
