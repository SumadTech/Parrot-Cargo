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
        <h2 className="text-body-3 font-semibold text-heading">No blogs yet</h2>
        <p className="mt-2 text-caption-1 text-body">
          Create your first article to start building the blog.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="rounded-sm border border-stroke bg-card p-4"
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

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href={`/admin/blogs/${blog._id}`}
                className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-stroke bg-card px-4 text-caption-2 font-semibold text-heading sm:w-auto"
              >
                View
              </Link>
              <Link
                href={`/admin/blogs/${blog._id}/edit`}
                className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-primary px-4 text-caption-2 font-semibold text-primary-foreground sm:w-auto"
              >
                Edit
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden w-full overflow-x-auto rounded-sm border border-stroke bg-card md:block">
        <table className="w-full min-w-250 text-start text-caption-1">
          <thead className="border-b border-stroke bg-secondary-background text-heading">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">Title</th>
              <th className="px-4 py-3 text-start font-semibold">Categories</th>
              <th className="px-4 py-3 text-start font-semibold">Status</th>
              <th className="px-4 py-3 text-start font-semibold">Views</th>
              <th className="px-4 py-3 text-start font-semibold">Updated</th>
              <th className="px-4 py-3 text-end font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke">
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="max-w-sm px-4 py-4">
                  <p className="truncate font-semibold text-heading">
                    {blog.title}
                  </p>
                  <p className="mt-1 line-clamp-1 text-caption-2 text-body">
                    {blog.excerpt}
                  </p>
                </td>

                <td className="max-w-xs px-4 py-4 text-body">
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
                      <span>Uncategorized</span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <BlogStatusBadge status={blog.status} />
                </td>

                <td className="px-4 py-4 text-body">{blog.views}</td>

                <td className="px-4 py-4 text-body">
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/blogs/${blog._id}`}
                      className="rounded-full border border-stroke px-4 py-2 text-caption-2 font-semibold text-heading"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/blogs/${blog._id}/edit`}
                      className="rounded-full bg-primary px-4 py-2 text-caption-2 font-semibold text-primary-foreground"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}