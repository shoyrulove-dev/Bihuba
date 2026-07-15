import mongoose from "mongoose";
import { downloads, members, partners, posts, settings } from "./defaultContent.mjs";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

const connection = await mongoose.connect(MONGODB_URI, {
  dbName: process.env.MONGODB_DB ?? "bihuba",
});

const db = connection.connection.db;

await Promise.all([
  db.collection("posts").deleteMany({}),
  db.collection("members").deleteMany({}),
  db.collection("partners").deleteMany({}),
  db.collection("downloads").deleteMany({}),
  db.collection("sitesettings").deleteMany({}),
]);

await Promise.all([
  db.collection("posts").insertMany(posts),
  db.collection("members").insertMany(members),
  db.collection("partners").insertMany(partners),
  db.collection("downloads").insertMany(downloads),
  db.collection("sitesettings").insertOne(settings),
]);

console.log("Seed completed");
await mongoose.disconnect();
