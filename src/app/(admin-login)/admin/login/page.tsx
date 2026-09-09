import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
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
    <div className="admin-root flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,#0e4fa8_0%,#08234a_42%,#04152c_100%)] px-6 py-12 text-white">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 text-slate-950 shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300 text-xl font-black text-[#08234a]">B</div>
        <h1 className="mt-4 text-center text-3xl font-semibold">BIHUBA</h1>
        <p className="mt-1 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">B2B Admin Dashboard</p>
        <AdminLoginForm nextPath={nextPath} hasError={Boolean(params.error)} />
      </section>
    </div>
  );
}
