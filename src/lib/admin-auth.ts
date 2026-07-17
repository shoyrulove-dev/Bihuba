import { redirect } from "next/navigation";
import { getCurrentAdminUser } from "@/lib/auth";

export async function requireAdminPage(nextPath = "/admin") {
  const session = await getCurrentAdminUser();

  if (!session) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }

  return session;
}
