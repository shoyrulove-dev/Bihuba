import type { Metadata } from "next";
import { headers } from "next/headers";
import { AdminFrame } from "@/components/admin/admin-shell";
import { getCurrentAdminUser } from "@/lib/auth";
import { getAdminNavKeys } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Admin BIHUBA",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-bihuba-pathname") || "";
  if (pathname.startsWith("/admin/login")) return children;
  const session = await getCurrentAdminUser();
  const navKeys = session ? await getAdminNavKeys(session) : undefined;
  return <AdminFrame initialNavKeys={navKeys}>{children}</AdminFrame>;
}
