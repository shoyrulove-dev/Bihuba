import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIHUBA",
  description: "Cổng thông tin BIHUBA với quản trị nội dung bằng Next.js và MongoDB.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") || "";
  const isAdminRoute = pathname.startsWith("/admin");
  const settings = await getSiteSettings();

  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-950">
        {!isAdminRoute ? <SiteHeader settings={settings} /> : null}
        <main>{children}</main>
        {!isAdminRoute ? <SiteFooter settings={settings} /> : null}
      </body>
    </html>
  );
}
