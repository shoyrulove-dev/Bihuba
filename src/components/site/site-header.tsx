import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061934]/96 shadow-[0_18px_55px_rgba(2,12,27,0.18)] backdrop-blur">
      <div className="grid w-full grid-cols-[minmax(320px,500px)_minmax(0,1fr)] items-center gap-6 px-10 py-3 xl:gap-10">
        <Link
          href="/"
          className="group flex min-h-[76px] w-full items-center gap-4 overflow-hidden rounded-[1.35rem] border border-cyan-200/15 bg-gradient-to-r from-white/[0.10] via-cyan-300/[0.06] to-transparent px-4 py-2 shadow-[0_14px_34px_rgba(2,12,27,0.2)]"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/25 bg-[#09254d] p-1.5 shadow-[0_0_28px_rgba(86,214,255,0.18)]">
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
            <span className="block text-[26px] font-black leading-none tracking-[0.03em] text-white drop-shadow-[0_2px_10px_rgba(86,214,255,0.22)]">
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
          <div className="flex min-w-0 flex-nowrap items-center justify-end gap-2">
            {settings.nav.map((item) => {
              const isContact = item.href === "/lien-he";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-bold tracking-normal transition xl:px-3.5 xl:text-sm ${
                    isContact
                      ? "bg-cyan-300 text-slate-950 shadow-[0_10px_26px_rgba(86,214,255,0.22)] hover:bg-cyan-200"
                      : "border border-white/10 bg-white/7 text-slate-100 hover:border-cyan-300/35 hover:bg-white/12 hover:text-cyan-100"
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
