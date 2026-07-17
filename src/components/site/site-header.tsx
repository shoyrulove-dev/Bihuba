import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031634]/95 backdrop-blur">
      <div className="grid min-h-[150px] w-full grid-cols-[clamp(500px,31vw,560px)_minmax(0,1fr)] items-center gap-7 px-6 py-4">
        <Link
          href="/"
          className="flex h-[112px] items-center gap-6 rounded-[2rem] border border-cyan-300/25 bg-gradient-to-r from-[#08244a] via-[#061d3e] to-[#04162f] px-7 shadow-[0_0_0_1px_rgba(103,232,249,0.06),0_22px_50px_rgba(0,0,0,0.22)]"
        >
          <span className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full bg-white p-2 shadow-[0_0_28px_rgba(34,211,238,0.32)]">
            <Image
              src="/bihuba-mark.svg"
              alt={settings.shortName || "BIHUBA"}
              width={128}
              height={128}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[42px] font-black leading-none tracking-[0.06em] text-white drop-shadow-[0_0_14px_rgba(125,211,252,0.45)]">
              {settings.shortName || "BIHUBA"}
            </span>
            <span className="mt-2 block truncate text-[15px] font-extrabold uppercase leading-5 tracking-[0.035em] text-cyan-100">
              Hội Doanh nghiệp Xã Bình Hưng
            </span>
            <span className="block truncate text-sm font-bold uppercase leading-5 tracking-[0.04em] text-blue-100/85">
              Thành phố Hồ Chí Minh
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center justify-end lg:flex">
          <div className="flex min-w-0 flex-nowrap items-center justify-end gap-2">
            {settings.nav.map((item) => {
              const isContact = item.href === "/lien-he";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-[clamp(10px,0.75vw,16px)] py-2.5 text-[clamp(13px,0.82vw,15px)] font-extrabold tracking-normal shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition ${
                    isContact
                      ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                      : "border border-white/12 bg-white/7 text-slate-100 hover:border-cyan-300/35 hover:bg-white/12 hover:text-cyan-100"
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
