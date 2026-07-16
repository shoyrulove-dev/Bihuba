import { PartnerCard } from "@/components/site/partner-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPartners } from "@/lib/content";

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Đối tác"
        title="Mạng lưới đối tác chiến lược"
        body="Trang đối tác giúp cập nhật danh sách liên kết, đơn vị đồng hành và các mối quan hệ hợp tác của hội."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <PartnerCard key={partner.slug} partner={partner} />
        ))}
      </div>
    </div>
  );
}
