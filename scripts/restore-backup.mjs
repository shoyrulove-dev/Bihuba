import { createDecipheriv, createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import mongoose from "mongoose";
import { EJSON } from "bson";

const [, , archivePath, confirmation] = process.argv;
if (!archivePath || confirmation !== "--confirm-replace") {
  console.error("Usage: npm run restore:backup -- <archive.json.gz.enc> --confirm-replace");
  process.exit(1);
}
if (!process.env.MONGODB_URI || !process.env.BACKUP_ENCRYPTION_KEY) {
  console.error("MONGODB_URI and BACKUP_ENCRYPTION_KEY are required.");
  process.exit(1);
}

const archive = await readFile(archivePath);
if (archive.subarray(0, 7).toString() !== "BIHUBA1") throw new Error("Unsupported backup format");
const key = createHash("sha256").update(process.env.BACKUP_ENCRYPTION_KEY).digest();
const decipher = createDecipheriv("aes-256-gcm", key, archive.subarray(7, 19));
decipher.setAuthTag(archive.subarray(19, 35));
const decrypted = Buffer.concat([decipher.update(archive.subarray(35)), decipher.final()]);
const backup = EJSON.parse(gunzipSync(decrypted).toString("utf8"));

await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB || backup.database || "bihuba" });
const db = mongoose.connection.db;
if (!db) throw new Error("Database unavailable");
for (const [name, documents] of Object.entries(backup.collections)) {
  const collection = db.collection(name);
  await collection.deleteMany({});
  if (Array.isArray(documents) && documents.length) await collection.insertMany(documents);
}
await mongoose.disconnect();
console.log(`Restored ${Object.keys(backup.collections).length} collections from ${backup.createdAt}.`);
