import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031634]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link href="/" className="min-w-0 shrink">
          {settings.wordmarkUrl ? (
            <Image
              src={settings.wordmarkUrl}
              alt={settings.siteName}
              width={620}
              height={110}
              className="h-auto max-h-[82px] w-[340px] max-w-full object-contain md:w-[430px] lg:w-[520px]"
              priority
            />
          ) : (
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-300">
                {settings.shortName}
              </p>
              <p className="mt-1 truncate text-sm font-black uppercase tracking-[0.08em] text-white md:text-base">
                Hội Doanh nghiệp Xã Bình Hưng
              </p>
              <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-blue-100/90 md:text-sm">
                Thành phố Hồ Chí Minh
              </p>
            </div>
          )}
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
