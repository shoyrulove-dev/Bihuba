import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031634]/88 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/bihuba-mark.svg"
            alt="BIHUBA"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-cyan-300/20 bg-white/10 p-1.5"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              {settings.shortName}
            </p>
            <p className="max-w-sm text-sm text-slate-300">{settings.slogan}</p>
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
