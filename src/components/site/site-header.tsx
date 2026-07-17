import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

const DEFAULT_WORDMARK = "/bihuba-wordmark.svg";
const TEST_HEADER_WORDMARK = "/bihuba-wordmark-header.svg";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  const headerBanner =
    !settings.wordmarkUrl || settings.wordmarkUrl === DEFAULT_WORDMARK
      ? TEST_HEADER_WORDMARK
      : settings.wordmarkUrl;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031634]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="min-w-0 shrink-0">
          <Image
            src={headerBanner}
            alt={settings.siteName}
            width={920}
            height={84}
            className="h-auto max-h-[52px] w-[440px] max-w-full object-contain md:w-[560px] lg:w-[700px]"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-2 xl:gap-3 lg:flex">
          {settings.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-slate-100 transition hover:text-cyan-300 lg:text-[14px] xl:text-[15px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
