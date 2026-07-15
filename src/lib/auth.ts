import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "bihuba_admin_session";

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "Bihuba@2026",
    sessionSecret:
      process.env.ADMIN_SESSION_SECRET ?? "bihuba-session-secret-2026",
  };
}

export async function isAuthenticatedAdmin() {
  const cookieStore = await cookies();
  const { sessionSecret } = getAdminCredentials();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === sessionSecret;
}
