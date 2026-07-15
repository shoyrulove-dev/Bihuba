import Link from "next/link";
import { SiteSettingsShape } from "@/types/cms";

export function SiteFooter({ settings }: { settings: SiteSettingsShape }) {
  return (
    <footer className="border-t border-cyan-300/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
            {settings.shortName}
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-white">
            {settings.siteName}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {settings.introBody}
          </p>
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
  );
}
