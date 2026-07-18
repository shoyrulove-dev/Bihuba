import { MemberLogoMarquee } from "@/components/site/member-logo-marquee";
import { MemberCard } from "@/components/site/member-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getMembers } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow={"H\u1ed9i vi\u00ean"}
        title={"Danh b\u1ea1 h\u1ed9i vi\u00ean BIHUBA"}
        body={"Kh\u00f4ng gian gi\u1edbi thi\u1ec7u h\u1ed9i vi\u00ean doanh nghi\u1ec7p, h\u1ed9i vi\u00ean c\u00e1 nh\u00e2n v\u00e0 c\u00e1c h\u1ed9i, c\u00e2u l\u1ea1c b\u1ed9 th\u00e0nh vi\u00ean \u0111ang \u0111\u1ed3ng h\u00e0nh c\u00f9ng BIHUBA."}
      />
      <MemberLogoMarquee members={members} />
      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.slug} member={member} />
        ))}
      </div>
    </div>
  );
}
