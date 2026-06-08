import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogDeleteButton } from "@/components/blog/blog-delete-button";
import { BlogStatusBadge } from "@/components/blog/blog-status-badge";
import { getBlogById } from "@/lib/blog";

type AdminBlogDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminBlogDetailsPage({
  params,
}: AdminBlogDetailsPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <nav className="flex flex-wrap items-center gap-2 text-caption-2 text-body">
          <Link
            href="/admin/blogs"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-stroke bg-card px-4 text-caption-1 font-semibold text-heading transition-colors hover:bg-secondary-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto">
            Back to list
          </Link>

          <Link
            href={`/admin/blogs/${blog._id}/edit`}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-4 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto">
            Edit
          </Link>

          <BlogDeleteButton blogId={blog._id ?? ""} />
        </nav>

        <AdminPageHeader title={blog.title} description={blog.excerpt} />
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0 rounded-sm border border-stroke bg-card p-4 sm:p-6">
          <BlogContent contentHtml={blog.contentHtml} />
        </article>

        <aside className="space-y-4">
          <section className="rounded-sm border border-stroke bg-card p-4">
            <h2 className="text-body-3 font-semibold text-heading">Details</h2>

            <dl className="mt-4 grid gap-3 text-caption-1">
              <div className="flex justify-between gap-4">
                <dt className="text-body">Status</dt>
                <dd>
                  <BlogStatusBadge status={blog.status} />
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-body">Views</dt>
                <dd className="font-semibold text-heading">{blog.views}</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-body">Reading time</dt>
                <dd className="font-semibold text-heading">
                  {blog.readingTimeMinutes} min
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-body">Featured</dt>
                <dd className="font-semibold text-heading">
                  {blog.featured ? "Yes" : "No"}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-body">Updated</dt>
                <dd className="font-semibold text-heading">
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-sm border border-stroke bg-card p-4">
            <h2 className="text-body-3 font-semibold text-heading">
              Categories
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {blog.categories.length ? (
                blog.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-secondary-background px-3 py-1.5 text-caption-2 font-semibold text-heading">
                    {category}
                  </span>
                ))
              ) : (
                <p className="text-caption-1 text-body">No categories</p>
              )}
            </div>
          </section>

          <section className="rounded-sm border border-stroke bg-card p-4">
            <h2 className="text-body-3 font-semibold text-heading">Tags</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.length ? (
                blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary-background px-3 py-1.5 text-caption-2 font-semibold text-heading">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-caption-1 text-body">No tags</p>
              )}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
