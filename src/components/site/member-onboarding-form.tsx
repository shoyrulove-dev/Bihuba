"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const fields = [
  ["companyName", "Tên doanh nghiệp"], ["taxCode", "Mã số thuế"], ["industry", "Lĩnh vực hoạt động"],
  ["representativeName", "Người đại diện"], ["email", "Email doanh nghiệp"], ["phone", "Số điện thoại"],
  ["address", "Địa chỉ hoạt động"], ["website", "Website (không bắt buộc)"],
] as const;

export function MemberOnboardingForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [uploads, setUploads] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function upload(file: File, kind: "logo" | "certificate") {
    setUploading(kind); setMessage("");
    const form = new FormData(); form.set("file", file); form.set("kind", kind);
    const response = await fetch("/api/ekyc/upload", { method: "POST", body: form });
    const data = await response.json().catch(() => ({}));
    setUploading("");
    if (!response.ok || !data.url) { setMessage(data.message || "Không thể tải tệp. Vui lòng thử lại."); return; }
    setUploads((current) => ({ ...current, [`${kind}Url`]: data.url }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setIsSubmitting(true);
    const response = await fetch("/api/ekyc/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, ...uploads }) });
    const data = await response.json().catch(() => ({})); setIsSubmitting(false);
    if (!response.ok) { setMessage(data.message || "Không thể gửi hồ sơ. Vui lòng kiểm tra lại."); return; }
    window.location.assign(data.redirectTo || "/hoi-vien/dashboard");
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_55px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map(([name, label]) => (
          <label key={name} className={name === "address" ? "sm:col-span-2" : ""}>
            <span className="mb-2 block text-sm font-semibold text-slate-700">{label}{name !== "website" ? " *" : ""}</span>
            <input required={name !== "website"} type={name === "email" ? "email" : name === "website" ? "url" : "text"} value={values[name] || ""} onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" />
          </label>
        ))}
        <label>
          <span className="mb-2 block text-sm font-semibold text-slate-700">Mật khẩu * <span className="font-normal text-slate-500">(tối thiểu 8 ký tự)</span></span>
          <input required minLength={8} type="password" value={values.password || ""} onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" autoComplete="new-password" />
        </label>
        <div className="rounded-xl border border-dashed border-cyan-300 bg-cyan-50/50 p-4">
          <p className="text-sm font-semibold text-slate-800">Logo doanh nghiệp *</p><p className="mt-1 text-xs leading-5 text-slate-500">JPG, PNG hoặc WebP; tối đa 10 MB.</p>
          <input required type="file" accept="image/jpeg,image/png,image/webp" className="mt-3 block w-full text-sm" onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file, "logo"); }} />
          <p className="mt-2 text-xs font-semibold text-cyan-800">{uploading === "logo" ? "Đang tải..." : uploads.logoUrl ? "Đã tải logo" : ""}</p>
        </div>
        <div className="rounded-xl border border-dashed border-cyan-300 bg-cyan-50/50 p-4">
          <p className="text-sm font-semibold text-slate-800">Giấy phép/giấy chứng nhận *</p><p className="mt-1 text-xs leading-5 text-slate-500">PDF, JPG, PNG hoặc WebP; tối đa 10 MB.</p>
          <input required type="file" accept="application/pdf,image/jpeg,image/png,image/webp" className="mt-3 block w-full text-sm" onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file, "certificate"); }} />
          <p className="mt-2 text-xs font-semibold text-cyan-800">{uploading === "certificate" ? "Đang tải..." : uploads.certificateUrl ? "Đã tải giấy tờ" : ""}</p>
        </div>
      </div>
      {message ? <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">{message}</p> : null}
      <div className="mt-7 flex flex-wrap items-center gap-4"><button disabled={isSubmitting || Boolean(uploading) || !uploads.logoUrl || !uploads.certificateUrl} className="rounded-full bg-[#0E4FAF] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Đang gửi hồ sơ..." : "Gửi hồ sơ E-KYC"}</button><Link href="/admin/login?next=/hoi-vien/dashboard" className="text-sm font-semibold text-[#0E4FAF]">Đã có tài khoản? Đăng nhập →</Link></div>
    </form>
  );
}
