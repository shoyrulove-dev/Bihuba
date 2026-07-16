import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  if (await isAuthenticatedAdmin()) {
    redirect("/admin");
  }

  const params = await searchParams;
  const nextPath = params.next || "/admin";

  return (
    <div className="admin-root min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_420px]">
        <section className="rounded-[2.5rem] border border-white/10 bg-linear-to-br from-cyan-500/20 to-blue-800/20 p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            BIHUBA CMS
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight">
            Khu quản trị riêng cho BIHUBA
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Đăng nhập để quản lý bài viết, hội viên, đối tác, tài liệu và cấu hình
            website. Toàn bộ nội dung public được điều hành từ đây.
          </p>
        </section>

        <section className="rounded-[2.5rem] bg-white p-8 text-slate-950 shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
          <h2 className="text-2xl font-semibold">Đăng nhập admin</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Dùng tài khoản quản trị đã cấu hình trong biến môi trường.
          </p>

          <form action="/api/auth/login" method="post" className="mt-8 space-y-5">
            <input type="hidden" name="next" value={nextPath} />

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Username</span>
              <input
                name="username"
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="admin"
                autoComplete="username"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Password</span>
              <input
                name="password"
                type="password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            {params.error ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                Sai username hoặc password.
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Vào khu quản trị
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
