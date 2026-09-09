import { createHmac, pbkdf2Sync, timingSafeEqual } from "node:crypto";
import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  MEMBER_SESSION_COOKIE,
  type AdminRole,
  getAdminCredentials,
  SESSION_MAX_AGE_DEFAULT,
  SESSION_MAX_AGE_REMEMBER,
  type SessionPayload,
  type SessionUser,
} from "@/lib/auth-shared";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";
import { CounterModel } from "@/models/counter";

export {
  ADMIN_SESSION_COOKIE,
  MEMBER_SESSION_COOKIE,
  getAdminCredentials,
  SESSION_MAX_AGE_DEFAULT,
  SESSION_MAX_AGE_REMEMBER,
};
export type { AdminRole, SessionUser };

export function hashPassword(password: string) {
  return hash(password, 12);
}

async function verifyPassword(password: string, passwordHash: string) {
  if (passwordHash.startsWith("$2")) return compare(password, passwordHash);

  // Upgrade legacy PBKDF2 hashes transparently after a successful login.
  const legacyHash = pbkdf2Sync(password, "bihuba-auth-salt", 120000, 64, "sha512").toString("hex");
  const stored = Buffer.from(passwordHash);
  const incoming = Buffer.from(legacyHash);
  return stored.length === incoming.length && timingSafeEqual(stored, incoming);
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
  const passwordHash = await hashPassword(credentials.password);

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
    if (!existingAdmin.sessionVersion) {
      existingAdmin.sessionVersion = 1;
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

  const passwordHash = String(user.passwordHash);
  if (!(await verifyPassword(password, passwordHash))) {
    return null;
  }

  if (!passwordHash.startsWith("$2")) {
    await UserModel.updateOne({ _id: user._id }, { passwordHash: await hashPassword(password) });
  }

  return {
    userId: Number(user.userId),
    username: String(user.username),
    role: user.role as AdminRole,
    name: String(user.name),
    sessionVersion: Number(user.sessionVersion || 1),
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
      sessionVersion: Number(payload.sessionVersion || 0),
    };
  } catch {
    return null;
  }
}

export async function getCurrentAdminUser() {
  const cookieStore = await cookies();
  const session = parseSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
  if (!session || !(await connectToDatabase())) return null;
  const user = await UserModel.findOne({ userId: session.userId }).select("sessionVersion role username name").lean();
  if (!user || Number(user.sessionVersion || 1) !== session.sessionVersion || user.role === "business") return null;
  return session;
}

export async function getCurrentMemberUser() {
  const cookieStore = await cookies();
  const session = parseSessionToken(cookieStore.get(MEMBER_SESSION_COOKIE)?.value);
  if (!session || session.role !== "business" || !(await connectToDatabase())) return null;
  const user = await UserModel.findOne({ userId: session.userId }).select("sessionVersion role").lean();
  return user?.role === "business" && Number(user.sessionVersion || 1) === session.sessionVersion ? session : null;
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
    { $set: { passwordHash: await hashPassword(nextPassword) }, $inc: { sessionVersion: 1 } },
    { runValidators: true }
  );
}

export async function getNextUserId() {
  const connection = await connectToDatabase();
  if (!connection) return 2;

  const lastUser = await UserModel.findOne().sort({ userId: -1 }).select("userId").lean();
  const minimum = Math.max(1, Number(lastUser?.userId || 1));
  const counter = await CounterModel.findOneAndUpdate(
    { _id: "users" },
    [{ $set: { seq: { $add: [{ $max: [{ $ifNull: ["$seq", minimum] }, minimum] }, 1] } } }],
    { upsert: true, new: true }
  ).lean();
  return Number(counter?.seq || minimum + 1);
}
