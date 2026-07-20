import { getDownloads, getMembers, getPartners, getPosts } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bihuba.vercel.app";

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sitemapEntry({
  path,
  lastModified = new Date(),
  changeFrequency = "weekly",
  priority = 0.7,
}: {
  path: string;
  lastModified?: string | Date;
  changeFrequency?: "daily" | "weekly" | "monthly";
  priority?: number;
}) {
  const date = new Date(lastModified);
  const isoDate = Number.isFinite(date.getTime()) ? date.toISOString() : new Date().toISOString();

  return [
    "<url>",
    `<loc>${escapeXml(absoluteUrl(path))}</loc>`,
    `<lastmod>${isoDate}</lastmod>`,
    `<changefreq>${changeFrequency}</changefreq>`,
    `<priority>${priority.toFixed(2)}</priority>`,
    "</url>",
  ].join("");
}

export async function GET() {
  const [posts, members, partners, downloads] = await Promise.all([
    getPosts(),
    getMembers(),
    getPartners(),
    getDownloads(),
  ]);

  const entries = [
    sitemapEntry({ path: "/", priority: 1 }),
    sitemapEntry({ path: "/tin-tuc", priority: 0.8 }),
    sitemapEntry({ path: "/su-kien", priority: 0.8 }),
    sitemapEntry({ path: "/lich-tuan", priority: 0.8 }),
    sitemapEntry({ path: "/ket-noi-giao-thuong", priority: 0.8 }),
    sitemapEntry({ path: "/hoi-vien", priority: 0.8 }),
    sitemapEntry({ path: "/doi-tac", priority: 0.8 }),
    sitemapEntry({ path: "/download", priority: 0.8 }),
    sitemapEntry({ path: "/form-mau", priority: 0.8 }),
    sitemapEntry({ path: "/lien-he", priority: 0.8 }),
    ...posts.map((post) =>
      sitemapEntry({
        path: `/bai-viet/${post.slug}`,
        lastModified: post.displayDate || post.publishedAt || new Date(),
        priority: post.isFeatured ? 0.85 : 0.7,
      })
    ),
    ...members.map((member) =>
      sitemapEntry({ path: `/hoi-vien/${member.slug}`, changeFrequency: "monthly", priority: 0.65 })
    ),
    ...partners.map((partner) =>
      sitemapEntry({ path: `/doi-tac/${partner.slug}`, changeFrequency: "monthly", priority: 0.65 })
    ),
    ...downloads.map((item) =>
      sitemapEntry({
        path: `/download/${item.slug}`,
        lastModified: item.publishedAt || new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    ),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
