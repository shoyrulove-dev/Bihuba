import { notFound } from "next/navigation";
import { getDownloadBySlug } from "@/lib/content";

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

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        {item.category}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
        {item.title}
      </h1>
      <p className="mt-3 text-sm text-slate-500">{item.publishedAt}</p>
      <p className="mt-8 text-lg leading-8 text-slate-600">{item.summary}</p>
      <a
        href={item.fileUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
      >
        Mở file
      </a>
    </div>
  );
}
