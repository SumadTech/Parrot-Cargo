import type { BlogDocument } from "@/types/blog";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  blog: BlogDocument;
};

function formatDate(value?: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article className="h-full overflow-hidden rounded-sm border border-stroke bg-card p-3 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative min-h-52 overflow-hidden rounded-sm bg-surface-secondary">
          {blog.coverImageUrl ? (
            <Image
              src={blog.coverImageUrl}
              alt={blog.coverImageAlt || blog.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
        </div>

        <div className="px-1 py-4">
          <div className="flex flex-wrap items-center gap-2 text-caption-2">
            {blog.category ? (
              <span className="font-medium text-secondary">
                {blog.category}
              </span>
            ) : null}

            {blog.category ? (
              <span className="size-1 rounded-full bg-secondary" />
            ) : null}

            {blog.publishedAt ? (
              <time dateTime={blog.publishedAt} className="text-secondary">
                {formatDate(blog.publishedAt)}
              </time>
            ) : null}
          </div>

          <h2 className="mt-3 line-clamp-2 text-body-3 font-semibold text-heading transition-colors group-hover:text-primary">
            {blog.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-caption-1 text-body">
            {blog.excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-stroke pt-4">
            <div className="flex min-w-0 items-center gap-3">
              {blog.author.avatarUrl ? (
                <Image
                  src={blog.author.avatarUrl}
                  alt={blog.author.name}
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover"
                />
              ) : (
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-caption-2 font-semibold text-primary-foreground">
                  {blog.author.name.slice(0, 1)}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-caption-2 font-semibold text-heading">
                  {blog.author.name}
                </p>
                <p className="text-caption-3 text-body">
                  {blog.readingTimeMinutes} min read
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-caption-2 font-medium text-body transition-colors group-hover:text-primary">
              Read More
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}