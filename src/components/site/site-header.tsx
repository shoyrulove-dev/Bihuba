"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const nameLines = splitSiteName(settings.siteName);
  const configuredLogo = settings.logoUrl || "";
  const headerLogo =
    !configuredLogo ||
    configuredLogo.includes("bihuba-mark.svg") ||
    configuredLogo.includes("BIHUBA_Logo_Blue") ||
    configuredLogo.includes("BIHUBA_Logo_Navy")
      ? "/bihuba-logo-glow.png"
      : configuredLogo;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061934]/96 shadow-[0_18px_55px_rgba(2,12,27,0.18)] backdrop-blur">
      <div className="px-4 py-3 xl:px-7 2xl:px-9">
        <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className={`group flex min-w-0 items-center gap-3 rounded-[1.15rem] border border-cyan-200/18 bg-[linear-gradient(110deg,rgba(255,255,255,0.13),rgba(31,111,189,0.10)_58%,rgba(86,214,255,0.03))] px-3 shadow-[0_14px_34px_rgba(2,12,27,0.2)] ${isExpanded ? "min-h-[84px] py-3 lg:w-[590px] lg:max-w-[590px] xl:w-[660px] xl:max-w-[660px]" : "h-14 py-2"}`}
        >
          <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border border-cyan-200/25 bg-[#061934] p-0 shadow-[0_0_30px_rgba(86,214,255,0.26)] ${isExpanded ? "h-16 w-16" : "h-10 w-10"}`}>
            <Image
              src={headerLogo}
              alt={settings.shortName || "BIHUBA"}
              width={96}
              height={96}
              className="h-full w-full object-contain"
              priority
            />
          </span>

          <span className="min-w-0 overflow-hidden">
            <span className={`brand-line-bihuba block truncate font-black leading-[1] tracking-[0.02em] ${isExpanded ? "text-[23px] xl:text-[26px]" : "text-[18px]"}`}>
              {settings.shortName || "BIHUBA"}
            </span>
            <span className={`brand-line-silver mt-1 block truncate font-black leading-[1.12] ${isExpanded ? "text-[13px] xl:text-[15px]" : "text-[11px]"}`}>
              {nameLines.lineOne}
            </span>
            <span className={`${isExpanded ? "brand-line-silver mt-1 block truncate text-[13px] font-black leading-[1.12] xl:text-[15px]" : "hidden"}`}>
              {nameLines.lineTwo}
            </span>
            {isExpanded && settings.slogan ? (
              <span className="brand-line-cyan mt-1.5 block truncate text-[12px] font-black uppercase leading-[1.1] tracking-[0.12em] xl:text-[13px]">
                {settings.slogan}
              </span>
            ) : null}
          </span>
        </Link>
        <button type="button" onClick={() => setIsExpanded((current) => !current)} aria-expanded={isExpanded} aria-controls="site-navigation" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-cyan-200/25 bg-white/8 px-4 text-xs font-semibold text-cyan-100 transition hover:bg-white/14">
          {isExpanded ? "Thu gọn" : "Menu"}<span className="text-base leading-none">{isExpanded ? "⌃" : "⌄"}</span>
        </button>
        </div>

        {isExpanded ? <nav id="site-navigation" className="mt-3 min-w-0 overflow-visible">
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2.5">
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
            <Link
              href="/dang-ky-hoi-vien"
              className="shrink-0 whitespace-nowrap rounded-full border border-cyan-200/35 bg-cyan-300 px-3 py-2 text-[11px] font-black text-slate-950 shadow-[0_10px_22px_rgba(86,214,255,0.24)] transition hover:bg-cyan-200 xl:text-[12px]"
            >
              Đăng ký hội viên ngay
            </Link>
            <GoogleTranslate />
          </div>
        </nav> : null}
      </div>
    </header>
  );
}
