import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogTable } from "@/components/blog/blog-table";
import { getAdminBlogs } from "@/lib/blog";

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Blogs"
        description="View, edit, publish, draft, and archive blog articles."
        action={
          <Link
            href="/admin/blogs/new"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            New Blog
          </Link>
        }
      />

      <BlogTable blogs={blogs} />
    </div>
  );
}