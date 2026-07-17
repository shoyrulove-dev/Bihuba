"use client";

import { useState } from "react";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.7a3 3 0 0 0 4 4" />
      <path d="M9.9 5.1A11.8 11.8 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-4 4.8" />
      <path d="M6.2 6.3A17.2 17.2 0 0 0 2 12s3.5 7 10 7a10.7 10.7 0 0 0 4-.8" />
    </svg>
  );
}

export function AdminLoginForm({
  nextPath,
  hasError,
}: {
  nextPath: string;
  hasError: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action="/api/auth/login" method="post" className="mt-8 space-y-5">
      <input type="hidden" name="next" value={nextPath} />

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Tài khoản</span>
        <input
          name="username"
          type="text"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="admin"
          autoComplete="username"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Mật khẩu</span>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-12"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-800"
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
      </label>

      <div className="flex items-center justify-end text-sm text-slate-600">
        <label className="inline-flex items-center gap-2">
          <input name="remember" type="checkbox" value="30d" className="h-4 w-4" />
          <span>Ghi nhớ 30 ngày</span>
        </label>
      </div>

      {hasError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Sai tài khoản hoặc mật khẩu.
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
      >
        Vào
      </button>
    </form>
  );
}
