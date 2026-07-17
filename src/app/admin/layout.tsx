import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentAdminUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") || "";

  if (!pathname.startsWith("/admin/login")) {
    const session = await getCurrentAdminUser();
    if (!session) {
      redirect(`/admin/login?next=${encodeURIComponent(pathname || "/admin")}`);
    }
  }

  return children;
}
