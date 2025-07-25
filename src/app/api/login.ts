import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Only POST requests allowed" });
  }

  const { email, password } = req.body;

  try {
    const db = await connectDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    return res.status(200).json({
      success: true,
      user: {
        email: user.email,
        role: user.role,
        name: user.name || "",
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err });
  }
}