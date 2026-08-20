import type { CollectionKey } from "@/lib/admin";
import type { SessionUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";

export const MANAGER_PERMISSION_OPTIONS = [
  { label: "Đăng bài viết", value: "posts" },
  { label: "Duyệt bài viết", value: "approvePosts" },
  { label: "Quản lý hội viên", value: "members" },
  { label: "Quản lý đối tác", value: "partners" },
  { label: "Quản lý tài liệu", value: "downloads" },
  { label: "Quản lý danh mục tài liệu", value: "downloadCategories" },
  { label: "Quản lý doanh nghiệp đồng hành", value: "supporters" },
  { label: "Cấu hình website", value: "settings" },
] as const;

export type ManagerPermission = (typeof MANAGER_PERMISSION_OPTIONS)[number]["value"];
export type AdminAccessKey = CollectionKey | "supporters";
export type AdminNavKey =
  | "dashboard"
  | "posts"
  | "members"
  | "partners"
  | "downloads"
  | "users"
  | "ekyc"
  | "settings";

const DEFAULT_MANAGER_PERMISSIONS: ManagerPermission[] = ["posts"];

function normalizePermissions(value: unknown, role?: SessionUser["role"]): ManagerPermission[] {
  if (role === "business") return ["posts"];
  if (!Array.isArray(value)) return DEFAULT_MANAGER_PERMISSIONS;
  const allowed = new Set(MANAGER_PERMISSION_OPTIONS.map((item) => item.value));
  const permissions = value.filter((item): item is ManagerPermission => allowed.has(String(item) as ManagerPermission));
  return permissions.length ? permissions : DEFAULT_MANAGER_PERMISSIONS;
}

export async function getSessionPermissions(session: SessionUser): Promise<ManagerPermission[]> {
  if (session.role === "admin") {
    return MANAGER_PERMISSION_OPTIONS.map((item) => item.value);
  }

  await connectToDatabase();
  const user = await UserModel.findOne({ userId: session.userId }).lean();
  return normalizePermissions(user?.permissions, session.role);
}

export async function canAccessCollection(session: SessionUser, collection: AdminAccessKey) {
  if (session.role === "admin") return true;
  if (session.role === "business") return collection === "posts";

  const permissions = await getSessionPermissions(session);

  if (collection === "users") return false;
  if (collection === "posts") {
    return permissions.includes("posts") || permissions.includes("approvePosts");
  }
  if (collection === "supporters") {
    return permissions.includes("supporters") || permissions.includes("settings");
  }
  if (collection === "settings") {
    return permissions.includes("settings");
  }

  return permissions.includes(collection as ManagerPermission);
}

export async function canUploadAssets(session: SessionUser) {
  if (session.role === "admin") return true;
  const permissions = await getSessionPermissions(session);
  return permissions.some((item) => ["posts", "members", "partners", "downloads", "supporters", "settings"].includes(item));
}

export async function canApprovePosts(session: SessionUser) {
  if (session.role === "admin") return true;
  if (session.role !== "manager") return false;
  const permissions = await getSessionPermissions(session);
  return permissions.includes("approvePosts");
}

export async function getAdminNavKeys(session: SessionUser): Promise<AdminNavKey[]> {
  if (session.role === "admin") {
    return ["dashboard", "posts", "members", "partners", "downloads", "users", "ekyc", "settings"];
  }

  if (session.role === "business") {
    return ["posts"];
  }

  const permissions = await getSessionPermissions(session);
  const nav: AdminNavKey[] = [];

  if (permissions.includes("posts") || permissions.includes("approvePosts")) nav.push("posts");
  if (permissions.includes("members")) nav.push("members");
  if (permissions.includes("partners")) nav.push("partners");
  if (permissions.includes("downloads") || permissions.includes("downloadCategories")) nav.push("downloads");
  if (permissions.includes("settings") || permissions.includes("supporters")) nav.push("settings");

  return nav.length ? nav : ["posts"];
}

export async function getDefaultAdminPath(session: SessionUser) {
  if (session.role === "admin") return "/admin";

  const [firstNav] = await getAdminNavKeys(session);
  if (firstNav === "settings") return "/admin/settings";
  return `/admin/${firstNav}`;
}
