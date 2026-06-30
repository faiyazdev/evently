import mongoose from "mongoose";

import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const MONGODB_URI = process.env.MONGODB_URI!;
const cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "evently",
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}
