"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type BlogCategoryFilterProps = {
  categories: string[];
};

export function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isAll = category === "All Articles";
        const isActive = isAll
          ? !selectedCategory
          : selectedCategory === category;

        const href = isAll
          ? "/blogs"
          : `/blogs?category=${encodeURIComponent(category)}`;

        return (
          <Link
            key={category}
            href={href}
            scroll={false}
            className={cn(
              "rounded-full border px-5 py-2 text-caption-1 font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary bg-background text-primary hover:bg-accent",
            )}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}