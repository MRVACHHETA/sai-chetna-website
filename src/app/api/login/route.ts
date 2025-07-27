import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Prevent running during build
  if (process.env.NEXT_RUNTIME === "edge") {
    console.log("⚠️ Skipping login API during build");
    return NextResponse.json({ success: false, message: "Login disabled at build time" });
  }

  try {
    const { email, password } = await request.json();
    console.log("🟡 Received login request:", email);

    const db = await connectToDatabase();
    console.log("🟢 Connected to DB");

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      console.log("🔴 User not found");
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("🔴 Invalid password");
      return NextResponse.json({ success: false, message: "Invalid password" });
    }

    console.log("✅ Login successful for:", user.email);

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}