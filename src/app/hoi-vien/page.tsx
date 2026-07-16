import { MemberLogoMarquee } from "@/components/site/member-logo-marquee";
import { MemberCard } from "@/components/site/member-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getMembers } from "@/lib/content";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Hội viên"
        title="Danh bạ hội viên BIHUBA"
        body="Dùng cho hội viên doanh nghiệp, hội viên cá nhân và các hội/câu lạc bộ thành viên."
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
