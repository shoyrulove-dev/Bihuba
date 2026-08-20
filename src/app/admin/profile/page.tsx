import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";

export default async function AdminProfilePage() {
  const session = await requireAdminPage("/admin/profile");

  const connection = await connectToDatabase();
  const user = connection ? await UserModel.findOne({ userId: session.userId }).lean() : null;

  const name = String(user?.name ?? session.name);
  const username = String(user?.username ?? session.username);
  const role = String(user?.role ?? session.role);
  const roleLabel = role === "admin" ? "Admin" : role === "business" ? "Doanh nghiệp" : "Quản lý";

  return (
    <AdminShell title="Hồ sơ quản trị" description="Đổi tên hiển thị và mật khẩu đăng nhập.">
      <form
        action="/api/auth/profile"
        method="post"
        className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] md:grid-cols-2 sm:p-6"
      >
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Tên hiển thị</span>
          <input
            name="name"
            defaultValue={name}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Tài khoản</span>
          <input
            value={username}
            readOnly
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Nhóm quyền</span>
          <input
            value={roleLabel}
            readOnly
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Mật khẩu mới</span>
          <input
            name="password"
            type="password"
            placeholder="Để trống nếu không đổi"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-xl bg-[#1769e8] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(23,105,232,0.22)] transition hover:bg-[#0f55c6]"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
