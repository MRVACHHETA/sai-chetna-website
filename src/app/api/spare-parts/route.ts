// src/app/api/spare-parts/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await connectToDatabase();
  const parts = await db.collection("spare_parts").find({}).toArray();
  return NextResponse.json(parts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const db = await connectToDatabase();
  const newPart = {
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "in-stock"
  };
  const result = await db.collection("spare_parts").insertOne(newPart);
  return NextResponse.json({ insertedId: result.insertedId });
}