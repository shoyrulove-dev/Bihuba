import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicDownloadBySlug as getDownloadBySlug } from "@/lib/public-content";
import { getDownloadFormat, getDownloadTypeLabel, isPdfDownload } from "@/lib/downloads";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = await getDownloadBySlug((await params).slug);
  if (!item) return {};
  return { title: item.title, description: item.summary, alternates: { canonical: `/download/${item.slug}` } };
}

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
      <section className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
        {item.coverImage ? (
          <div className="relative aspect-[16/9] bg-slate-100">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 1152px, 100vw"
              priority
            />
          </div>
        ) : null}

        <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">{item.category}</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{item.title}</h1>
            {item.summary ? <p className="mt-5 text-base leading-8 text-slate-600">{item.summary}</p> : null}
          </div>

          <aside className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">{typeLabel}</span>
              <span className="rounded-full bg-white px-3 py-1">{format}</span>
              <span className="rounded-full bg-white px-3 py-1 normal-case tracking-normal">{item.publishedAt}</span>
            </div>

            <div className="mt-4 grid gap-3">
              {item.fileUrl ? (
                <>
                  <Link
                    href={`/api/download/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    {"Xem file gốc"}
                  </Link>
                  <Link
                    href={`/api/download/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
                  >
                    {"Tải xuống"}
                  </Link>
                </>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {canPreviewPdf ? (
        <section className="mt-8 rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-950">Xem nhanh PDF</h2>
            <span className="text-sm text-slate-500">
              {"Có thể mở toàn màn hình hoặc tải xuống khi cần."}
            </span>
          </div>
          <div className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-slate-50">
            <iframe
              src={`${item.fileUrl}#view=FitH`}
              title={item.title}
              className="h-[640px] w-full"
            />
          </div>
        </section>
      ) : (
        <div className="mt-8 rounded-[1.4rem] border border-dashed border-slate-300 bg-white p-5 text-sm leading-7 text-slate-600">
          {"Tài liệu dạng "}
          {format}
          {" không hỗ trợ xem trực tiếp ngay trong website. Bạn có thể mở file gốc hoặc tải xuống để xem trên máy."}
        </div>
      )}
    </div>
  );
}
