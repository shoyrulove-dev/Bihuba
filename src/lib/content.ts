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
  return JSON.parse(JSON.stringify(value));
}

function getPostDisplayTimestamp(post: Pick<PostShape, "publishedAt" | "displayDate">) {
  const value = post.displayDate || post.publishedAt;
  if (!value) return 0;

  const normalized = value.includes("T") ? value : `${value}T01:00:00+07:00`;
  const timestamp = Date.parse(normalized);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function isPublishedPost(post: PostShape) {
  return (!post.status || post.status === "published") && getPostDisplayTimestamp(post) <= Date.now();
}

function sortPostsByDisplayDate(posts: PostShape[]) {
  return [...posts].sort((left, right) => {
    const rightTime = getPostDisplayTimestamp(right);
    const leftTime = getPostDisplayTimestamp(left);
    if (rightTime !== leftTime) return rightTime - leftTime;
    return String(right.publishedAt || "").localeCompare(String(left.publishedAt || ""));
  });
}

function normalizeDownloadCategory<T extends Partial<DownloadShape>>(item: T): T {
  const values = [item.category, item.categorySlug, item.documentType].map((value) =>
    String(value || "").toLowerCase()
  );
  const isFormSample = values.some(
    (value) =>
      value.includes("form") ||
      value.includes("bieu-mau") ||
      value.includes("biểu mẫu") ||
      value.includes("mẫu")
  );

  if (!isFormSample) {
    return {
      ...item,
      categorySlug: item.categorySlug || slugify(item.category || "khac"),
    };
  }

  return {
    ...item,
    category: "Form mẫu",
    categorySlug: "form-mau",
    documentType: item.documentType === "Biểu mẫu" ? "Form mẫu" : item.documentType,
  };
}

export async function getSiteSettings(options: { includeSecrets?: boolean } = {}): Promise<SiteSettingsShape> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultSettings);
  }

  const settings = await SiteSettingsModel.findOne().lean();
  if (!settings) {
    return repairDeepText(defaultSettings);
  }

  const normalized = serialize(settings) as Partial<SiteSettingsShape>;

  const mergedSettings = {
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
    aiAssistant: {
      ...defaultSettings.aiAssistant,
      ...(normalized.aiAssistant || {}),
    },
    memberStats: normalized.memberStats?.length ? normalized.memberStats : defaultSettings.memberStats,
    nav: normalized.nav?.length ? normalized.nav : defaultSettings.nav,
    supporterCompanies: normalized.supporterCompanies?.length
      ? normalized.supporterCompanies
      : defaultSettings.supporterCompanies,
    featureBanners: normalized.featureBanners?.length ? normalized.featureBanners : defaultSettings.featureBanners,
  };

  if (!options.includeSecrets) {
    mergedSettings.aiAssistant = {
      ...mergedSettings.aiAssistant,
      apiToken: "",
    };
  }

  return repairDeepText(mergedSettings);
}

export async function getPosts(
  type?: PostType,
  options: { includeUnpublished?: boolean } = {}
): Promise<PostShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    const posts = type ? defaultPosts.filter((post) => post.type === type) : defaultPosts;
    return repairDeepText(sortPostsByDisplayDate(options.includeUnpublished ? posts : posts.filter(isPublishedPost)));
  }

  const query = type ? { type } : {};
  const posts = await PostModel.find(query).lean();

  if (!posts.length) {
    const fallbackPosts = type ? defaultPosts.filter((post) => post.type === type) : defaultPosts;
    return repairDeepText(sortPostsByDisplayDate(options.includeUnpublished ? fallbackPosts : fallbackPosts.filter(isPublishedPost)));
  }

  const serialized = serialize(posts) as PostShape[];
  return repairDeepText(sortPostsByDisplayDate(options.includeUnpublished ? serialized : serialized.filter(isPublishedPost)));
}

export async function getPostBySlug(slug: string): Promise<PostShape | null> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultPosts.find((post) => post.slug === slug && isPublishedPost(post)) ?? null);
  }

  const post = await PostModel.findOne({ slug }).lean();
  const serialized = post ? (serialize(post) as PostShape) : null;
  if (serialized && !isPublishedPost(serialized)) {
    return null;
  }

  return repairDeepText(serialized);
}

export async function getMembers(): Promise<MemberShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultMembers);
  }

  const members = await MemberModel.find().sort({ createdAt: -1 }).lean();
  return repairDeepText(members.length ? serialize(members) : defaultMembers);
}

export async function getMemberBySlug(slug: string): Promise<MemberShape | null> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultMembers.find((item) => item.slug === slug) ?? null);
  }

  const member = await MemberModel.findOne({ slug }).lean();
  return repairDeepText(member ? serialize(member) : null);
}

export async function getPartners(): Promise<PartnerShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultPartners);
  }

  const partners = await PartnerModel.find().sort({ createdAt: -1 }).lean();
  return repairDeepText(partners.length ? serialize(partners) : defaultPartners);
}

export async function getPartnerBySlug(
  slug: string
): Promise<PartnerShape | null> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultPartners.find((item) => item.slug === slug) ?? null);
  }

  const partner = await PartnerModel.findOne({ slug }).lean();
  return repairDeepText(partner ? serialize(partner) : null);
}

export async function getDownloads(): Promise<DownloadShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultDownloads);
  }

  const downloads = await DownloadModel.find().sort({ publishedAt: -1 }).lean();
  if (!downloads.length) {
    return repairDeepText(defaultDownloads);
  }

  return repairDeepText(serialize(downloads).map((item) => normalizeDownloadCategory(item)));
}

export async function getDownloadCategories(): Promise<DownloadCategoryShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultDownloadCategories);
  }

  const categories = await DownloadCategoryModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return repairDeepText(categories.length ? serialize(categories) : defaultDownloadCategories);
}

export async function getUsers(): Promise<UserShape[]> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return [];
  }

  await ensureAdminUser();
  const users = await UserModel.find().sort({ userId: 1 }).lean();
  return repairDeepText(serialize(users).map((user) => {
    const { passwordHash, ...safeUser } = user as Record<string, unknown>;
    void passwordHash;
    return safeUser as unknown as UserShape;
  }));
}

export async function getDownloadBySlug(
  slug: string
): Promise<DownloadShape | null> {
  const connection = await connectToDatabase();

  if (!process.env.MONGODB_URI || !connection) {
    return repairDeepText(defaultDownloads.find((item) => item.slug === slug) ?? null);
  }

  const download = await DownloadModel.findOne({ slug }).lean();
  return repairDeepText(download ? normalizeDownloadCategory(serialize(download)) : null);
}
