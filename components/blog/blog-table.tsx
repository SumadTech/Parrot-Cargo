import Link from "next/link";

import { BlogStatusBadge } from "@/components/blog/blog-status-badge";
import type { BlogDocument } from "@/types/blog";

type BlogTableProps = {
  blogs: BlogDocument[];
};

export function BlogTable({ blogs }: BlogTableProps) {
  if (blogs.length === 0) {
    return (
      <div className="rounded-sm border border-stroke bg-card p-8 text-center">
        <h2 className="text-body-3 font-semibold text-heading">
          No blogs found
        </h2>
        <p className="mt-2 text-caption-1 text-body">
          Try changing the selected filters or create a new article.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/admin/blogs/${blog._id}`}
            className="block rounded-sm border border-stroke bg-card p-4 transition-colors hover:bg-secondary-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="wrap-break-word text-body-3 font-semibold text-heading">
                  {blog.title}
                </h2>
                <p className="mt-1 text-caption-2 text-body">
                  {blog.categories.join(", ") || "Uncategorized"}
                </p>
              </div>

              <BlogStatusBadge status={blog.status} />
            </div>

            <p className="mt-3 line-clamp-2 text-caption-1 text-body">
              {blog.excerpt}
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-caption-2">
              <span className="rounded-full bg-secondary-background px-3 py-1 text-heading">
                {blog.views} views
              </span>
              <span className="rounded-full bg-secondary-background px-3 py-1 text-heading">
                {blog.readingTimeMinutes} min read
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden w-full overflow-x-auto rounded-sm border border-stroke bg-card md:block">
        <table className="w-full min-w-200 text-start text-caption-1">
          <thead className="border-b border-stroke bg-secondary-background text-heading">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">Title</th>
              <th className="px-4 py-3 text-start font-semibold">Categories</th>
              <th className="px-4 py-3 text-start font-semibold">Status</th>
              <th className="px-4 py-3 text-start font-semibold">Views</th>
              <th className="px-4 py-3 text-start font-semibold">Updated</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke">
            {blogs.map((blog) => {
              const href = `/admin/blogs/${blog._id}`;

              return (
                <tr
                  key={blog._id}
                  className="transition-colors hover:bg-secondary-background"
                >
                  <td className="max-w-sm p-0">
                    <Link href={href} className="block px-4 py-4">
                      <p className="truncate font-semibold text-heading">
                        {blog.title}
                      </p>
                      <p className="mt-1 line-clamp-1 text-caption-2 text-body">
                        {blog.excerpt}
                      </p>
                    </Link>
                  </td>

                  <td className="max-w-xs p-0">
                    <Link href={href} className="block px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.categories.length ? (
                          blog.categories.slice(0, 3).map((category) => (
                            <span
                              key={category}
                              className="rounded-full bg-secondary-background px-2 py-1 text-caption-2 text-heading"
                            >
                              {category}
                            </span>
                          ))
                        ) : (
                          <span className="text-body">Uncategorized</span>
                        )}
                      </div>
                    </Link>
                  </td>

                  <td className="p-0">
                    <Link href={href} className="block px-4 py-4">
                      <BlogStatusBadge status={blog.status} />
                    </Link>
                  </td>

                  <td className="p-0">
                    <Link href={href} className="block px-4 py-4 text-body">
                      {blog.views}
                    </Link>
                  </td>

                  <td className="p-0">
                    <Link href={href} className="block px-4 py-4 text-body">
                      {new Date(blog.updatedAt).toLocaleDateString()}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}