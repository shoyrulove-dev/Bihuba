import { createHmac, pbkdf2Sync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  type AdminRole,
  getAdminCredentials,
  SESSION_MAX_AGE_DEFAULT,
  SESSION_MAX_AGE_REMEMBER,
  type SessionPayload,
  type SessionUser,
} from "@/lib/auth-shared";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";

export {
  ADMIN_SESSION_COOKIE,
  getAdminCredentials,
  SESSION_MAX_AGE_DEFAULT,
  SESSION_MAX_AGE_REMEMBER,
};
export type { AdminRole, SessionUser };

export function hashPassword(password: string) {
  return pbkdf2Sync(password, "bihuba-auth-salt", 120000, 64, "sha512").toString("hex");
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  return createHmac("sha256", getAdminCredentials().sessionSecret).update(payload).digest("base64url");
}

export async function ensureAdminUser() {
  const connection = await connectToDatabase();
  if (!connection) return null;

  const credentials = getAdminCredentials();
  const existingAdmin = await UserModel.findOne({ userId: 1 });
  const passwordHash = hashPassword(credentials.password);

  if (!existingAdmin) {
    await UserModel.create({
      userId: 1,
      name: "Administrator",
      username: credentials.username.toLowerCase(),
      role: "admin",
      permissions: ["posts", "members", "partners", "downloadCategories", "downloads", "supporters", "settings"],
      passwordHash,
      isProtected: true,
    });
  } else {
    let shouldSave = false;
    if (!existingAdmin.isProtected) {
      existingAdmin.isProtected = true;
      shouldSave = true;
    }
    if (existingAdmin.role !== "admin") {
      existingAdmin.role = "admin";
      shouldSave = true;
    }
    if (!Array.isArray(existingAdmin.permissions) || existingAdmin.permissions.length < 7) {
      existingAdmin.permissions = ["posts", "members", "partners", "downloadCategories", "downloads", "supporters", "settings"];
      shouldSave = true;
    }
    if (existingAdmin.username !== credentials.username.toLowerCase()) {
      existingAdmin.username = credentials.username.toLowerCase();
      shouldSave = true;
    }
    if (!existingAdmin.passwordHash) {
      existingAdmin.passwordHash = passwordHash;
      shouldSave = true;
    }
    if (shouldSave) {
      await existingAdmin.save();
    }
  }

  return UserModel.findOne({ userId: 1 }).lean();
}

export async function authenticateAdmin(username: string, password: string) {
  await ensureAdminUser();

  const connection = await connectToDatabase();
  if (!connection) return null;

  const user = await UserModel.findOne({ username: username.trim().toLowerCase() }).lean();
  if (!user) return null;

  const incomingHash = hashPassword(password);
  const stored = Buffer.from(String(user.passwordHash));
  const incoming = Buffer.from(incomingHash);
  if (stored.length !== incoming.length || !timingSafeEqual(stored, incoming)) {
    return null;
  }

  return {
    userId: Number(user.userId),
    username: String(user.username),
    role: user.role as AdminRole,
    name: String(user.name),
  } satisfies SessionUser;
}

export function createSessionToken(user: SessionUser, maxAge: number = SESSION_MAX_AGE_DEFAULT) {
  const payload: SessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + maxAge,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function parseSessionToken(token?: string | null): SessionUser | null {
  if (!token) return null;
  const [payloadPart, signature] = token.split(".");
  if (!payloadPart || !signature) return null;

  const expectedSignature = signPayload(payloadPart);
  const incoming = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (incoming.length !== expected.length || !timingSafeEqual(incoming, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadPart)) as SessionPayload;
    if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      userId: Number(payload.userId),
      username: String(payload.username),
      role: payload.role,
      name: String(payload.name),
    };
  } catch {
    return null;
  }
}

export async function getCurrentAdminUser() {
  const cookieStore = await cookies();
  const session = parseSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
  return session;
}

export async function isAuthenticatedAdmin() {
  const session = await getCurrentAdminUser();
  return Boolean(session);
}

export async function requireAdminUser() {
  const session = await getCurrentAdminUser();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function changeAdminPassword(userId: number, nextPassword: string) {
  const connection = await connectToDatabase();
  if (!connection) throw new Error("MongoDB chưa kết nối.");

  await UserModel.findOneAndUpdate(
    { userId },
    { passwordHash: hashPassword(nextPassword) },
    { runValidators: true }
  );
}

export async function getNextUserId() {
  const connection = await connectToDatabase();
  if (!connection) return 2;

  const lastUser = await UserModel.findOne().sort({ userId: -1 }).lean();
  return lastUser ? Number(lastUser.userId) + 1 : 2;
}
