import Link from "next/link";
import { PostShape } from "@/types/cms";

export function PostCard({ post }: { post: PostShape }) {
  const displayDate = post.displayDate || post.publishedAt;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-slate-100 p-2">
        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.featuredImage} alt={post.title} className="max-h-full max-w-full object-contain" loading="lazy" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-slate-500">
          <span>{post.category}</span>
          <span>{displayDate}</span>
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-950">{post.title}</h3>
        {post.excerpt ? <p className="line-clamp-2 text-sm leading-6 text-slate-600">{post.excerpt}</p> : null}
        <Link
          href={`/bai-viet/${post.slug}`}
          className="mt-auto inline-flex w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-700"
        >
          Xem bài viết
        </Link>
      </div>
    </article>
  );
}
