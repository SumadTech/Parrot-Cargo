import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { signAdminToken } from "@/app/controller/auth";
import { ADMIN_COOKIE, adminCookieOptions } from "@/lib/cookies";
import { connectDB } from "@/lib/db";
import { User } from "@/app/models/user";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = LoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  await connectDB();

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  if (user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const token = signAdminToken({
    sub: user._id.toString(),
    email: user.email,
    role: "admin",
  });

  const res = NextResponse.json({ message: "ok" });

  res.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());

  return res;
}