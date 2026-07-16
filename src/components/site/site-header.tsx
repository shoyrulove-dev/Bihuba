import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031634]/88 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-4">
          <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-[1.6rem] border border-white/10 bg-white/10 p-2 shadow-[0_16px_40px_rgba(2,12,27,0.25)]">
            <Image
              src={settings.logoUrl || "/bihuba-mark.svg"}
              alt="BIHUBA"
              width={128}
              height={128}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-300">
              {settings.shortName}
            </p>
            <p className="mt-1 truncate text-sm font-black uppercase tracking-[0.08em] text-white md:text-base">
              HỘI DOANH NGHIỆP XÃ BÌNH HƯNG
            </p>
            <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-blue-100/90 md:text-sm">
              THÀNH PHỐ HỒ CHÍ MINH
            </p>
          </div>
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-5 lg:flex">
          {settings.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-100 transition hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
