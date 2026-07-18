import Image from "next/image";
import Link from "next/link";
import { getDownloadFormat, getDownloadTypeLabel } from "@/lib/downloads";
import { DownloadShape } from "@/types/cms";

export function DownloadCard({ item }: { item: DownloadShape }) {
  const format = getDownloadFormat(item);
  const typeLabel = getDownloadTypeLabel(item);

  return (
    <article className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {item.coverImage ? (
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_58%),linear-gradient(135deg,_#0f172a,_#1d4ed8)] text-center">
            <div className="px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">{format}</p>
              <p className="mt-3 text-lg font-semibold text-white">{item.title}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">{typeLabel}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{format}</span>
          <span className="ml-auto normal-case tracking-normal">{item.publishedAt}</span>
        </div>
        <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-slate-950">{item.title}</h3>
        {item.summary ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.summary}</p> : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/download/${item.slug}`}
            className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
          >
            Xem chi tiết
          </Link>
          {item.fileUrl ? (
            <Link
              href={item.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Tải file
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
