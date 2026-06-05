import { NextResponse } from "next/server";

import { ADMIN_COOKIE } from "@/lib/cookies";

export async function POST() {
  const res = NextResponse.json({ message: "ok" });

  res.cookies.set(ADMIN_COOKIE, "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}