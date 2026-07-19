import { redirect } from "next/navigation";
import { getCurrentAdminUser } from "@/lib/auth";
import { canAccessCollection } from "@/lib/permissions";

function getCollectionFromPath(path: string) {
  if (path.startsWith("/admin/posts")) return "posts";
  if (path.startsWith("/admin/members")) return "members";
  if (path.startsWith("/admin/partners")) return "partners";
  if (path.startsWith("/admin/downloads")) return "downloads";
  if (path.startsWith("/admin/users")) return "users";
  if (path.startsWith("/admin/settings")) return "settings";
  return null;
}

export async function requireAdminPage(nextPath = "/admin") {
  const session = await getCurrentAdminUser();

  if (!session) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }

  const collection = getCollectionFromPath(nextPath);
  if (collection && !(await canAccessCollection(session, collection))) {
    redirect("/admin/posts");
  }

  return session;
}
