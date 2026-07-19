"use client";

import Link from "next/link";
import { useState } from "react";
import { FloatingActions } from "@/types/cms";

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
      <path d="M6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H14l-4.8 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7A2.5 2.5 0 0 1 6.5 4Zm1.8 4.2v1.4h2.1l-2.4 4.2h1.9l2.5-4.2V8.2H8.3Zm5.6 0v5.6h1.8V8.2h-1.8Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
      <path d="M13.5 21v-7h2.3l.5-3h-2.8V9.1c0-.9.4-1.6 1.7-1.6h1.2V4.8c-.2 0-.9-.1-1.8-.1-2.9 0-4.6 1.7-4.6 4.9V11H7.5v3H10v7h3.5Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M5 4h4l1.5 4-2 1.8a16 16 0 0 0 5.7 5.7l1.8-2L20 15v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function AuthPanel({ mode, setMode }: { mode: "login" | "register"; setMode: (mode: "login" | "register") => void }) {
  return (
    <div className="absolute bottom-full right-0 mb-3 w-[min(92vw,360px)] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white text-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.2)]">
      <div className="flex border-b border-slate-100 bg-slate-50 p-2">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "login" ? "bg-cyan-400 text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
          }`}
        >
          Đăng nhập
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "register" ? "bg-cyan-400 text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
          }`}
        >
          Đăng ký
        </button>
      </div>

      {mode === "login" ? (
        <form action="/api/auth/login" method="post" className="space-y-3 p-4">
          <input type="hidden" name="next" value="/admin/posts" />
          <input
            name="username"
            type="email"
            placeholder="Email"
            autoComplete="username"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white"
          />
          <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <input name="remember" type="checkbox" value="30d" className="h-4 w-4" />
            Ghi nhớ 30 ngày
          </label>
          <button type="submit" className="w-full rounded-full bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_10px_22px_rgba(34,211,238,0.22)]">
            Vào
          </button>
        </form>
      ) : (
        <form action="/api/auth/register" method="post" className="space-y-3 p-4">
          <input type="hidden" name="next" value="/admin/posts" />
          <input
            name="email"
            type="email"
            placeholder="Email doanh nghiệp"
            autoComplete="email"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Số điện thoại"
            autoComplete="tel"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu tối thiểu 6 ký tự"
            autoComplete="new-password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white"
          />
          <button type="submit" className="w-full rounded-full bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_10px_22px_rgba(34,211,238,0.22)]">
            Tạo tài khoản
          </button>
        </form>
      )}
    </div>
  );
}

export function FloatingContactButtons({ actions }: { actions: FloatingActions }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const hasAnyAction = actions.zaloUrl || actions.facebookUrl || actions.callNumber;

  return (
    <div className="floating-contact-buttons fixed bottom-4 right-3 z-40 flex flex-col gap-2">
      <div className="relative">
        {isAuthOpen ? <AuthPanel mode={mode} setMode={setMode} /> : null}
        <button
          type="button"
          onClick={() => setIsAuthOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_14px_24px_rgba(2,6,23,0.26)] transition hover:scale-105"
          aria-label="Đăng nhập hoặc đăng ký"
          title="Đăng nhập / Đăng ký"
        >
          <UserIcon />
        </button>
      </div>
      {hasAnyAction ? (
        <>
          {actions.zaloUrl ? (
            <Link
              href={actions.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-[0_14px_24px_rgba(0,104,255,0.26)] transition hover:scale-105"
              aria-label="Zalo"
              title="Zalo"
            >
              <ZaloIcon />
            </Link>
          ) : null}
          {actions.facebookUrl ? (
            <Link
              href={actions.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-[0_14px_24px_rgba(24,119,242,0.26)] transition hover:scale-105"
              aria-label="Facebook"
              title="Facebook"
            >
              <FacebookIcon />
            </Link>
          ) : null}
          {actions.callNumber ? (
            <a
              href={`tel:${actions.callNumber}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E4FAF] text-white shadow-[0_14px_24px_rgba(14,79,175,0.26)] transition hover:scale-105"
              aria-label={actions.callLabel || "Gọi ngay"}
              title={actions.callLabel || "Gọi ngay"}
            >
              <PhoneIcon />
            </a>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
