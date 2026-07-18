import Link from "next/link";
import { getDownloadFormat, getDownloadTypeLabel } from "@/lib/downloads";
import { slugify } from "@/lib/slug";
import { DownloadCategoryShape, DownloadShape } from "@/types/cms";

function normalizeDownloads(items: DownloadShape[]) {
  return items.map((item) => ({
    ...item,
    categorySlug: item.categorySlug || slugify(item.category || "khac"),
  }));
}

function buildPreviewLines(item: DownloadShape) {
  const title = item.title || item.documentType || "Tài liệu";
  const summary = item.summary || "Tài liệu nội bộ";

  return [title.slice(0, 20).trim(), summary.slice(0, 24).trim(), item.publishedAt || "Cập nhật"];
}

function Thumbnail({ item, format }: { item: DownloadShape; format: string }) {
  const lines = buildPreviewLines(item);

  return (
    <Link
      href={`/download/${item.slug}`}
      className="group relative block h-[82px] w-[62px] shrink-0 overflow-hidden rounded-[1rem] bg-[linear-gradient(135deg,_#0b2c5c,_#1d4ed8)] p-[3px] shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[0.85rem] bg-white">
        <div className="h-[7px] w-full bg-[linear-gradient(90deg,_#22d3ee,_#2563eb)]" />
        <div className="flex-1 px-[6px] py-[5px]">
          <div className="inline-flex rounded-full bg-slate-100 px-[5px] py-[1px] text-[7px] font-black uppercase tracking-[0.22em] text-slate-600">
            {format}
          </div>
          <div className="mt-[5px] space-y-[3px] text-[6px] leading-[1.25] text-slate-700">
            {lines.map((line, index) => (
              <p
                key={`${item.slug}-${index}`}
                className={`truncate ${index === 0 ? "font-bold text-slate-900" : "text-slate-500"}`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-0 w-0 border-l-[11px] border-t-[11px] border-l-transparent border-t-cyan-100/80" />
      </div>
    </Link>
  );
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
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">Danh mục</h3>
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

              <div className="mt-4 space-y-3">
                {files.length ? (
                  files.map((item) => {
                    const format = getDownloadFormat(item);
                    const typeLabel = getDownloadTypeLabel(item);

                    return (
                      <article
                        key={item.slug}
                        className="grid gap-4 rounded-[1.2rem] border border-slate-200 px-4 py-4 md:grid-cols-[62px_minmax(0,1fr)_auto] md:items-center"
                      >
                        <Thumbnail item={item} format={format} />

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                            <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">{typeLabel}</span>
                            <span className="rounded-full bg-slate-100 px-3 py-1">{format}</span>
                            <span className="ml-auto normal-case tracking-normal">{item.publishedAt}</span>
                          </div>
                          <h4 className="mt-2 line-clamp-1 text-lg font-semibold text-slate-900">{item.title}</h4>
                          {item.summary ? (
                            <p className="mt-1 line-clamp-1 text-sm text-slate-500">{item.summary}</p>
                          ) : null}
                        </div>

                        <div className="flex shrink-0 flex-wrap gap-3 md:justify-end">
                          <Link
                            href={`/download/${item.slug}`}
                            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
                          >
                            Xem chi tiết
                          </Link>
                          {item.fileUrl ? (
                            <Link
                              href={item.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                              Tải file
                            </Link>
                          ) : null}
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="rounded-[1.1rem] border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                    Chưa có tài liệu trong mục này.
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
