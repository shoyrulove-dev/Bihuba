import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/content";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        {post.category}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-slate-500">{post.publishedAt}</p>
      <div
        className="mt-8 h-80 rounded-[2rem] bg-slate-200 bg-cover bg-center"
        style={{ backgroundImage: `url(${post.featuredImage})` }}
      />
      <div className="prose prose-slate mt-8 max-w-none">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
