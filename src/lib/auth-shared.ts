export const ADMIN_SESSION_COOKIE = "bihuba_admin_session";
export const MEMBER_SESSION_COOKIE = "bihuba_member_session";
export const SESSION_MAX_AGE_DEFAULT = 60 * 60 * 8;
export const SESSION_MAX_AGE_REMEMBER = 60 * 60 * 24 * 30;

export type AdminRole = "admin" | "manager" | "business";

export type SessionUser = {
  userId: number;
  username: string;
  role: AdminRole;
  name: string;
};

export type SessionPayload = SessionUser & {
  exp: number;
};

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "Bihuba@2026",
    sessionSecret:
      process.env.ADMIN_SESSION_SECRET ?? "bihuba-session-secret-2026",
  };
}
