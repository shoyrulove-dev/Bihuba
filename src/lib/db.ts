import mongoose from "mongoose";

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose | null> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

const cache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cache;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return null;
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB ?? "bihuba",
      })
      .catch((error) => {
        console.warn("MongoDB connection failed, using fallback content.", error);
        cache.promise = null;
        return null;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
