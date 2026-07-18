import { connectToDatabase } from "@/lib/db";
import {
  defaultDownloadCategories,
  defaultDownloads,
  defaultMembers,
  defaultPartners,
  defaultPosts,
  defaultSettings,
} from "@/lib/default-content";
import { DownloadCategoryModel } from "@/models/download-category";
import { DownloadModel } from "@/models/download";
import { MemberModel } from "@/models/member";
import { PartnerModel } from "@/models/partner";
import { PostModel } from "@/models/post";
import { SiteSettingsModel } from "@/models/site-settings";
import {
  DownloadShape,
  DownloadCategoryShape,
  MemberShape,
  PartnerShape,
  PostShape,
  PostType,
  SiteSettingsShape,
  UserShape,
} from "@/types/cms";
import { ensureAdminUser } from "@/lib/auth";
import { UserModel } from "@/models/user";
import { slugify } from "@/lib/slug";
import { repairDeepText } from "@/lib/text";

function serialize<T>(value: T): T {
  return repairDeepText(JSON.parse(JSON.stringify(value)));
}

export async function getSiteSettings(): Promise<SiteSettingsShape> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultSettings;
  }

  const settings = await SiteSettingsModel.findOne().lean();
  if (!settings) {
    return defaultSettings;
  }

  const normalized = serialize(settings) as Partial<SiteSettingsShape>;

  return {
    ...defaultSettings,
    ...normalized,
    contact: {
      ...defaultSettings.contact,
      ...(normalized.contact || {}),
    },
    floatingActions: {
      ...defaultSettings.floatingActions,
      ...(normalized.floatingActions || {}),
    },
    socialLinks: {
      ...defaultSettings.socialLinks,
      ...(normalized.socialLinks || {}),
    },
    theme: {
      ...defaultSettings.theme,
      ...(normalized.theme || {}),
    },
    memberStats: normalized.memberStats?.length ? normalized.memberStats : defaultSettings.memberStats,
    nav: normalized.nav?.length ? normalized.nav : defaultSettings.nav,
    supporterCompanies: normalized.supporterCompanies?.length
      ? normalized.supporterCompanies
      : defaultSettings.supporterCompanies,
    featureBanners: normalized.featureBanners?.length ? normalized.featureBanners : defaultSettings.featureBanners,
  };
}

export async function getPosts(type?: PostType): Promise<PostShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return type ? defaultPosts.filter((post) => post.type === type) : defaultPosts;
  }

  const query = type ? { type } : {};
  const posts = await PostModel.find(query).sort({ publishedAt: -1 }).lean();

  if (!posts.length) {
    return type ? defaultPosts.filter((post) => post.type === type) : defaultPosts;
  }

  return serialize(posts);
}

export async function getPostBySlug(slug: string): Promise<PostShape | null> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultPosts.find((post) => post.slug === slug) ?? null;
  }

  const post = await PostModel.findOne({ slug }).lean();
  return post ? serialize(post) : null;
}

export async function getMembers(): Promise<MemberShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultMembers;
  }

  const members = await MemberModel.find().sort({ createdAt: -1 }).lean();
  return members.length ? serialize(members) : defaultMembers;
}

export async function getMemberBySlug(slug: string): Promise<MemberShape | null> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultMembers.find((item) => item.slug === slug) ?? null;
  }

  const member = await MemberModel.findOne({ slug }).lean();
  return member ? serialize(member) : null;
}

export async function getPartners(): Promise<PartnerShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultPartners;
  }

  const partners = await PartnerModel.find().sort({ createdAt: -1 }).lean();
  return partners.length ? serialize(partners) : defaultPartners;
}

export async function getPartnerBySlug(
  slug: string
): Promise<PartnerShape | null> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultPartners.find((item) => item.slug === slug) ?? null;
  }

  const partner = await PartnerModel.findOne({ slug }).lean();
  return partner ? serialize(partner) : null;
}

export async function getDownloads(): Promise<DownloadShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultDownloads;
  }

  const downloads = await DownloadModel.find().sort({ publishedAt: -1 }).lean();
  if (!downloads.length) {
    return defaultDownloads;
  }

  return serialize(downloads).map((item) => ({
    ...item,
    categorySlug: item.categorySlug || slugify(item.category || "khac"),
  }));
}

export async function getDownloadCategories(): Promise<DownloadCategoryShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultDownloadCategories;
  }

  const categories = await DownloadCategoryModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return categories.length ? serialize(categories) : defaultDownloadCategories;
}

export async function getUsers(): Promise<UserShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return [];
  }

  await ensureAdminUser();
  const users = await UserModel.find().sort({ userId: 1 }).lean();
  return serialize(users).map((user) => {
    const { passwordHash, ...safeUser } = user as Record<string, unknown>;
    void passwordHash;
    return safeUser as unknown as UserShape;
  });
}

export async function getDownloadBySlug(
  slug: string
): Promise<DownloadShape | null> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return defaultDownloads.find((item) => item.slug === slug) ?? null;
  }

  const download = await DownloadModel.findOne({ slug }).lean();
  return download ? serialize(download) : null;
}
