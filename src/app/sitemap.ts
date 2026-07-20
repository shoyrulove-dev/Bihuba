import type { MetadataRoute } from "next";
import { getDownloads, getMembers, getPartners, getPosts } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bihuba.vercel.app";

function url(path: string) {
  return new URL(path, siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, members, partners, downloads] = await Promise.all([
    getPosts(),
    getMembers(),
    getPartners(),
    getDownloads(),
  ]);

  const staticRoutes = [
    "/",
    "/tin-tuc",
    "/su-kien",
    "/lich-tuan",
    "/ket-noi-giao-thuong",
    "/hoi-vien",
    "/doi-tac",
    "/download",
    "/form-mau",
    "/lien-he",
  ].map((path) => ({
    url: url(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: url(`/bai-viet/${post.slug}`),
      lastModified: post.displayDate || post.publishedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: post.isFeatured ? 0.85 : 0.7,
    })),
    ...members.map((member) => ({
      url: url(`/hoi-vien/${member.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...partners.map((partner) => ({
      url: url(`/doi-tac/${partner.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...downloads.map((item) => ({
      url: url(`/download/${item.slug}`),
      lastModified: item.publishedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
