// If using App Router:
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // Make sure it's installed

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Incorrect password" });
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Login failed", error });
  }
}