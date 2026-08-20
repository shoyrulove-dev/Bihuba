"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoogleTranslate } from "@/components/site/google-translate";
import { SiteSettingsShape } from "@/types/cms";

function splitSiteName(siteName?: string) {
  const value = siteName?.trim() || "Hội Doanh nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh";
  const city = " Thành phố Hồ Chí Minh";

  if (value.includes(city)) return { lineOne: value.replace(city, ""), lineTwo: city.trim() };

  const words = value.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return { lineOne: words.slice(0, midpoint).join(" "), lineTwo: words.slice(midpoint).join(" ") };
}

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nameLines = splitSiteName(settings.siteName);
  const configuredLogo = settings.logoUrl || "";
  const headerLogo = !configuredLogo || configuredLogo.includes("bihuba-mark.svg") || configuredLogo.includes("BIHUBA_Logo_Blue") || configuredLogo.includes("BIHUBA_Logo_Navy") ? "/bihuba-logo-glow.png" : configuredLogo;

  const navigationItems = settings.nav.map((item) => (
    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-center text-[11px] font-bold transition xl:text-[12px] ${item.href === "/lien-he" ? "bg-cyan-300 text-slate-950 shadow-[0_10px_22px_rgba(86,214,255,0.2)] hover:bg-cyan-200" : "border border-white/10 bg-white/6 text-slate-100 hover:border-cyan-300/35 hover:bg-white/12 hover:text-cyan-100"}`}>
      {item.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061934]/96 shadow-[0_18px_55px_rgba(2,12,27,0.18)] backdrop-blur">
      {isOpen ? (
        <div className="relative flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-5 xl:px-7 2xl:px-9">
          <Link href="/" className="group flex min-h-[96px] w-full min-w-0 items-center gap-4 rounded-[1.15rem] border border-cyan-200/18 bg-[linear-gradient(110deg,rgba(255,255,255,0.13),rgba(31,111,189,0.10)_58%,rgba(86,214,255,0.03))] px-4 py-3 pr-11 shadow-[0_14px_34px_rgba(2,12,27,0.2)] lg:w-[590px] lg:max-w-[590px] lg:shrink-0 lg:pr-4 xl:w-[660px] xl:max-w-[660px]">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] border border-cyan-200/25 bg-[#061934] shadow-[0_0_30px_rgba(86,214,255,0.26)]">
              <Image src={headerLogo} alt={settings.shortName || "BIHUBA"} width={96} height={96} className="h-full w-full object-contain" priority />
            </span>
            <span className="min-w-0 overflow-hidden">
              <span className="brand-line-bihuba block truncate text-[24px] font-black leading-[1] tracking-[0.02em] xl:text-[28px]">{settings.shortName || "BIHUBA"}</span>
              <span className="brand-line-silver mt-1 block truncate text-[14px] font-black leading-[1.12] xl:text-[16px]">{nameLines.lineOne}</span>
              <span className="brand-line-silver mt-1 block truncate text-[14px] font-black leading-[1.12] xl:text-[16px]">{nameLines.lineTwo}</span>
              {settings.slogan ? <span className="brand-line-cyan mt-1.5 block truncate text-[12px] font-black uppercase leading-[1.1] tracking-[0.12em] xl:text-[13px]">{settings.slogan}</span> : null}
            </span>
          </Link>

          <button type="button" onClick={() => setIsMobileMenuOpen((value) => !value)} aria-label="Mở menu điều hướng" aria-expanded={isMobileMenuOpen} className="absolute right-8 top-5 inline-flex h-7 w-7 items-center justify-center rounded-md border border-cyan-200/20 text-sm text-cyan-100 transition hover:bg-white/10 lg:hidden"><span aria-hidden="true">☰</span></button>

          <nav className="hidden min-w-0 flex-1 overflow-visible lg:flex lg:justify-end">
            <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-2.5">{navigationItems}<Link href="/dang-ky-hoi-vien" className="shrink-0 whitespace-nowrap rounded-full border border-cyan-200/35 bg-cyan-300 px-3 py-2 text-[11px] font-black text-slate-950 shadow-[0_10px_22px_rgba(86,214,255,0.24)] transition hover:bg-cyan-200 xl:text-[12px]">Đăng ký hội viên ngay</Link><div className="flex shrink-0 items-center gap-2"><GoogleTranslate /><button type="button" onClick={() => setIsOpen(false)} aria-label="Thu gọn header" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-200/30 bg-white/5 text-lg leading-none text-cyan-100 shadow-[0_8px_20px_rgba(2,12,27,0.25)] transition hover:border-cyan-200/60 hover:bg-white/12 hover:text-white">⌃</button></div></div>
          </nav>

          <nav className={`${isMobileMenuOpen ? "grid" : "hidden"} grid-cols-2 gap-2 rounded-xl border border-white/10 bg-[#0b2543] p-3 shadow-xl lg:hidden`} aria-label="Điều hướng di động">
            {navigationItems}
            <Link href="/dang-ky-hoi-vien" onClick={() => setIsMobileMenuOpen(false)} className="col-span-2 rounded-full bg-cyan-300 px-3 py-2.5 text-center text-[12px] font-black text-slate-950 shadow-[0_10px_22px_rgba(86,214,255,0.24)]">Đăng ký hội viên ngay</Link>
            <div className="col-span-2 flex justify-center pt-1"><GoogleTranslate /></div>
          </nav>
        </div>
      ) : <div className="h-5" />}

      {isOpen ? <button type="button" onClick={() => setIsOpen(false)} aria-label="Thu gọn header" className="absolute right-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-cyan-200/20 text-lg leading-none text-cyan-100 transition hover:bg-white/10 lg:hidden">⌃</button> : <button type="button" onClick={() => setIsOpen(true)} aria-label="Mở header" className="absolute right-2 top-0 z-10 inline-flex h-5 w-7 items-center justify-center text-base leading-none text-cyan-100/90 transition hover:text-white">⌄</button>}
    </header>
  );
}
