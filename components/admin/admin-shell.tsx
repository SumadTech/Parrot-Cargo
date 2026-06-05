import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-dvh bg-background text-heading">
      <AdminSidebar />

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:ms-[280px] lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </div>
  );
}