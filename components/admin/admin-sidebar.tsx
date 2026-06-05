"use client";

import { LayoutDashboard, LogOut, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

const adminLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    Icon: LayoutDashboard,
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    Icon: Newspaper,
  },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.replace("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <aside className="border-stroke bg-card lg:fixed lg:inset-y-0 lg:start-0 lg:z-40 lg:flex lg:w-[280px] lg:flex-col lg:border-e">
      <div className="flex items-center justify-between border-b border-stroke px-4 py-4 lg:px-6">
        <Link
          href="/admin"
          className="text-body-3 font-semibold text-heading transition-colors hover:text-primary">
          Parrot Admin
        </Link>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none [&::-webkit-scrollbar]:hidden lg:flex-1 lg:flex-col lg:overflow-visible lg:px-4 lg:py-6">
        {adminLinks.map(({ href, label, Icon }) => {
          const isActive =
            href === "/admin" ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-4 py-2 text-caption-1 font-medium text-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-full",
                "hover:bg-accent hover:text-heading",
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              )}>
              <Icon
                className={cn(
                  "size-4 shrink-0 text-secondary",
                  isActive && "text-primary-foreground",
                )}
                aria-hidden="true"
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stroke p-4">
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-sm border border-stroke bg-background px-4 py-2 text-caption-1 font-semibold text-heading transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-70 lg:justify-start">
          <LogOut className="size-4 text-secondary" aria-hidden="true" />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
