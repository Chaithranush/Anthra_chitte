import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
    });

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
    });

    return NextResponse.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("API /auth/register error:", err);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
