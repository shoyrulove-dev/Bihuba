import type { Metadata } from "next";

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
  return children;
}
