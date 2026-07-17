import Link from "next/link";
import { DownloadShape } from "@/types/cms";

export function DownloadCard({ item }: { item: DownloadShape }) {
  return (
    <article className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.12em] text-slate-500">
        <span>{item.category}</span>
        <span>{item.publishedAt}</span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-slate-950">{item.title}</h3>
      {item.summary ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{item.summary}</p> : null}
      <Link
        href={`/download/${item.slug}`}
        className="mt-5 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
      >
        Xem tài liệu
      </Link>
    </article>
  );
}
