// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI not set in environment");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("sai-chetna-db");
}