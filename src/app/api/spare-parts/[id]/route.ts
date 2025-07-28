// src/app/api/spare-parts/[id]/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract 'id' from the URL
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing ID in request." }, { status: 400 });
    }

    const updateFields = { ...body };
    delete updateFields._id;

    const db = await connectToDatabase();
    const result = await db.collection("spare_parts").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateFields,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.acknowledged) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Missing ID in request." }, { status: 400 });
    }

    const db = await connectToDatabase();
    const result = await db.collection("spare_parts").deleteOne({ _id: new ObjectId(id) });

    if (!result.acknowledged) {
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}