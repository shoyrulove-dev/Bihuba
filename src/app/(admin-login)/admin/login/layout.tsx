import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "../../../globals.css";

const font = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700"], preload: false });

export const metadata: Metadata = {
  title: "Đăng nhập Admin BIHUBA",
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi"><body className={`${font.className} min-h-full bg-[#f4f7fb] text-slate-950`}>{children}</body></html>;
}
