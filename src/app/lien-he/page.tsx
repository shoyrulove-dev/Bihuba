import { SectionHeading } from "@/components/site/section-heading";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

function getMapSrc(mapUrl?: string, address?: string) {
  if (mapUrl?.trim()) {
    const iframeSrc = mapUrl.match(/src=["']([^"']+)["']/)?.[1];
    return iframeSrc || mapUrl.trim();
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(address || "Binh Hung, Ho Chi Minh City")}&output=embed`;
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mapSrc = getMapSrc(settings.contact.googleMapUrl, settings.contact.address);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        eyebrow="Liên hệ"
        title="Văn phòng BIHUBA"
        body="Thông tin liên hệ chính thức của BIHUBA dành cho hội viên, đối tác và khách mời cần kết nối."
      />

      <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
        {settings.contact.officeImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={settings.contact.officeImageUrl}
            alt="Văn phòng BIHUBA"
            className="aspect-[16/7] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[16/7] w-full items-center justify-center bg-[#061a39] px-6 text-center text-xl font-bold text-white">
            {settings.siteName}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
          <div className="space-y-5 text-base leading-7 text-slate-700">
            <p>
              <strong className="block text-sm uppercase tracking-[0.16em] text-cyan-700">Địa chỉ</strong>
              {settings.contact.address}
            </p>
            <p>
              <strong className="block text-sm uppercase tracking-[0.16em] text-cyan-700">Điện thoại</strong>
              {settings.contact.phone}
            </p>
            <p>
              <strong className="block text-sm uppercase tracking-[0.16em] text-cyan-700">Email</strong>
              {settings.contact.email}
            </p>
            {settings.contact.website ? (
              <p>
                <strong className="block text-sm uppercase tracking-[0.16em] text-cyan-700">Website</strong>
                {settings.contact.website}
              </p>
            ) : null}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
          <iframe
            src={mapSrc}
            title="Bản đồ văn phòng BIHUBA"
            className="h-[360px] w-full lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
