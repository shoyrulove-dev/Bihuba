import { privatePageMetadata } from "@/lib/seo";
export const metadata = { ...privatePageMetadata, title: "Dashboard hội viên" };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
