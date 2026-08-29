import { revalidateTag, unstable_cache } from "next/cache";
import {
  getDownloadBySlug,
  getDownloadCategories,
  getDownloads,
  getMemberBySlug,
  getMembers,
  getPartnerBySlug,
  getPartners,
  getPostBySlug,
  getPosts,
  getSiteSettings,
} from "@/lib/content";
import type { PostType } from "@/types/cms";

const cacheOptions = { revalidate: 300, tags: ["public-content"] };

export function invalidatePublicContent() {
  revalidateTag("public-content", { expire: 0 });
}

export const getPublicSiteSettings = unstable_cache(
  async () => getSiteSettings(),
  ["public-site-settings-v1"],
  cacheOptions
);

export const getPublicPosts = unstable_cache(
  async (type?: PostType) => getPosts(type),
  ["public-posts-v1"],
  cacheOptions
);

export const getPublicMembers = unstable_cache(
  async () => getMembers(),
  ["public-members-v1"],
  cacheOptions
);

export const getPublicPartners = unstable_cache(
  async () => getPartners(),
  ["public-partners-v1"],
  cacheOptions
);

export const getPublicDownloads = unstable_cache(
  async () => getDownloads(),
  ["public-downloads-v1"],
  cacheOptions
);

export const getPublicDownloadCategories = unstable_cache(
  async () => getDownloadCategories(),
  ["public-download-categories-v1"],
  cacheOptions
);

export const getPublicPostBySlug = unstable_cache(
  async (slug: string) => getPostBySlug(slug),
  ["public-post-by-slug-v1"],
  cacheOptions
);

export const getPublicMemberBySlug = unstable_cache(
  async (slug: string) => getMemberBySlug(slug),
  ["public-member-by-slug-v1"],
  cacheOptions
);

export const getPublicPartnerBySlug = unstable_cache(
  async (slug: string) => getPartnerBySlug(slug),
  ["public-partner-by-slug-v1"],
  cacheOptions
);

export const getPublicDownloadBySlug = unstable_cache(
  async (slug: string) => getDownloadBySlug(slug),
  ["public-download-by-slug-v1"],
  cacheOptions
);
