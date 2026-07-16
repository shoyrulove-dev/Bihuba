import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
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

  const safeHtml = sanitizeHtml(post.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "iframe",
      "video",
      "source",
      "figure",
      "figcaption",
      "span",
      "mark",
    ]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      iframe: [
        "src",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "frameborder",
        "title",
      ],
      video: ["src", "controls", "width", "height", "poster"],
      source: ["src", "type"],
      "*": ["class", "style"],
    },
    allowedSchemes: ["http", "https", "mailto", "data"],
  });

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
      <div
        className="prose prose-slate mt-8 max-w-none prose-headings:text-slate-950 prose-a:text-cyan-700 prose-img:rounded-3xl"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
}
