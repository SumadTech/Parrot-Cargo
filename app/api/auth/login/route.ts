import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { signAdminToken } from "@/app/controller/auth";
import { ADMIN_COOKIE, adminCookieOptions } from "@/lib/cookies";

export const runtime = "nodejs";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

function safeCompare(a: string, b: string): boolean {
  const aHash = createHash("sha256").update(a).digest();
  const bHash = createHash("sha256").update(b).digest();

  return timingSafeEqual(aHash, bHash);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = LoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 400 }
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !jwtSecret) {
    console.error("Admin authentication configuration is missing");

    return NextResponse.json(
      { message: "Authentication service unavailable" },
      { status: 503 }
    );
  }

  const { email, password } = parsed.data;

  const validEmail = safeCompare(
    email.trim().toLowerCase(),
    adminEmail
  );

  const validPassword = safeCompare(
    password,
    adminPassword
  );

  if (!validEmail || !validPassword) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = signAdminToken({
    sub: "env-admin",
    email: adminEmail,
    role: "admin",
  });

  const res = NextResponse.json({ message: "ok" });

  res.cookies.set(
    ADMIN_COOKIE,
    token,
    adminCookieOptions()
  );

  return res;
}