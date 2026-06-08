"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type BlogCategoryFilterProps = {
  categories: string[];
};

function buildCategoryHref(selectedCategories: string[], category: string) {
  const isAll = category === "All Articles";

  if (isAll) {
    return "/blogs";
  }

  const params = new URLSearchParams();

  const nextCategories = selectedCategories.includes(category)
    ? selectedCategories.filter((item) => item !== category)
    : [...selectedCategories, category];

  nextCategories.forEach((item) => {
    params.append("category", item);
  });

  const query = params.toString();

  return query ? `/blogs?${query}` : "/blogs";
}

export function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.getAll("category");

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isAll = category === "All Articles";
        const isActive = isAll
          ? selectedCategories.length === 0
          : selectedCategories.includes(category);

        return (
          <Link
            key={category}
            href={buildCategoryHref(selectedCategories, category)}
            scroll={false}
            className={cn(
              "rounded-sm border px-5 py-2 text-caption-1 font-medium transition-colors",
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