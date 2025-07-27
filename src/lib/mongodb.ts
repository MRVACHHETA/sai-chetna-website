// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};
console.log("DEBUG URI:", process.env.MONGODB_URI);
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const client = new MongoClient(uri!, options);
const clientPromise = client.connect();

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("sai-chetna-db"); // 👈 match your DB name
}