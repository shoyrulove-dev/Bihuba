import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        <Link href="/" className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/40 bg-linear-to-br from-cyan-300 to-blue-700 font-black text-slate-950">
            B
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              {settings.shortName}
            </p>
            <p className="max-w-xs text-sm text-slate-300">{settings.slogan}</p>
          </div>
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-5 lg:flex">
          {settings.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
