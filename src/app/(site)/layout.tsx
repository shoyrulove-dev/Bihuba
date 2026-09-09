import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";
import { AiAssistantWidget } from "@/components/site/ai-assistant-widget";
import { FloatingContactButtons } from "@/components/site/floating-contact-buttons";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { getPublicSiteSettings as getSiteSettings } from "@/lib/public-content";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bihuba.vercel.app";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
});

const fontFamilies = {
  "source-sans-pro": '"Source Sans Pro", Arial, sans-serif',
  "be-vietnam-pro": 'var(--font-be-vietnam-pro), Arial, sans-serif',
  "noto-sans": 'var(--font-noto-sans), Arial, sans-serif',
  system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seoTitle || `${settings.shortName || "BIHUBA"} - ${settings.siteName}`;
  const description =
    settings.seoDescription || settings.heroSubtitle ||
    "Cổng thông tin của Hội Doanh nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${settings.shortName || "BIHUBA"}`,
    },
    description,
    applicationName: settings.shortName || "BIHUBA",
    keywords: settings.seoKeywords?.split(",").map((item) => item.trim()).filter(Boolean),
    icons: {
      icon: [{ url: "/favicon-64.png?v=3", type: "image/png", sizes: "64x64" }],
      shortcut: ["/favicon-64.png?v=3"],
      apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180" }],
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
    <html lang="vi" className={`${beVietnamPro.variable} ${notoSans.variable} h-full antialiased`}>
      <body
        className="min-h-full bg-slate-50 text-slate-950"
        style={
          {
            "--theme-primary": settings?.theme?.primaryColor || "#0E4FAF",
            "--theme-accent": settings?.theme?.accentColor || "#56D6FF",
            "--theme-surface": settings?.theme?.surfaceColor || "#F8FAFC",
            "--theme-font-family": fontFamilies[settings?.theme?.fontFamily || "source-sans-pro"],
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
        <main><ScrollReveal>{children}</ScrollReveal></main>
        {settings ? (
          <AiAssistantWidget
            settings={{
              enabled: settings.aiAssistant.enabled,
              model: settings.aiAssistant.model,
              systemPrompt: "",
            }}
          />
        ) : null}
        {settings ? <FloatingContactButtons actions={settings.floatingActions} /> : null}
        {settings ? <SiteFooter settings={settings} /> : null}
      </body>
    </html>
  );
}
