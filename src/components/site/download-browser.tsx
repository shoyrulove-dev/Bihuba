import Link from "next/link";
import { DocumentThumbnail } from "@/components/site/document-thumbnail";
import { getDownloadFormat, getDownloadTypeLabel } from "@/lib/downloads";
import { slugify } from "@/lib/slug";
import { DownloadCategoryShape, DownloadShape } from "@/types/cms";

function normalizeDownloads(items: DownloadShape[]) {
  return items.map((item) => ({ ...item, categorySlug: item.categorySlug || slugify(item.category || "khac") }));
}

export function DownloadBrowser({ categories, items }: { categories: DownloadCategoryShape[]; items: DownloadShape[] }) {
  const downloads = normalizeDownloads(items);
  const categoryMap = new Map<string, DownloadCategoryShape>();
  categories.forEach((category) => categoryMap.set(category.slug, category));
  downloads.forEach((item) => {
    const slug = item.categorySlug || slugify(item.category || "khac");
    if (!categoryMap.has(slug)) categoryMap.set(slug, { name: item.category || "Tài liệu khác", slug, description: "Tài liệu được cập nhật cho hội viên tham khảo.", order: 999 });
  });
  const sortedCategories = Array.from(categoryMap.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="h-fit rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)] lg:sticky lg:top-32">
        <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Danh mục tài liệu</p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible">
          {sortedCategories.map((category) => {
            const count = downloads.filter((item) => item.categorySlug === category.slug).length;
            return (
              <a key={category.slug} href={`#download-${category.slug}`} className="flex shrink-0 items-center justify-between gap-5 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800">
                <span className="whitespace-nowrap lg:truncate">{category.name}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{count}</span>
              </a>
            );
          })}
        </div>
      </aside>

      <div className="space-y-6">
        {sortedCategories.map((category) => {
          const files = downloads.filter((item) => item.categorySlug === category.slug);
          return (
            <section key={category.slug} id={`download-${category.slug}`} className="scroll-mt-32 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-6">
              <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-950">{category.name}</h2>
                  {category.description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{category.description}</p> : null}
                </div>
                <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-black text-cyan-700">{files.length} tài liệu</span>
              </div>

              <div className="mt-4 space-y-3">
                {files.length ? files.map((item) => {
                  const format = getDownloadFormat(item);
                  const typeLabel = getDownloadTypeLabel(item);
                  return (
                    <article key={item.slug} className="group flex flex-col gap-4 rounded-[1.35rem] border border-slate-200 p-4 transition hover:border-cyan-300 hover:shadow-[0_14px_32px_rgba(14,79,175,0.08)] sm:flex-row sm:items-center">
                      <Link href={`/download/${item.slug}`} className="w-fit shrink-0" aria-label={`Xem ${item.title}`}>
                        <DocumentThumbnail item={item} format={format} size="row" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-cyan-700">{typeLabel}</span>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-slate-500">{format}</span>
                          <span className="text-xs font-semibold text-slate-500 sm:ml-auto">Cập nhật {item.publishedAt}</span>
                        </div>
                        <Link href={`/download/${item.slug}`} className="mt-2 block line-clamp-1 text-lg font-black text-slate-950 transition group-hover:text-[#0E4FAF]">{item.title}</Link>
                        {item.summary ? <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{item.summary}</p> : null}
                      </div>
                      <div className="flex shrink-0 gap-3 sm:flex-col sm:items-stretch">
                        <Link href={`/download/${item.slug}`} className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-center text-sm font-bold text-slate-800 transition hover:border-cyan-500 hover:text-cyan-700">Chi tiết</Link>
                        {item.fileUrl ? <Link href={`/api/download/${item.slug}`} target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-slate-950 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-[#0E4FAF]">Tải file</Link> : null}
                      </div>
                    </article>
                  );
                }) : <div className="rounded-xl border border-dashed border-slate-200 px-4 py-7 text-sm text-slate-500">Chưa có tài liệu trong mục này.</div>}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
