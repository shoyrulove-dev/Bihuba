/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Profile = Record<string, string>;
type Tab = "overview" | "profile" | "security";

function CompletionRing({ value }: { value: number }) {
  return <div aria-label={`Hồ sơ hoàn thiện ${value}%`} className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#1769e8 ${value * 3.6}deg, #e7eef8 0deg)` }}><div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-950">{value}%</div></div>;
}

function MiniStat({ label, value, tone = "blue" }: { label: string; value: string; tone?: "blue" | "green" | "amber" }) {
  const styles = { blue: "bg-blue-50 text-[#1769e8]", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700" };
  return <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,.045)]"><span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-sm font-bold ${styles[tone]}`}>{value}</span><p className="mt-3 text-sm font-medium text-slate-600">{label}</p></article>;
}

export function MemberDashboardClient({ profile, taxCode, applicationStatus, certificateUrl }: { profile: Profile; taxCode: string; applicationStatus: string; certificateUrl?: string }) {
  const [values, setValues] = useState(profile);
  const [tab, setTab] = useState<Tab>("overview");
  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const completion = useMemo(() => {
    const fields = ["name", "industry", "address", "phone", "email", "website", "description", "logo", "coverImage", "companyTagline"];
    return Math.round((fields.filter((field) => String(values[field] || "").trim()).length / fields.length) * 100);
  }, [values]);
  const publicProfileHref = values.slug ? `/hoi-vien/${values.slug}` : "/hoi-vien";
  const verified = applicationStatus === "approved";

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    const response = await fetch("/api/member/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const data = await response.json().catch(() => ({}));
    setMessage(data.message || "Không thể cập nhật hồ sơ.");
    setIsSaving(false);
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/member/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: form.get("currentPassword"), nextPassword: form.get("nextPassword") }) });
    const data = await response.json().catch(() => ({}));
    setPasswordMessage(data.message || "Không thể đổi mật khẩu.");
    if (response.ok) event.currentTarget.reset();
  }

  const fields = [["name", "Tên doanh nghiệp"], ["industry", "Lĩnh vực hoạt động"], ["address", "Địa chỉ"], ["phone", "Điện thoại"], ["email", "Email"], ["website", "Website"], ["logo", "Link logo"], ["coverImage", "Link ảnh bìa"], ["introImage", "Link ảnh giới thiệu"], ["companyTagline", "Thông điệp doanh nghiệp"], ["description", "Giới thiệu chi tiết"]] as const;

  return <section>
    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">{[["overview", "Tổng quan"], ["profile", "Hồ sơ doanh nghiệp"], ["security", "Bảo mật & xác minh"]].map(([key, label]) => <button key={key} type="button" onClick={() => setTab(key as Tab)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${tab === key ? "bg-[#1769e8] text-white shadow-[0_8px_18px_rgba(23,105,232,.22)]" : "text-slate-600 hover:bg-white"}`}>{label}</button>)}</div>

    {tab === "overview" ? <div className="mt-6 grid gap-5 xl:grid-cols-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,.045)] xl:col-span-8 sm:p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div className="flex min-w-0 gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#eaf2ff] text-xl font-bold text-[#1769e8]">{values.logo ? <img src={values.logo} alt="Logo doanh nghiệp" className="h-full w-full object-contain p-2" /> : values.name?.slice(0, 1)}</div><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">Trang doanh nghiệp</p><h2 className="mt-1 truncate text-xl font-semibold text-slate-950">{values.name}</h2><p className="mt-1 text-sm text-slate-500">{values.industry || "Cập nhật lĩnh vực hoạt động"} · MST {taxCode}</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setTab("profile")} className="rounded-xl bg-[#1769e8] px-4 py-2 text-sm font-semibold text-white">Cập nhật hồ sơ</button><Link href={publicProfileHref} target="_blank" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Xem trang công khai ↗</Link></div></div></div><CompletionRing value={completion} /></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3"><MiniStat label="Trạng thái hội viên" value={verified ? "✓" : "…"} tone={verified ? "green" : "amber"} /><MiniStat label="Hồ sơ hoàn thiện" value={`${completion}%`} /><MiniStat label="Bảo mật tài khoản" value="✓" tone="green" /></div>
      </section>
      <aside className="rounded-2xl bg-[#082a55] p-5 text-white shadow-[0_15px_35px_rgba(8,42,85,.18)] xl:col-span-4 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[.16em] text-cyan-300">Việc cần làm</p><h2 className="mt-2 text-xl font-semibold">Hoàn thiện hiện diện B2B</h2><p className="mt-3 text-sm leading-6 text-blue-100">Bổ sung ảnh bìa, phần giới thiệu và thông điệp để trang doanh nghiệp nổi bật trong danh bạ BIHUBA.</p><div className="mt-5 rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-blue-50">{completion < 100 ? `Còn ${100 - completion}% thông tin đề xuất để hoàn thiện.` : "Hồ sơ đã sẵn sàng hiển thị chuyên nghiệp."}</div></aside>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,.045)] xl:col-span-8"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">Khu vực sắp mở rộng</p><h2 className="mt-1 text-lg font-semibold">Công cụ dành cho doanh nghiệp</h2></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Đang phát triển</span></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{[["Gian hàng B2B", "Đăng sản phẩm, dịch vụ"], ["Bài viết doanh nghiệp", "Gửi nội dung chờ duyệt"], ["Logo đối tác", "Quản lý nhận diện hợp tác"]].map(([title, body]) => <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-semibold text-slate-800">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{body}</p></div>)}</div></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,.045)] xl:col-span-4"><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">Hỗ trợ BIHUBA</p><p className="mt-2 text-sm leading-6 text-slate-600">Cần điều chỉnh giấy phép, mã số thuế hoặc thông tin pháp lý?</p><Link href="/lien-he" className="mt-4 inline-flex text-sm font-semibold text-[#1769e8]">Liên hệ Văn phòng Hội →</Link></section>
    </div> : null}

    {tab === "profile" ? <form onSubmit={saveProfile} className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,.045)] sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">Hồ sơ doanh nghiệp</h2><p className="mt-1 text-sm text-slate-500">Các thay đổi sẽ cập nhật vào trang doanh nghiệp sau khi lưu.</p></div>{message ? <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}</div><div className="mt-6 grid gap-4 md:grid-cols-2">{fields.map(([key, label]) => <label key={key} className={key === "address" || key === "companyTagline" || key === "description" ? "md:col-span-2" : ""}><span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>{key === "description" ? <textarea value={values[key] || ""} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} rows={5} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none focus:border-blue-400" /> : <input value={values[key] || ""} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none focus:border-blue-400" />}</label>)}</div><div className="mt-6 flex flex-wrap items-center gap-3"><button disabled={isSaving} className="rounded-xl bg-[#1769e8] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">{isSaving ? "Đang lưu…" : "Lưu thay đổi"}</button><Link href={publicProfileHref} target="_blank" className="text-sm font-semibold text-[#1769e8]">Mở trang công khai →</Link></div></form> : null}

    {tab === "security" ? <div className="mt-6 grid gap-5 lg:grid-cols-2"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,.045)] sm:p-6"><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">Bảo mật tài khoản</p><h2 className="mt-2 text-xl font-semibold">Đổi mật khẩu</h2><form onSubmit={changePassword} className="mt-5 space-y-3"><input required name="currentPassword" type="password" placeholder="Mật khẩu hiện tại" className="w-full rounded-xl border border-slate-200 px-4 py-3"/><input required name="nextPassword" minLength={8} type="password" placeholder="Mật khẩu mới (tối thiểu 8 ký tự)" className="w-full rounded-xl border border-slate-200 px-4 py-3"/><button className="rounded-xl border border-[#1769e8] px-5 py-3 text-sm font-semibold text-[#1769e8]">Cập nhật mật khẩu</button></form>{passwordMessage ? <p className="mt-3 text-sm text-cyan-700">{passwordMessage}</p> : null}</section><section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-700">Xác minh pháp lý</p><h2 className="mt-2 text-xl font-semibold">Giấy phép & mã số thuế</h2><p className="mt-3 text-sm leading-6 text-slate-600">Thông tin pháp lý được Văn phòng BIHUBA xác minh để bảo vệ uy tín danh bạ. Khi cần điều chỉnh, vui lòng gửi yêu cầu để được hỗ trợ.</p>{certificateUrl ? <a href={certificateUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[#1769e8]">Xem giấy tờ đã nộp ↗</a> : null}<Link href="/lien-he" className="mt-4 block text-sm font-semibold text-[#1769e8]">Gửi yêu cầu xác minh →</Link></section></div> : null}
  </section>;
}
