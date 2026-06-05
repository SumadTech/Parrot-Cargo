import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyAdminToken } from "@/app/controller/auth";
import { ADMIN_COOKIE } from "@/lib/cookies";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({
      authenticated: false,
    });
  }

  try {
    const payload = verifyAdminToken(token);

    if (payload.role !== "admin") {
      return NextResponse.json({
        authenticated: false,
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: payload.email,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({
      authenticated: false,
    });
  }
}