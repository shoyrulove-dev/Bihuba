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
  sessionVersion: number;
};

export type SessionPayload = SessionUser & {
  exp: number;
};

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (process.env.NODE_ENV === "production" && (!username || !password || !sessionSecret)) {
    throw new Error(
      "Missing required production auth configuration: ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET."
    );
  }

  return {
    username: username ?? "admin",
    password: password ?? "development-only-password",
    sessionSecret: sessionSecret ?? "development-only-session-secret",
  };
}
