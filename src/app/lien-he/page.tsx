import { SectionHeading } from "@/components/site/section-heading";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading
        eyebrow="Liên hệ"
        title="Văn phòng BIHUBA"
        body="Thông tin liên hệ chính thức của BIHUBA dành cho hội viên, đối tác và khách mời cần kết nối."
      />
      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
        <div className="space-y-4 text-lg text-slate-700">
          <p>
            <strong>Địa chỉ:</strong> {settings.contact.address}
          </p>
          <p>
            <strong>Điện thoại:</strong> {settings.contact.phone}
          </p>
          <p>
            <strong>Email:</strong> {settings.contact.email}
          </p>
          <p>
            <strong>Website:</strong> {settings.contact.website}
          </p>
        </div>
      </div>
    </div>
  );
}
