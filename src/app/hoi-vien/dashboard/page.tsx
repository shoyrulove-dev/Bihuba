import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentMemberUser } from "@/lib/auth";
import { getEkycByUserId } from "@/lib/ekyc";
import { MemberModel } from "@/models/member";
import { MemberDashboardClient } from "@/components/site/member-dashboard-client";

export const dynamic = "force-dynamic";

export default async function MemberDashboardPage() {
  const session = await getCurrentMemberUser();
  if (!session) redirect("/hoi-vien/dang-nhap");

  const application = await getEkycByUserId(session.userId);
  if (!application) redirect("/dang-ky-hoi-vien");

  const member = application.memberId ? await MemberModel.findById(application.memberId).lean() : null;
  const profile = member ? (JSON.parse(JSON.stringify(member)) as Record<string, string>) : null;
  const approved = application.status === "approved";

  return (
    <main className="min-h-[70vh] bg-[#f5f8fc] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1769e8]">Khu vực hội viên · BIHUBA</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">Xin chào, {session.name}</h1>
            <p className="mt-1 text-sm text-slate-500">Quản lý hồ sơ doanh nghiệp, bảo mật tài khoản và các công cụ B2B tại một nơi.</p>
          </div>
          <div className="flex items-center gap-3">
            {profile?.slug ? <Link href={`/hoi-vien/${profile.slug}`} target="_blank" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">Xem trang công khai ↗</Link> : null}
            <form action="/api/member-auth/logout" method="post"><button className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">Đăng xuất</button></form>
          </div>
        </header>

        {profile ? (
          <MemberDashboardClient
            profile={profile}
            taxCode={String(application.taxCode || "")}
            applicationStatus={String(application.status || "")}
            certificateUrl={String(application.certificateUrl || "")}
          />
        ) : (
          <section className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${approved ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">Tình trạng hồ sơ</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">{approved ? "Hồ sơ đang được khởi tạo" : "Hồ sơ đang được xem xét"}</h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">{approved ? "BIHUBA đang hoàn thiện trang doanh nghiệp của Quý hội viên. Vui lòng quay lại sau ít phút." : application.reportReason || "Văn phòng Hội sẽ liên hệ nếu cần bổ sung thông tin."}</p>
              </div>
              <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${approved ? "bg-emerald-600 text-white" : "bg-amber-400 text-slate-950"}`}>{approved ? "Đã xác nhận" : "Đang xem xét"}</span>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
