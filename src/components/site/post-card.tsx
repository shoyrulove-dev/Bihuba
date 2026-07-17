import Link from "next/link";
import { PostShape } from "@/types/cms";

export function PostCard({ post }: { post: PostShape }) {
  return (
    <article className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="h-44 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url(${post.featuredImage})` }} />
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-slate-500">
          <span>{post.category}</span>
          <span>{post.publishedAt}</span>
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-950">{post.title}</h3>
        {post.excerpt ? <p className="line-clamp-2 text-sm leading-6 text-slate-600">{post.excerpt}</p> : null}
        <Link
          href={`/bai-viet/${post.slug}`}
          className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
        >
          Xem bài viết
        </Link>
      </div>
    </article>
  );
}
