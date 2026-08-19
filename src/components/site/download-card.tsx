import Link from "next/link";
import { DocumentThumbnail } from "@/components/site/document-thumbnail";
import { getDownloadFormat, getDownloadTypeLabel } from "@/lib/downloads";
import { DownloadShape } from "@/types/cms";

export function DownloadCard({ item }: { item: DownloadShape }) {
  const format = getDownloadFormat(item);
  const typeLabel = getDownloadTypeLabel(item);

  return (
    <article className="group flex h-full flex-col rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_24px_55px_rgba(14,79,175,0.1)]">
      <div className="flex items-start gap-4">
        <Link href={`/download/${item.slug}`} className="shrink-0" aria-label={`Xem ${item.title}`}>
          <DocumentThumbnail item={item} format={format} />
        </Link>
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-cyan-700">{typeLabel}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-slate-500">{format}</span>
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500">Cập nhật {item.publishedAt}</p>
          <Link href={`/download/${item.slug}`} className="mt-2 block line-clamp-3 text-lg font-black leading-6 text-slate-950 transition group-hover:text-[#0E4FAF]">{item.title}</Link>
        </div>
      </div>

      {item.summary ? <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-600">{item.summary}</p> : null}

      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <Link href={`/download/${item.slug}`} className="text-sm font-black text-[#0E4FAF] transition hover:text-cyan-700">Xem chi tiết →</Link>
        {item.fileUrl ? <Link href={item.fileUrl} target="_blank" rel="noreferrer" className="ml-auto rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0E4FAF]">Tải file</Link> : null}
      </div>
    </article>
  );
}
