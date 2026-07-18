import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDownloadBySlug } from "@/lib/content";
import { getDownloadFormat, getDownloadTypeLabel, isPdfDownload } from "@/lib/downloads";

export default async function DownloadDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getDownloadBySlug(slug);

  if (!item) {
    notFound();
  }

  const format = getDownloadFormat(item);
  const typeLabel = getDownloadTypeLabel(item);
  const canPreviewPdf = Boolean(item.fileUrl) && isPdfDownload(item);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100">
            {item.coverImage ? (
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                className="object-cover"
                sizes="320px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_58%),linear-gradient(135deg,_#0f172a,_#1d4ed8)] p-6 text-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">{format}</p>
                  <p className="mt-3 text-xl font-semibold text-white">{item.title}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">{typeLabel}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{format}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 normal-case tracking-normal">{item.publishedAt}</span>
          </div>

          <div className="mt-5 grid gap-3">
            <Link
              href={item.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {"Xem file g\u1ed1c"}
            </Link>
            <Link
              href={item.fileUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
            >
              {"T\u1ea3i xu\u1ed1ng"}
            </Link>
          </div>
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">{item.category}</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{item.title}</h1>
          {item.summary ? <p className="mt-5 text-base leading-8 text-slate-600">{item.summary}</p> : null}

          {canPreviewPdf ? (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-slate-950">Xem nhanh PDF</h2>
                <span className="text-sm text-slate-500">
                  {"C\u00f3 th\u1ec3 m\u1edf to\u00e0n m\u00e0n h\u00ecnh ho\u1eb7c t\u1ea3i xu\u1ed1ng khi c\u1ea7n."}
                </span>
              </div>
              <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-slate-50">
                <iframe
                  src={`${item.fileUrl}#view=FitH`}
                  title={item.title}
                  className="h-[900px] w-full"
                />
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-[1.4rem] border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              {"T\u00e0i li\u1ec7u d\u1ea1ng "}
              {format}
              {" kh\u00f4ng h\u1ed7 tr\u1ee3 xem tr\u1ef1c ti\u1ebfp ngay trong website. B\u1ea1n c\u00f3 th\u1ec3 m\u1edf file g\u1ed1c ho\u1eb7c t\u1ea3i xu\u1ed1ng \u0111\u1ec3 xem tr\u00ean m\u00e1y."}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
