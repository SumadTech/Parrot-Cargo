import type { BlogHeading } from "@/lib/blog-headings";
import type { BlogDocument } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

type BlogDetailSidebarProps = {
  headings: BlogHeading[];
  recentPosts: BlogDocument[];
  currentSlug: string;
};

function formatDate(value?: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogDetailSidebar({
  headings,
  recentPosts,
  currentSlug,
}: BlogDetailSidebarProps) {
  const filteredPosts = recentPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  return (
    <aside className="lg:sticky lg:top-27 lg:self-start">
      <div className="rounded-sm bg-surface-secondary p-5">
        <h2 className="text-body-3 font-semibold text-heading">
          This Article
        </h2>

        <nav className="mt-4 grid">
          {headings.length ? (
            headings.map((heading) => (
              <Link
                key={heading.id}
                href={`#${heading.id}`}
                className="border-b border-stroke py-3 text-caption-1 text-body transition-colors last:border-b-0 hover:text-primary"
              >
                {heading.text}
              </Link>
            ))
          ) : (
            <p className="py-3 text-caption-1 text-body">
              No sections available.
            </p>
          )}
        </nav>
      </div>

      <div className="mt-6 rounded-sm bg-surface-secondary p-5">
        <h2 className="text-body-3 font-semibold text-heading">
          Recent Posts
        </h2>

        <div className="mt-5 grid gap-4">
          {filteredPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blogs/${post.slug}`}
              className="group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3"
            >
              <div className="relative min-h-18 overflow-hidden rounded-sm bg-card">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.coverImageAlt || post.title}
                    fill
                    sizes="88px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>

              <div className="min-w-0">
                {post.publishedAt ? (
                  <time
                    dateTime={post.publishedAt}
                    className="text-caption-3 font-medium text-secondary"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                ) : null}

                <h3 className="mt-1 line-clamp-3 text-caption-2 font-semibold text-heading transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}