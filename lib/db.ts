import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = globalThis.__mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis.__mongooseCache = cache;

function getMongoConfig() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DB = process.env.MONGODB_DB;

  if (typeof MONGODB_URI !== "string" || MONGODB_URI.length === 0) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  return {
    uri: MONGODB_URI,
    dbName:
      typeof MONGODB_DB === "string" && MONGODB_DB.length > 0
        ? MONGODB_DB
        : undefined,
  };
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  const { uri, dbName } = getMongoConfig();

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, {
        dbName,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}