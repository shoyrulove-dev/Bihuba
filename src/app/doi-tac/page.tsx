import { PartnerCard } from "@/components/site/partner-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getPartners } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow={"\u0110\u1ed1i t\u00e1c"}
        title={"M\u1ea1ng l\u01b0\u1edbi \u0111\u1ed1i t\u00e1c chi\u1ebfn l\u01b0\u1ee3c"}
        body={"Danh s\u00e1ch c\u00e1c \u0111\u01a1n v\u1ecb li\u00ean k\u1ebft, doanh nghi\u1ec7p \u0111\u1ed3ng h\u00e0nh v\u00e0 \u0111\u1ed1i t\u00e1c chi\u1ebfn l\u01b0\u1ee3c \u0111ang k\u1ebft n\u1ed1i c\u00f9ng BIHUBA."}
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {partners.map((partner) => (
          <PartnerCard key={partner.slug} partner={partner} />
        ))}
      </div>
    </div>
  );
}
