"use client";

import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { cn } from "@/lib/utils";
import type { BlogStatus } from "@/types/blog";

type BlogAdminToolbarProps = {
  categories: string[];
  selectedStatus?: BlogStatus;
  selectedCategory?: string;
  search?: string;
};

const statusFilters: Array<{
  label: string;
  value?: BlogStatus;
}> = [
  {
    label: "All statuses",
  },
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "Published",
    value: "published",
  },
  {
    label: "Archived",
    value: "archived",
  },
];

function buildHref(options: {
  status?: BlogStatus;
  category?: string;
  search?: string;
}) {
  const params = new URLSearchParams();

  if (options.search) {
    params.set("q", options.search);
  }

  if (options.status) {
    params.set("status", options.status);
  }

  if (options.category) {
    params.set("category", options.category);
  }

  const query = params.toString();

  return query ? `/admin/blogs?${query}` : "/admin/blogs";
}

export function BlogAdminToolbar({
  categories,
  selectedStatus,
  selectedCategory,
  search,
}: BlogAdminToolbarProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(search ?? "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount =
    Number(Boolean(selectedStatus)) + Number(Boolean(selectedCategory));

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push(
      buildHref({
        status: selectedStatus,
        category: selectedCategory,
        search: searchValue.trim(),
      }),
    );
  }

  return (
    <section className="rounded-sm border border-stroke bg-card p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <form onSubmit={handleSearch} className="flex w-full gap-2 lg:max-w-md">
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search blogs..."
            className="min-h-11 w-full rounded-sm border border-stroke bg-background px-4 text-caption-1 text-heading outline-none transition-colors placeholder:text-body focus:border-primary focus:ring-2 focus:ring-ring"
          />

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Search
          </button>
        </form>

        <div className="flex items-center justify-between gap-2 lg:justify-end">
          {(search || selectedStatus || selectedCategory) ? (
            <Link
              href="/admin/blogs"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-stroke bg-card px-4 text-caption-1 font-semibold text-heading transition-colors hover:bg-secondary-background"
            >
              <X className="size-4" />
              Clear
            </Link>
          ) : null}

          <button
            type="button"
            onClick={() => setIsFilterOpen((value) => !value)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-stroke bg-card px-4 text-caption-1 font-semibold text-heading transition-colors hover:bg-secondary-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <SlidersHorizontal className="size-4" />
            Filters
            {activeFiltersCount > 0 ? (
              <span className="grid size-5 place-items-center rounded-full bg-primary text-caption-2 font-bold text-primary-foreground">
                {activeFiltersCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {isFilterOpen ? (
        <div className="mt-4 grid gap-5 border-t border-stroke pt-4 lg:grid-cols-2">
          <div>
            <h2 className="text-caption-1 font-semibold text-heading">
              Status
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {statusFilters.map((status) => {
                const isActive = selectedStatus === status.value;

                return (
                  <Link
                    key={status.label}
                    href={buildHref({
                      status: status.value,
                      category: selectedCategory,
                      search,
                    })}
                    scroll={false}
                    className={cn(
                      "rounded-sm border px-4 py-2 text-caption-2 font-semibold transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-stroke bg-background text-heading hover:border-primary hover:text-primary",
                    )}
                  >
                    {status.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-caption-1 font-semibold text-heading">
              Category
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={buildHref({
                  status: selectedStatus,
                  search,
                })}
                scroll={false}
                className={cn(
                  "rounded-sm border px-4 py-2 text-caption-2 font-semibold transition-colors",
                  !selectedCategory
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-stroke bg-background text-heading hover:border-primary hover:text-primary",
                )}
              >
                All categories
              </Link>

              {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <Link
                    key={category}
                    href={buildHref({
                      status: selectedStatus,
                      category,
                      search,
                    })}
                    scroll={false}
                    className={cn(
                      "rounded-sm border px-4 py-2 text-caption-2 font-semibold transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-stroke bg-background text-heading hover:border-primary hover:text-primary",
                    )}
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}