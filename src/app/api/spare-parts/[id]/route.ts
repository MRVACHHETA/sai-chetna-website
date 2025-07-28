// src/app/api/spare-parts/[id]/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    // Fix 1: Use _id: _ to ignore the destructured _id variable, resolving 'no-unused-vars'
    const { _id: _, ...updateFields } = body;

    const db = await connectToDatabase();
    const result = await db.collection("spare_parts").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateFields,
          updatedAt: new Date()
        }
      }
    );

    if (!result.acknowledged) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (err: unknown) { // Fix 2: Change 'any' to 'unknown' for better type safety
    let errorMessage = "An unknown error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const db = await connectToDatabase();
    const result = await db.collection("spare_parts").deleteOne({ _id: new ObjectId(id) });

    if (!result.acknowledged) {
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (err: unknown) { // Fix 3: Change 'any' to 'unknown' for better type safety
    let errorMessage = "An unknown error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}