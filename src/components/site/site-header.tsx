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
            width={720}
            height={92}
            className="h-auto max-h-[56px] w-[360px] max-w-full object-contain md:w-[440px] lg:w-[520px]"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-3 xl:gap-4 lg:flex">
          {settings.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-slate-100 transition hover:text-cyan-300 xl:text-[15px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
