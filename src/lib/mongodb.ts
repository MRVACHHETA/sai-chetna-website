// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

client = new MongoClient(uri!, options);
clientPromise = client.connect();

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("sai-chetna-db"); // 👈 this must match your actual database name
}