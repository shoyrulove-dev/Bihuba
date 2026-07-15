import { notFound } from "next/navigation";
import { getMemberBySlug } from "@/lib/content";

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        {member.groupType}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
        {member.name}
      </h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">{member.description}</p>
      <div className="mt-10 grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 md:grid-cols-2">
        <p><strong>Lĩnh vực:</strong> {member.industry}</p>
        <p><strong>Địa chỉ:</strong> {member.address}</p>
        <p><strong>Điện thoại:</strong> {member.phone}</p>
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Website:</strong> {member.website}</p>
        <p><strong>Loại:</strong> {member.memberType}</p>
      </div>
    </div>
  );
}
