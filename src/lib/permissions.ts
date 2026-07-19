import type { CollectionKey } from "@/lib/admin";
import type { SessionUser } from "@/lib/auth";
import { UserModel } from "@/models/user";

export const MANAGER_PERMISSION_OPTIONS = [
  { label: "Đăng bài viết", value: "posts" },
  { label: "Quản lý hội viên", value: "members" },
  { label: "Quản lý đối tác", value: "partners" },
  { label: "Quản lý tài liệu", value: "downloads" },
  { label: "Quản lý danh mục tài liệu", value: "downloadCategories" },
  { label: "Quản lý doanh nghiệp đồng hành", value: "supporters" },
  { label: "Cấu hình website", value: "settings" },
] as const;

export type ManagerPermission = (typeof MANAGER_PERMISSION_OPTIONS)[number]["value"];

const DEFAULT_MANAGER_PERMISSIONS: ManagerPermission[] = ["posts"];

function normalizePermissions(value: unknown): ManagerPermission[] {
  if (!Array.isArray(value)) return DEFAULT_MANAGER_PERMISSIONS;
  const allowed = new Set(MANAGER_PERMISSION_OPTIONS.map((item) => item.value));
  const permissions = value.filter((item): item is ManagerPermission => allowed.has(String(item) as ManagerPermission));
  return permissions.length ? permissions : DEFAULT_MANAGER_PERMISSIONS;
}

export async function getSessionPermissions(session: SessionUser): Promise<ManagerPermission[]> {
  if (session.role === "admin") {
    return MANAGER_PERMISSION_OPTIONS.map((item) => item.value);
  }

  const user = await UserModel.findOne({ userId: session.userId }).lean();
  return normalizePermissions(user?.permissions);
}

export async function canAccessCollection(session: SessionUser, collection: CollectionKey) {
  if (session.role === "admin") return true;
  const permissions = await getSessionPermissions(session);

  if (collection === "users") return false;
  if (collection === "settings") {
    return permissions.includes("settings") || permissions.includes("supporters");
  }

  return permissions.includes(collection as ManagerPermission);
}

export async function canUploadAssets(session: SessionUser) {
  if (session.role === "admin") return true;
  const permissions = await getSessionPermissions(session);
  return permissions.some((item) => ["posts", "members", "partners", "downloads", "supporters", "settings"].includes(item));
}

