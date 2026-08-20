import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentMemberUser } from "@/lib/auth";
import { getEkycByUserId } from "@/lib/ekyc";

export const dynamic = "force-dynamic";

export default async function MemberDashboardPage() {
  const session = await getCurrentMemberUser();
  if (!session) redirect("/hoi-vien/dang-nhap");
  const application = await getEkycByUserId(session.userId);
  if (!application) redirect("/dang-ky-hoi-vien");
  const approved = application.status === "approved";

  return (
    <div className="min-h-[70vh] bg-[#f7f9fc] py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Khu vực hội viên · BIHUBA</p><h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Xin chào, {session.name}</h1><p className="mt-3 max-w-2xl text-slate-600">Nơi Quý doanh nghiệp theo dõi hồ sơ hội viên và nhận hỗ trợ từ BIHUBA.</p></div>
          <form action="/api/member-auth/logout" method="post"><button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700">Đăng xuất</button></form>
        </div>

        <section className={`mt-8 rounded-[2rem] border p-6 sm:p-8 ${approved ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">Tình trạng hồ sơ</p><h2 className="mt-2 text-2xl font-semibold text-slate-950">{approved ? "Hồ sơ đã được xác nhận" : "Hồ sơ cần được xem thêm"}</h2><p className="mt-3 max-w-3xl leading-7 text-slate-600">{approved ? "Thông tin doanh nghiệp của Quý hội viên đã được ghi nhận. Quý doanh nghiệp có thể theo dõi hồ sơ và liên hệ BIHUBA khi cần hỗ trợ." : application.reportReason || "BIHUBA đã nhận được hồ sơ. Văn phòng Hội sẽ liên hệ khi cần bổ sung thông tin."}</p></div><span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${approved ? "bg-emerald-600 text-white" : "bg-amber-500 text-slate-950"}`}>{approved ? "Đã xác nhận" : "Đang xem xét"}</span></div>
        </section>

        <section className="mt-7 grid gap-5 md:grid-cols-3">
          <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">Hồ sơ doanh nghiệp</p><h2 className="mt-3 text-xl font-semibold text-slate-950">{application.companyName}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{application.industry} · MST {application.taxCode}</p><Link href="/hoi-vien" className="mt-5 inline-flex text-sm font-semibold text-[#0E4FAF]">Xem danh bạ →</Link></article>
          <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">Quyền hội viên</p><h2 className="mt-3 text-xl font-semibold text-slate-950">Khu vực tách biệt</h2><p className="mt-2 text-sm leading-6 text-slate-600">Chỉ xem trạng thái E-KYC, thông tin hồ sơ và kênh hỗ trợ. Không truy cập hoặc chỉnh sửa dữ liệu quản trị.</p></article>
          <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">Hỗ trợ vận hành</p><h2 className="mt-3 text-xl font-semibold text-slate-950">Cần cập nhật thông tin?</h2><p className="mt-2 text-sm leading-6 text-slate-600">Liên hệ văn phòng BIHUBA để cập nhật hồ sơ pháp lý, logo hoặc giấy tờ xác thực.</p><Link href="/lien-he" className="mt-5 inline-flex text-sm font-semibold text-[#0E4FAF]">Liên hệ BIHUBA →</Link></article>
        </section>
      </div>
    </div>
  );
}
