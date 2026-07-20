import { notFound } from "next/navigation";
import type { Metadata } from "next";
import sanitizeHtml from "sanitize-html";
import { getPostBySlug } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bihuba.vercel.app";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const description = post.excerpt || post.title;
  const image = post.featuredImage || "/bihuba-hero-generated.svg";

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/bai-viet/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: new URL(`/bai-viet/${post.slug}`, siteUrl).toString(),
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function PostDetailPage({
  params,
}: PageProps) {
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
  const displayDate = post.displayDate || post.publishedAt;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.featuredImage ? [new URL(post.featuredImage, siteUrl).toString()] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.displayDate || post.publishedAt,
    mainEntityOfPage: new URL(`/bai-viet/${post.slug}`, siteUrl).toString(),
    publisher: {
      "@type": "Organization",
      name: "BIHUBA",
      logo: {
        "@type": "ImageObject",
        url: new URL("/bihuba-mark.svg", siteUrl).toString(),
      },
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        {post.category}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-slate-500">{displayDate}</p>
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
