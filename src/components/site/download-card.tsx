import Link from "next/link";
import { DownloadShape } from "@/types/cms";

export function DownloadCard({ item }: { item: DownloadShape }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
        <span>{item.category}</span>
        <span>{item.publishedAt}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>
      <Link
        href={`/download/${item.slug}`}
        className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
      >
        Xem tài liệu
      </Link>
    </article>
  );
}
