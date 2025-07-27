// app/api/login/route.ts
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}
export const dynamic = "force-dynamic";
