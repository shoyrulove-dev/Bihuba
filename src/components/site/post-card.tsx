import Link from "next/link";
import { PostShape } from "@/types/cms";

export function PostCard({ post }: { post: PostShape }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div
        className="h-52 bg-slate-200 bg-cover bg-center"
        style={{ backgroundImage: `url(${post.featuredImage})` }}
      />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
          <span>{post.category}</span>
          <span>{post.publishedAt}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-950">{post.title}</h3>
        <p className="line-clamp-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
        <Link
          href={`/bai-viet/${post.slug}`}
          className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          Xem chi tiet
        </Link>
      </div>
    </article>
  );
}
