"use client";

import { useState } from "react";

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
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(event) => setShowPassword(event.target.checked)}
            className="h-4 w-4"
          />
          <span>Hiện mật khẩu</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            name="remember"
            type="checkbox"
            value="30d"
            className="h-4 w-4"
          />
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
        Vào quản trị
      </button>
    </form>
  );
}
