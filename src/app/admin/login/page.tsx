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
    <div className="admin-root flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <section className="w-full max-w-md rounded-[2.5rem] bg-white p-8 text-slate-950 shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
        <h1 className="text-center text-3xl font-semibold">BIHUBA</h1>
        <AdminLoginForm nextPath={nextPath} hasError={Boolean(params.error)} />
      </section>
    </div>
  );
}
