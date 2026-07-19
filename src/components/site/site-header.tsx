import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

function splitSiteName(siteName?: string) {
  const fallback = "H\u1ed9i Doanh nghi\u1ec7p X\u00e3 B\u00ecnh H\u01b0ng Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh";
  const value = siteName?.trim() || fallback;

  if (value.includes(" Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh")) {
    return {
      lineOne: value.replace(" Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh", ""),
      lineTwo: "Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh",
    };
  }

  const words = value.split(" ");
  const midpoint = Math.ceil(words.length / 2);

  return {
    lineOne: words.slice(0, midpoint).join(" "),
    lineTwo: words.slice(midpoint).join(" "),
  };
}

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  const nameLines = splitSiteName(settings.siteName);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061934]/96 shadow-[0_18px_55px_rgba(2,12,27,0.18)] backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4 xl:px-7 2xl:px-9">
        <Link
          href="/"
          className="group flex min-h-[58px] w-full min-w-0 items-center gap-2.5 rounded-[1rem] border border-cyan-200/15 bg-gradient-to-r from-white/[0.10] via-cyan-300/[0.05] to-transparent px-3 py-2 shadow-[0_14px_34px_rgba(2,12,27,0.2)] lg:w-[430px] lg:max-w-[430px] lg:shrink-0 xl:w-[455px] xl:max-w-[455px]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-[#09254d] p-1.5 shadow-[0_0_24px_rgba(86,214,255,0.16)]">
            <Image
              src={settings.logoUrl || "/bihuba-mark.svg"}
              alt={settings.shortName || "BIHUBA"}
              width={96}
              height={96}
              className="h-full w-full object-contain"
              priority
            />
          </span>

          <span className="min-w-0 overflow-hidden">
            <span className="block truncate text-[13px] font-black leading-[1.15] tracking-[0.01em] text-white drop-shadow-[0_2px_10px_rgba(86,214,255,0.22)] xl:text-[14px]">
              {settings.shortName || "BIHUBA"} {nameLines.lineOne}
            </span>
            <span className="mt-0.5 block truncate text-[12px] font-semibold leading-[1.15] text-blue-100/85 xl:text-[13px]">
              {nameLines.lineTwo}
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 overflow-visible lg:flex lg:justify-end">
          <div className="ml-auto flex min-w-0 flex-nowrap items-center justify-end gap-1 pr-0">
            {settings.nav.map((item) => {
              const isContact = item.href === "/lien-he";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1.5 text-[10px] font-bold transition xl:px-2.5 xl:text-[10.5px] 2xl:px-3 2xl:text-[11px] ${
                    isContact
                      ? "bg-cyan-300 text-slate-950 shadow-[0_10px_22px_rgba(86,214,255,0.2)] hover:bg-cyan-200"
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
