// src/app/api/login/route.ts
export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const db = await connectToDatabase();

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login API Error:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}