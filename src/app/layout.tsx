import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FloatingContactButtons } from "@/components/site/floating-contact-buttons";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

export const dynamic = "force-dynamic";

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
  description: "C\u1ed5ng th\u00f4ng tin c\u1ee7a H\u1ed9i Doanh nghi\u1ec7p X\u00e3 B\u00ecnh H\u01b0ng Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body
        className="min-h-full bg-slate-50 text-slate-950"
        style={
          {
            "--theme-primary": settings?.theme?.primaryColor || "#0E4FAF",
            "--theme-accent": settings?.theme?.accentColor || "#56D6FF",
            "--theme-surface": settings?.theme?.surfaceColor || "#F8FAFC",
            "--theme-heading-scale": settings?.theme?.headingScale || "1",
            "--theme-body-scale": settings?.theme?.bodyScale || "1",
          } as React.CSSProperties
        }
      >
        {settings ? <SiteHeader settings={settings} /> : null}
        <main>{children}</main>
        {settings ? <FloatingContactButtons actions={settings.floatingActions} /> : null}
        {settings ? <SiteFooter settings={settings} /> : null}
      </body>
    </html>
  );
}
