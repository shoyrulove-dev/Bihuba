import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AiAssistantWidget } from "@/components/site/ai-assistant-widget";
import { FloatingContactButtons } from "@/components/site/floating-contact-buttons";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

export const dynamic = "force-dynamic";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bihuba.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = `${settings.shortName || "BIHUBA"} - ${settings.siteName}`;
  const description =
    settings.heroSubtitle ||
    "Cổng thông tin của Hội Doanh nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${settings.shortName || "BIHUBA"}`,
    },
    description,
    applicationName: settings.shortName || "BIHUBA",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: siteUrl,
      siteName: settings.shortName || "BIHUBA",
      title,
      description,
      images: [
        {
          url: settings.heroImage || "/bihuba-hero-generated.svg",
          width: 1200,
          height: 630,
          alt: settings.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [settings.heroImage || "/bihuba-hero-generated.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    alternateName: settings.shortName,
    url: siteUrl,
    logo: new URL(settings.logoUrl || "/bihuba-mark.svg", siteUrl).toString(),
    email: settings.contact.email,
    telephone: settings.contact.phone,
    address: settings.contact.address,
    sameAs: Object.values(settings.socialLinks || {}).filter(Boolean),
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <main>{children}</main>
        {settings ? <AiAssistantWidget settings={settings.aiAssistant} /> : null}
        {settings ? <FloatingContactButtons actions={settings.floatingActions} /> : null}
        {settings ? <SiteFooter settings={settings} /> : null}
      </body>
    </html>
  );
}
