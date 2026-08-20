import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { getDownloads, getMembers, getPartners, getPosts } from "@/lib/content";
import { getOperationsSummary } from "@/lib/operations";

function Badge({ demo = false }: { demo?: boolean }) {
  return <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${demo ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{demo ? "Demo" : "Dữ liệu thật"}</span>;
}

function MiniIcon({ type }: { type: "members" | "business" | "rfq" | "events" }) {
  const paths = {
    members: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3 20a6 6 0 0 1 12 0M15 20a4 4 0 0 1 6 0" /></>,
    business: <><path d="M4 21V5h10v16M14 10h6v11M7 8h4M7 12h4M7 16h4M16 13h2M16 17h2" /></>,
    rfq: <><path d="M5 4h14v16H5zM8 8h8M8 12h5M8 16h7" /><path d="m15 14 2 2 3-4" /></>,
    events: <><path d="M5 6h14v14H5zM8 3v6M16 3v6M5 10h14" /></>,
  };
  return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">{paths[type]}</svg>;
}

const demoActivity = [18, 24, 21, 34, 29, 43, 37, 52, 46, 59, 55, 71];
const activityPoints = demoActivity.map((value, index) => `${24 + index * 48},${154 - value * 1.7}`).join(" ");

export default async function AdminDashboardPage() {
  await requireAdminPage("/admin");
  const [posts, members, partners, downloads, operations] = await Promise.all([
    getPosts(undefined, { includeUnpublished: true }),
    getMembers(),
    getPartners(),
    getDownloads(),
    getOperationsSummary(),
  ]);

  const businesses = members.filter((member) => member.memberType === "business");
  const events = posts.filter((post) => post.type === "event");
  const memberTypes = [
    { label: "Doanh nghiệp", value: businesses.length, color: "#1769e8" },
    { label: "Cá nhân", value: members.filter((member) => member.memberType === "individual").length, color: "#28b8df" },
    { label: "Hội / CLB", value: members.filter((member) => member.memberType === "club").length, color: "#8bdcf1" },
  ];
  const memberTotal = Math.max(1, memberTypes.reduce((sum, item) => sum + item.value, 0));
  const firstPercent = Math.round((memberTypes[0].value / memberTotal) * 100);
  const secondPercent = Math.round((memberTypes[1].value / memberTotal) * 100);
  const donut = `conic-gradient(#1769e8 0 ${firstPercent}%, #28b8df ${firstPercent}% ${firstPercent + secondPercent}%, #8bdcf1 ${firstPercent + secondPercent}% 100%)`;

  const industryMap = new Map<string, number>();
  members.forEach((member) => {
    const industry = member.industry?.trim() || "Chưa phân loại";
    industryMap.set(industry, (industryMap.get(industry) || 0) + 1);
  });
  const industries = Array.from(industryMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxIndustry = Math.max(1, ...industries.map((item) => item[1]));

  const kpis = [
    { label: "Hội viên", value: members.length, note: "Hồ sơ đang quản lý", href: "/admin/members", type: "members" as const, demo: false },
    { label: "Doanh nghiệp", value: businesses.length, note: `${partners.length} đối tác đồng hành`, href: "/admin/members", type: "business" as const, demo: false },
    { label: "Yêu cầu RFQ", value: operations.rfqTotal, note: `${operations.rfqMatched} yêu cầu đã ghép`, href: "/admin/rfqs", type: "rfq" as const, demo: false },
    { label: "Sự kiện", value: events.length, note: `${posts.length} bài viết & sự kiện`, href: "/admin/posts", type: "events" as const, demo: false },
  ];

  return <AdminShell title="Bảng điều hành BIHUBA" description="Theo dõi hội viên, nội dung và các mô-đun giao thương trong một màn hình tổng quan.">
    <section className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((item) => <Link key={item.label} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"><div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-semibold text-slate-600">{item.label}</p><Badge demo={item.demo} /></div><p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{item.value.toLocaleString("vi-VN")}</p><p className="mt-2 text-xs text-slate-500">{item.note}</p></div><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1769e8] transition group-hover:bg-[#1769e8] group-hover:text-white"><MiniIcon type={item.type} /></span></div></Link>)}
    </section>

    <section className="grid min-w-0 gap-5 lg:grid-cols-12">
      <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.045)] sm:p-6 lg:col-span-8"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2"><h2 className="text-base font-semibold text-slate-900">Hoạt động hội viên theo tháng</h2><Badge demo /></div><p className="mt-1 text-xs text-slate-500">Bố cục sẵn sàng kết nối dữ liệu đăng nhập, RFQ và tương tác thực tế.</p></div><select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"><option>12 tháng gần nhất</option></select></div><div className="mt-5 overflow-hidden rounded-xl bg-[linear-gradient(180deg,#f8fbff,#ffffff)] p-3"><svg viewBox="0 0 580 180" className="h-[210px] w-full" preserveAspectRatio="none"><defs><linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1769e8" stopOpacity="0.25" /><stop offset="1" stopColor="#1769e8" stopOpacity="0" /></linearGradient></defs>{[35,75,115,155].map((y) => <line key={y} x1="20" y1={y} x2="565" y2={y} stroke="#e8eef6" strokeWidth="1" />)}<polygon points={`24,165 ${activityPoints} 552,165`} fill="url(#activityFill)" /><polyline points={activityPoints} fill="none" stroke="#1769e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />{activityPoints.split(" ").map((point) => { const [cx, cy] = point.split(","); return <circle key={point} cx={cx} cy={cy} r="3.5" fill="white" stroke="#1769e8" strokeWidth="2" />; })}</svg><div className="grid grid-cols-6 gap-1 text-center text-[10px] text-slate-400 sm:grid-cols-12">{["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"].map((month) => <span key={month}>{month}</span>)}</div></div></article>

      <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.045)] sm:p-6 lg:col-span-4"><div className="flex items-center justify-between"><div><h2 className="text-base font-semibold text-slate-900">Cơ cấu hội viên</h2><p className="mt-1 text-xs text-slate-500">Theo hồ sơ hiện có</p></div><Badge /></div><div className="mt-7 flex flex-col items-center gap-7 sm:flex-row lg:flex-col 2xl:flex-row"><div className="relative h-40 w-40 shrink-0 rounded-full" style={{ background: donut }}><div className="absolute inset-[25px] flex flex-col items-center justify-center rounded-full bg-white"><span className="text-2xl font-semibold text-slate-900">{members.length}</span><span className="text-[10px] uppercase tracking-wide text-slate-400">Tổng hồ sơ</span></div></div><div className="w-full space-y-3">{memberTypes.map((item) => <div key={item.label} className="flex items-center justify-between gap-3 text-sm"><span className="flex min-w-0 items-center gap-2 text-slate-600"><i className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /><span className="truncate">{item.label}</span></span><strong className="text-slate-900">{item.value}</strong></div>)}</div></div></article>
    </section>

    <section className="grid min-w-0 gap-5 lg:grid-cols-12">
      <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.045)] sm:p-6 lg:col-span-5"><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold text-slate-900">Hội viên mới cập nhật</h2><p className="mt-1 text-xs text-slate-500">Danh bạ doanh nghiệp</p></div><Link href="/admin/members" className="text-xs font-semibold text-[#1769e8]">Xem tất cả →</Link></div><div className="mt-4 divide-y divide-slate-100">{members.slice(0, 5).map((member) => <Link href={`/admin/members?mode=edit&edit=${member._id}`} key={member._id || member.slug} className="flex items-center gap-3 py-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-[#1769e8]">{member.name.slice(0, 1)}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-slate-800">{member.name}</span><span className="mt-1 block truncate text-xs text-slate-500">{member.industry || "Chưa cập nhật lĩnh vực"}</span></span><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">Đã ghi nhận</span></Link>)}{!members.length ? <p className="py-8 text-center text-sm text-slate-500">Chưa có hồ sơ hội viên.</p> : null}</div></article>

      <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.045)] sm:p-6 lg:col-span-4"><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold text-slate-900">Trung tâm tài liệu</h2><p className="mt-1 text-xs text-slate-500">Tài liệu mới nhất</p></div><Link href="/admin/downloads" className="text-xs font-semibold text-[#1769e8]">Quản lý →</Link></div><div className="mt-4 divide-y divide-slate-100">{downloads.slice(0, 5).map((document) => <Link href={`/admin/downloads?mode=edit&edit=${document._id}`} key={document._id || document.slug} className="flex items-center gap-3 py-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[10px] font-bold uppercase text-red-600">{document.fileFormat || "PDF"}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-slate-800">{document.title}</span><span className="mt-1 block truncate text-xs text-slate-500">{document.category}</span></span></Link>)}{!downloads.length ? <p className="py-8 text-center text-sm text-slate-500">Chưa có tài liệu.</p> : null}</div></article>

      <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_7px_22px_rgba(15,23,42,0.045)] sm:p-6 lg:col-span-3"><div className="flex items-center justify-between gap-2"><h2 className="text-base font-semibold text-slate-900">Ngành nổi bật</h2><Badge /></div><div className="mt-5 space-y-4">{industries.map(([industry, count]) => <div key={industry}><div className="flex justify-between gap-3 text-xs"><span className="truncate text-slate-600">{industry}</span><strong className="text-slate-900">{count}</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#1769e8]" style={{ width: `${Math.max(10, Math.round((count / maxIndustry) * 100))}%` }} /></div></div>)}{!industries.length ? <p className="py-8 text-center text-sm text-slate-500">Chưa có dữ liệu ngành.</p> : null}</div></article>
    </section>

    <section className="grid min-w-0 gap-4 md:grid-cols-3"><Link href="/admin/rfqs" className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><p className="font-semibold text-slate-900">RFQ đã ghép nối</p><Badge /></div><p className="mt-3 text-3xl font-semibold text-slate-950">{operations.rfqMatched}</p><p className="mt-2 text-xs leading-5 text-slate-600">Theo dõi yêu cầu báo giá và kết quả kết nối doanh nghiệp.</p></Link><Link href="/admin/transactions" className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><p className="font-semibold text-slate-900">Giao dịch B2B</p><Badge /></div><p className="mt-3 text-3xl font-semibold text-slate-950">{operations.transactionTotal}</p><p className="mt-2 text-xs leading-5 text-slate-600">Doanh thu ghi nhận: {operations.paidAmount.toLocaleString("vi-VN")} đ.</p></Link><Link href="/admin/notifications" className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><p className="font-semibold text-slate-900">Thông báo đã đọc</p><Badge /></div><p className="mt-3 text-3xl font-semibold text-slate-950">{operations.readNotifications}/{operations.notificationTotal}</p><p className="mt-2 text-xs leading-5 text-slate-600">Sẵn sàng nhận trạng thái từ webhook Zalo OA.</p></Link></section>
  </AdminShell>;
}
