import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const parts = await db.collection("spare_parts").find({}).toArray();
    return NextResponse.json(parts);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}