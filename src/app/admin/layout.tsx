import type { Metadata } from "next";
import { headers } from "next/headers";
import { AdminFrame } from "@/components/admin/admin-shell";

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
  return <AdminFrame>{children}</AdminFrame>;
}
