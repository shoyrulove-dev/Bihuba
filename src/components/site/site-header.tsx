"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoogleTranslate } from "@/components/site/google-translate";
import { SiteSettingsShape } from "@/types/cms";

function splitSiteName(siteName?: string) {
  const value = siteName?.trim() || "Hội Doanh nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh";
  if (value.includes(" Thành phố Hồ Chí Minh")) return { lineOne: value.replace(" Thành phố Hồ Chí Minh", ""), lineTwo: "Thành phố Hồ Chí Minh" };
  const words = value.split(" "); const midpoint = Math.ceil(words.length / 2);
  return { lineOne: words.slice(0, midpoint).join(" "), lineTwo: words.slice(midpoint).join(" ") };
}

export function SiteHeader({ settings }: { settings: SiteSettingsShape }) {
  const [isOpen, setIsOpen] = useState(true); const nameLines = splitSiteName(settings.siteName);
  const configuredLogo = settings.logoUrl || "";
  const headerLogo = !configuredLogo || configuredLogo.includes("bihuba-mark.svg") || configuredLogo.includes("BIHUBA_Logo_Blue") || configuredLogo.includes("BIHUBA_Logo_Navy") ? "/bihuba-logo-glow.png" : configuredLogo;
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061934]/96 shadow-[0_18px_55px_rgba(2,12,27,0.18)] backdrop-blur">
    {isOpen ? <div className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-5 xl:px-7 2xl:px-9">
      <Link href="/" className="group flex min-h-[96px] w-full min-w-0 items-center gap-4 rounded-[1.15rem] border border-cyan-200/18 bg-[linear-gradient(110deg,rgba(255,255,255,0.13),rgba(31,111,189,0.10)_58%,rgba(86,214,255,0.03))] px-4 py-3 shadow-[0_14px_34px_rgba(2,12,27,0.2)] lg:w-[590px] lg:max-w-[590px] lg:shrink-0 xl:w-[660px] xl:max-w-[660px]">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] border border-cyan-200/25 bg-[#061934] shadow-[0_0_30px_rgba(86,214,255,0.26)]"><Image src={headerLogo} alt={settings.shortName || "BIHUBA"} width={96} height={96} className="h-full w-full object-contain" priority /></span>
        <span className="min-w-0 overflow-hidden"><span className="brand-line-bihuba block truncate text-[24px] font-black leading-[1] tracking-[0.02em] xl:text-[28px]">{settings.shortName || "BIHUBA"}</span><span className="brand-line-silver mt-1 block truncate text-[14px] font-black leading-[1.12] xl:text-[16px]">{nameLines.lineOne}</span><span className="brand-line-silver mt-1 block truncate text-[14px] font-black leading-[1.12] xl:text-[16px]">{nameLines.lineTwo}</span>{settings.slogan ? <span className="brand-line-cyan mt-1.5 block truncate text-[12px] font-black uppercase leading-[1.1] tracking-[0.12em] xl:text-[13px]">{settings.slogan}</span> : null}</span>
      </Link>
      <nav className="hidden min-w-0 flex-1 overflow-visible lg:flex lg:justify-end"><div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-2.5 pr-10">{settings.nav.map((item) => <Link key={item.href} href={item.href} className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-bold transition xl:text-[12px] ${item.href === "/lien-he" ? "bg-cyan-300 text-slate-950 shadow-[0_10px_22px_rgba(86,214,255,0.2)] hover:bg-cyan-200" : "border border-white/10 bg-white/6 text-slate-100 hover:border-cyan-300/35 hover:bg-white/12 hover:text-cyan-100"}`}>{item.label}</Link>)}<Link href="/dang-ky-hoi-vien" className="shrink-0 whitespace-nowrap rounded-full border border-cyan-200/35 bg-cyan-300 px-3 py-2 text-[11px] font-black text-slate-950 shadow-[0_10px_22px_rgba(86,214,255,0.24)] transition hover:bg-cyan-200 xl:text-[12px]">Đăng ký hội viên ngay</Link><GoogleTranslate /></div></nav>
    </div> : <div className="h-9" />}
    <button type="button" onClick={() => setIsOpen((value) => !value)} aria-label={isOpen ? "Thu gọn header" : "Mở header"} aria-expanded={isOpen} className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-200/35 bg-[#12314e] text-[11px] leading-none text-cyan-100 transition hover:bg-[#245072]">{isOpen ? "⌃" : "⌄"}</button>
  </header>;
}
