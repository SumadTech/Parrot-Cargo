import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { verifyAdminToken } from "@/app/controller/auth";
import { ADMIN_COOKIE } from "@/lib/cookies";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    const payload = verifyAdminToken(token);

    if (payload.role !== "admin") {
      redirect("/admin/login");
    }
  } catch {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}