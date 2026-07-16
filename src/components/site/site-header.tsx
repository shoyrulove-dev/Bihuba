import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031634]/88 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-4">
          <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-white/8 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
            <Image
              src={settings.logoUrl || "/bihuba-mark.svg"}
              alt="BIHUBA"
              width={88}
              height={88}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              {settings.shortName}
            </p>
            <p className="mt-1 max-w-md text-sm text-slate-300">{settings.slogan}</p>
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
