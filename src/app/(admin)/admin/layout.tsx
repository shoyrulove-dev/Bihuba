import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";
import { AdminFrame } from "@/components/admin/admin-shell";
import { getCurrentAdminUser } from "@/lib/auth";
import { getAdminNavKeys } from "@/lib/permissions";
import "../../globals.css";

const beVietnamPro = Be_Vietnam_Pro({ variable: "--font-be-vietnam-pro", subsets: ["latin", "vietnamese"], weight: ["300", "400", "500", "600", "700"], preload: false });
const notoSans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin", "vietnamese"], weight: ["300", "400", "500", "600", "700"], preload: false });

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
  const session = await getCurrentAdminUser();
  const navKeys = session ? await getAdminNavKeys(session) : undefined;
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f4f7fb] text-slate-950" style={{ "--theme-font-family": '"Source Sans Pro", Arial, sans-serif' } as React.CSSProperties}>
        <AdminFrame initialNavKeys={navKeys}>{children}</AdminFrame>
      </body>
    </html>
  );
}
