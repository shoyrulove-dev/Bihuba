import Image from "next/image";
import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";
import { SupportersMarquee } from "@/components/site/supporters-marquee";

export function SiteFooter({ settings }: { settings: SiteSettingsShape }) {
  return (
    <>
      <SupportersMarquee items={settings.supporterCompanies || []} />
      <footer className="border-t border-cyan-300/10 bg-[#031634]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-22 w-22 shrink-0 items-center justify-center rounded-[1.75rem] bg-white/8 p-3">
                <Image
                  src={settings.logoUrl || "/bihuba-mark.svg"}
                  alt="BIHUBA"
                  width={112}
                  height={112}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                  {settings.shortName}
                </p>
                <p className="mt-1 text-sm text-slate-300">{settings.slogan}</p>
              </div>
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-white">{settings.siteName}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{settings.introBody}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
              Điều hướng
            </h4>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {settings.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-200 transition hover:text-cyan-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
              Liên hệ
            </h4>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              <p>{settings.contact.address}</p>
              <p>{settings.contact.phone}</p>
              <p>{settings.contact.email}</p>
              {settings.contact.website ? <p>{settings.contact.website}</p> : null}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
