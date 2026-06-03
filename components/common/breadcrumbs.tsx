import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mt-4">
      <ol className="flex flex-wrap items-center justify-center gap-2 text-caption-1 text-primary-foreground/85">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-secondary" : ""}>
                  {item.label}
                </span>
              )}

              {!isLast ? (
                <ChevronRight
                  className="size-4 text-primary-foreground/70 rtl:rotate-180"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}