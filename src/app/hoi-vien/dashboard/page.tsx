import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdminUser } from "@/lib/auth";
import { getEkycByUserId } from "@/lib/ekyc";

export const dynamic = "force-dynamic";

export default async function MemberDashboardPage() {
  const session = await getCurrentAdminUser();
  if (!session || session.role !== "business") redirect("/admin/login?next=/hoi-vien/dashboard");
  const application = await getEkycByUserId(session.userId);
  if (!application) redirect("/dang-ky-hoi-vien");
  const approved = application.status === "approved";
  return <div className="mx-auto max-w-5xl px-6 py-12"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Member Dashboard</p><h1 className="mt-3 text-3xl font-semibold text-slate-950">Xin chào, {session.name}</h1><section className={`mt-8 rounded-[2rem] border p-6 sm:p-8 ${approved ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}><p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Trạng thái E-KYC</p><h2 className="mt-2 text-2xl font-semibold text-slate-950">{approved ? "Hồ sơ đã được tự động xác thực" : "Hồ sơ đang chờ kiểm tra"}</h2><p className="mt-3 max-w-2xl text-slate-600">{approved ? "Trang doanh nghiệp của bạn đã được tạo. Bạn có thể tiếp tục cập nhật nội dung giới thiệu hoặc gửi bài viết." : application.reportReason || "Hệ thống đã ghi nhận hồ sơ và sẽ thông báo khi có kết quả."}</p>{approved && application.memberId ? <Link href="/hoi-vien" className="mt-5 inline-flex rounded-full bg-[#0E4FAF] px-5 py-3 text-sm font-semibold text-white">Xem danh bạ doanh nghiệp</Link> : null}</section></div>;
}
