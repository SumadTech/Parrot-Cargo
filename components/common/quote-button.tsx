import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type QuoteButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "light" | "primary" | "outline" | "ghost";
  className?: string;
  iconSize?: "sm" | "md";
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

const variantClasses = {
  light:
    "bg-card text-heading hover:bg-primary hover:text-primary-foreground",
  primary:
    "bg-primary text-primary-foreground hover:bg-secondary hover:text-heading",
  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
  ghost:
    "bg-card/20 text-primary-foreground hover:bg-card hover:text-heading",
};

const iconClasses = {
  light:
    "bg-primary text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary",
  primary:
    "bg-primary-foreground text-foreground group-hover:bg-card group-hover:text-primary",
  outline:
    "bg-primary text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary",
  ghost:
    "bg-primary text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground",
};

export function QuoteButton({
  children,
  href,
  variant = "light",
  className,
  iconSize = "md",
  type = "button",
  ...buttonProps
}: QuoteButtonProps) {
  const content = (
    <>
      <span className="min-w-0">{children}</span>

      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 rtl:group-hover:-translate-y-0.5",
          iconSize === "sm" ? "size-7" : "size-8",
          iconClasses[variant],
        )}
      >
        <ArrowUpRight
          className={cn(iconSize === "sm" ? "size-4" : "size-4")}
          aria-hidden="true"
        />
      </span>
    </>
  );

  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full py-2 ps-5 pe-2 text-caption-1 font-semibold  transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70",
    variantClasses[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}