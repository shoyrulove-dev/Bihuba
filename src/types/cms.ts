export type PostType = "news" | "event" | "schedule" | "trade" | "sponsor";

export type MemberType = "business" | "individual" | "club";

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  website?: string;
}

export interface SiteSettingsShape {
  siteName: string;
  shortName: string;
  slogan: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  introTitle: string;
  introBody: string;
  memberStats: Array<{ label: string; value: string }>;
  nav: NavItem[];
  contact: ContactInfo;
}

export interface PostShape {
  _id?: string;
  title: string;
  slug: string;
  type: PostType;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  isFeatured: boolean;
}

export interface MemberShape {
  _id?: string;
  name: string;
  slug: string;
  memberType: MemberType;
  groupType: string;
  description: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  industry: string;
}

export interface PartnerShape {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website: string;
  partnerType: string;
}

export interface DownloadShape {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  fileUrl: string;
  category: string;
  publishedAt: string;
}
