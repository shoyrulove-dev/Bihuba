import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

function splitSiteName(siteName?: string) {
  const fallback = "Hội Doanh nghiệp Xã Bình Hưng Thành phố Hồ Chí Minh";
  const value = siteName?.trim() || fallback;

  if (value.includes(" Thành phố Hồ Chí Minh")) {
    return {
      lineOne: value.replace(" Thành phố Hồ Chí Minh", ""),
      lineTwo: "Thành phố Hồ Chí Minh",
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
      <div className="flex items-center justify-between gap-5 px-4 py-3 lg:px-6 xl:px-8">
        <Link
          href="/"
          className="group flex h-[78px] w-[430px] shrink-0 items-center gap-3 overflow-hidden rounded-[1.2rem] border border-cyan-200/15 bg-gradient-to-r from-white/[0.10] via-cyan-300/[0.05] to-transparent px-4 py-2 shadow-[0_14px_34px_rgba(2,12,27,0.2)]"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-[#09254d] p-1.5 shadow-[0_0_24px_rgba(86,214,255,0.16)]">
            <Image
              src={settings.logoUrl || "/bihuba-mark.svg"}
              alt={settings.shortName || "BIHUBA"}
              width={96}
              height={96}
              className="h-full w-full object-contain"
              priority
            />
          </span>

          <span className="min-w-0">
            <span className="block text-[20px] font-black leading-none tracking-[0.02em] text-white drop-shadow-[0_2px_10px_rgba(86,214,255,0.22)]">
              {settings.shortName || "BIHUBA"}
            </span>
            <span className="mt-1 block truncate text-[12px] font-bold leading-5 text-cyan-100">
              {nameLines.lineOne}
            </span>
            <span className="block truncate text-[11px] font-semibold leading-4 text-blue-100/85">
              {nameLines.lineTwo}
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-end lg:flex">
          <div className="ml-4 flex min-w-0 flex-nowrap items-center justify-end gap-2">
            {settings.nav.map((item) => {
              const isContact = item.href === "/lien-he";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-bold transition xl:px-4 xl:text-[13px] ${
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
