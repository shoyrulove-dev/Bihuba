import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { gzipSync } from "node:zlib";
import { EJSON } from "bson";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorize(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}

function encryptBackup(value: Buffer) {
  const sourceKey = process.env.BACKUP_ENCRYPTION_KEY;
  if (!sourceKey) throw new Error("BACKUP_ENCRYPTION_KEY is not configured");
  const key = createHash("sha256").update(sourceKey).digest();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);
  return Buffer.concat([Buffer.from("BIHUBA1"), iv, cipher.getAuthTag(), encrypted]);
}

export async function GET(request: NextRequest) {
  if (!authorize(request)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const database = await connectToDatabase();
  const db = database?.connection.db;
  if (!db) return NextResponse.json({ message: "Database unavailable" }, { status: 503 });

  const collections = await db.listCollections({}, { nameOnly: true }).toArray();
  const payload: Record<string, unknown[]> = {};
  for (const { name } of collections) {
    if (name === "ratelimits") continue;
    payload[name] = await db.collection(name).find({}).toArray();
  }

  const createdAt = new Date();
  const archive = encryptBackup(gzipSync(Buffer.from(EJSON.stringify({ version: 1, createdAt, database: db.databaseName, collections: payload }))));
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) throw new Error("IMAGEKIT_PRIVATE_KEY is not configured");

  const form = new FormData();
  form.set("file", archive.toString("base64"));
  form.set("fileName", `bihuba-${createdAt.toISOString().replaceAll(":", "-")}.json.gz.enc`);
  form.set("folder", `${process.env.IMAGEKIT_BASE_FOLDER || "bihuba"}/backups`);
  form.set("useUniqueFileName", "false");

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}` },
    body: form,
    signal: AbortSignal.timeout(45_000),
  });
  const result = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) return NextResponse.json({ message: "Backup upload failed", providerStatus: response.status }, { status: 502 });

  return NextResponse.json({ status: "ok", createdAt, collections: collections.length, bytes: archive.length, fileId: result.fileId });
}
