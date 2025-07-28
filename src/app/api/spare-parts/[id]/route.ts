// src/app/api/spare-parts/[id]/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function PUT(req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    // Remove _id to avoid immutable field conflict
    const { _id, ...updateFields } = body;

    const db = await connectToDatabase();
    const result = await db.collection("spare_parts").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateFields, updatedAt: new Date() } }
    );

    if (!result.acknowledged || result.modifiedCount === 0) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (err: any) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: Context) {
  try {
    const { id } = context.params;

    const db = await connectToDatabase();
    const result = await db.collection("spare_parts").deleteOne({
      _id: new ObjectId(id),
    });

    if (!result.acknowledged || result.deletedCount === 0) {
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (err: any) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}