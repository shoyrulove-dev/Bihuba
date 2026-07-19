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

  return (
    <AdminShell title="Hồ sơ quản trị" description="Đổi tên hiển thị và mật khẩu đăng nhập.">
      <form
        action="/api/auth/profile"
        method="post"
        className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:grid-cols-2"
      >
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white">Tên hiển thị</span>
          <input
            name="name"
            defaultValue={name}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white">Tài khoản</span>
          <input
            value={username}
            readOnly
            className="w-full rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-slate-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white">Nhóm quyền</span>
          <input
            value={role === "admin" ? "Admin" : "Quản lý"}
            readOnly
            className="w-full rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-slate-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white">Mật khẩu mới</span>
          <input
            name="password"
            type="password"
            placeholder="Để trống nếu không đổi"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
