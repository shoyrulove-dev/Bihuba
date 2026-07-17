import { DownloadCategoryModel } from "@/models/download-category";
import { DownloadModel } from "@/models/download";
import { MemberModel } from "@/models/member";
import { PartnerModel } from "@/models/partner";
import { PostModel } from "@/models/post";
import { SiteSettingsModel } from "@/models/site-settings";
import { UserModel } from "@/models/user";

export const collectionMap = {
  posts: PostModel,
  members: MemberModel,
  partners: PartnerModel,
  downloadCategories: DownloadCategoryModel,
  downloads: DownloadModel,
  settings: SiteSettingsModel,
  users: UserModel,
};

export type CollectionKey = keyof typeof collectionMap;
