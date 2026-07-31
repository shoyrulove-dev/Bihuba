import Link from "next/link";
import { getDownloadFormat, getDownloadTypeLabel } from "@/lib/downloads";
import { DownloadShape } from "@/types/cms";

function buildPreviewLines(item: DownloadShape, format: string) {
  return [
    item.title.slice(0, 18).trim(),
    (item.summary || "T\u00e0i li\u1ec7u n\u1ed9i b\u1ed9").slice(0, 22).trim(),
    item.publishedAt || format,
  ];
}

function CompactDocumentThumb({ item, format }: { item: DownloadShape; format: string }) {
  const lines = buildPreviewLines(item, format);

  return (
    <div className="relative h-[88px] w-[66px] shrink-0 overflow-hidden rounded-[1rem] bg-[linear-gradient(135deg,_#0b2c5c,_#1d4ed8)] p-[3px] shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
      {item.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.coverImage}
          alt={item.title}
          className="h-full w-full rounded-[0.85rem] bg-slate-100 object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[0.85rem] bg-white">
          <div className="h-[8px] w-full bg-[linear-gradient(90deg,_#22d3ee,_#2563eb)]" />
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
      )}
    </div>
  );
}

export function DownloadCard({ item }: { item: DownloadShape }) {
  const format = getDownloadFormat(item);
  const typeLabel = getDownloadTypeLabel(item);

  return (
    <article className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)] md:grid-cols-[66px_minmax(0,1fr)_auto] md:items-center">
      <CompactDocumentThumb item={item} format={format} />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">{typeLabel}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{format}</span>
          <span className="ml-auto normal-case tracking-normal">{item.publishedAt}</span>
        </div>
        <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-slate-900">{item.title}</h3>
        {item.summary ? <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">{item.summary}</p> : null}
      </div>

      <div className="flex shrink-0 flex-wrap gap-3 md:justify-end">
        <Link
          href={`/download/${item.slug}`}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
        >
          {"Xem chi ti\u1ebft"}
        </Link>
        {item.fileUrl ? (
          <Link
            href={item.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {"T\u1ea3i file"}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
