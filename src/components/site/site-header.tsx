import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031634]/95 backdrop-blur">
      <div className="grid w-full grid-cols-[minmax(360px,520px)_minmax(0,1fr)] items-center gap-12 px-10 py-3">
        <Link
          href="/"
          className="group flex min-h-[86px] w-full items-center gap-4 overflow-hidden rounded-2xl border border-cyan-200/12 bg-gradient-to-r from-white/[0.09] via-white/[0.055] to-transparent px-5 py-3 shadow-[0_14px_34px_rgba(2,12,27,0.2)]"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-cyan-100/30">
            <Image
              src={settings.logoUrl || "/bihuba-mark.svg"}
              alt={settings.shortName || "BIHUBA"}
              width={112}
              height={112}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[28px] font-black leading-none tracking-[0.02em] text-white">
              {settings.shortName || "BIHUBA"}
            </span>
            <span className="mt-1 block truncate text-sm font-bold leading-5 tracking-normal text-cyan-100">
              Hội Doanh nghiệp Xã Bình Hưng
            </span>
            <span className="block truncate text-xs font-semibold leading-5 tracking-normal text-blue-100/80">
              Thành phố Hồ Chí Minh
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center justify-self-end overflow-hidden lg:flex">
          <div className="flex min-w-0 flex-nowrap items-center justify-end gap-1.5 pr-24">
            {settings.nav.map((item) => {
              const isContact = item.href === "/lien-he";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-bold tracking-normal transition ${
                    isContact
                      ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                      : "border border-white/10 bg-white/6 text-slate-100 hover:border-cyan-300/35 hover:bg-white/12 hover:text-cyan-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
