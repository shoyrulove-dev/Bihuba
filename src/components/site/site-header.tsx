import Image from "next/image";
import Link from "next/link";
import { GoogleTranslate } from "@/components/site/google-translate";
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
      <div className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-5 xl:px-7 2xl:px-9">
        <Link
          href="/"
          className="group flex min-h-[86px] w-full min-w-0 items-center gap-3 rounded-[1.15rem] border border-cyan-200/15 bg-gradient-to-r from-white/[0.10] via-cyan-300/[0.05] to-transparent px-4 py-3 shadow-[0_14px_34px_rgba(2,12,27,0.2)] lg:w-[560px] lg:max-w-[560px] lg:shrink-0 xl:w-[620px] xl:max-w-[620px]"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-[#09254d] p-2 shadow-[0_0_24px_rgba(86,214,255,0.16)]">
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
            <span className="block truncate text-[20px] font-black leading-[1] tracking-[0.02em] text-white drop-shadow-[0_2px_10px_rgba(86,214,255,0.22)] xl:text-[24px]">
              {settings.shortName || "BIHUBA"}
            </span>
            <span className="mt-1 block truncate text-[12px] font-bold leading-[1.1] text-white/95 xl:text-[14px]">
              {nameLines.lineOne}
            </span>
            <span className="mt-1 block truncate text-[12px] font-bold leading-[1.1] text-blue-100/90 xl:text-[14px]">
              {nameLines.lineTwo}
            </span>
            {settings.slogan ? (
              <span className="mt-1 block truncate text-[10px] font-black uppercase leading-[1.1] tracking-[0.1em] text-cyan-300 xl:text-[11px]">
                {settings.slogan}
              </span>
            ) : null}
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 overflow-visible lg:flex lg:justify-end">
          <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-2 pr-0">
            {settings.nav.map((item) => {
              const isContact = item.href === "/lien-he";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-bold transition xl:text-[12px] ${
                    isContact
                      ? "bg-cyan-300 text-slate-950 shadow-[0_10px_22px_rgba(86,214,255,0.2)] hover:bg-cyan-200"
                      : "border border-white/10 bg-white/6 text-slate-100 hover:border-cyan-300/35 hover:bg-white/12 hover:text-cyan-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <GoogleTranslate />
          </div>
        </nav>
      </div>
    </header>
  );
}
