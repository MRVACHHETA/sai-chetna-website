// app/api/login/route.ts
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; // Your Mongoose schema
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectDB(); // ✅ Connect to MongoDB

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
  }

  // Return role & name
  return new Response(JSON.stringify({
    success: true,
    user: {
      name: user.name,
      role: user.role,
      email: user.email,
    },
  }), { status: 200 });
}