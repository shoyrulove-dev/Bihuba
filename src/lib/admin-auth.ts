import { redirect } from "next/navigation";
import { getCurrentAdminUser } from "@/lib/auth";
import { canAccessCollection, getDefaultAdminPath, type AdminAccessKey } from "@/lib/permissions";

function getAccessKeyFromPath(path: string): AdminAccessKey | "settingsIndex" | null {
  if (path.startsWith("/admin/posts")) return "posts";
  if (path.startsWith("/admin/members")) return "members";
  if (path.startsWith("/admin/partners")) return "partners";
  if (path.startsWith("/admin/downloads")) return "downloads";
  if (path.startsWith("/admin/users")) return "users";
  if (path.startsWith("/admin/settings/supporters")) return "supporters";
  if (path === "/admin/settings" || path === "/admin/settings/") return "settingsIndex";
  if (path.startsWith("/admin/settings")) return "settings";
  return null;
}

export async function requireAdminPage(nextPath = "/admin") {
  const session = await getCurrentAdminUser();

  if (!session) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }

  if (nextPath.startsWith("/admin/ekyc") && session.role !== "admin") {
    redirect(await getDefaultAdminPath(session));
  }

  if ((nextPath === "/admin" || nextPath === "/admin/") && session.role !== "admin") {
    redirect(await getDefaultAdminPath(session));
  }

  const accessKey = getAccessKeyFromPath(nextPath);
  if (accessKey === "settingsIndex") {
    const canAccessSettingsIndex =
      (await canAccessCollection(session, "settings")) || (await canAccessCollection(session, "supporters"));
    if (!canAccessSettingsIndex) {
      redirect(await getDefaultAdminPath(session));
    }
  } else if (accessKey && !(await canAccessCollection(session, accessKey))) {
    redirect(await getDefaultAdminPath(session));
  }

  return session;
}
