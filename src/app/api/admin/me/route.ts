import { NextResponse } from "next/server";
import { getCurrentAdminUser } from "@/lib/auth";
import { getAdminNavKeys, getDefaultAdminPath, getSessionPermissions } from "@/lib/permissions";

export async function GET() {
  const session = await getCurrentAdminUser();

  if (!session) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const [permissions, navKeys, defaultPath] = await Promise.all([
    getSessionPermissions(session),
    getAdminNavKeys(session),
    getDefaultAdminPath(session),
  ]);

  return NextResponse.json({
    user: {
      userId: session.userId,
      username: session.username,
      name: session.name,
      role: session.role,
    },
    permissions,
    navKeys,
    defaultPath,
  });
}
