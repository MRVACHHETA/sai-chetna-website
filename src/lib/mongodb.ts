// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("⚠️ MongoDB URI not found in environment");
}

const options = {};
const client = new MongoClient(uri!, options);
const clientPromise = client.connect();

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("sai-chetna-db"); // your database name
}