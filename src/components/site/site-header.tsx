import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031634]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-3">
        <Link
          href="/"
          className="flex min-w-[260px] shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-white/6 px-3 py-2 shadow-[0_12px_28px_rgba(2,12,27,0.18)]"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-white p-1.5">
            <Image
              src={settings.logoUrl || "/bihuba-mark.svg"}
              alt={settings.shortName || "BIHUBA"}
              width={72}
              height={72}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block text-2xl font-black leading-none tracking-normal text-white">
              {settings.shortName || "BIHUBA"}
            </span>
            <span className="mt-1 block max-w-[260px] truncate text-xs font-semibold leading-5 tracking-normal text-cyan-100">
              Hội Doanh nghiệp Xã Bình Hưng
            </span>
            <span className="block max-w-[260px] truncate text-[11px] font-medium leading-4 tracking-normal text-blue-100/80">
              Thành phố Hồ Chí Minh
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-2 lg:flex">
          {settings.nav.map((item) => {
            const isContact = item.href === "/lien-he";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold tracking-normal transition ${
                  isContact
                    ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                    : "border border-white/10 bg-white/6 text-slate-100 hover:border-cyan-300/35 hover:bg-white/12 hover:text-cyan-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
