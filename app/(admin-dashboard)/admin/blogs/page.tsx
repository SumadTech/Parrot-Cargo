import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogAdminToolbar } from "@/components/blog/blog-admin-toolbar";
import { BlogTable } from "@/components/blog/blog-table";
import { getAdminBlogCategories, getAdminBlogs } from "@/lib/blog";
import type { BlogStatus } from "@/types/blog";

type AdminBlogsPageProps = {
  searchParams: Promise<{
    status?: string;
    category?: string;
    q?: string;
  }>;
};

const blogStatuses: BlogStatus[] = ["draft", "published", "archived"];

function getValidStatus(status?: string): BlogStatus | undefined {
  if (!status) return undefined;

  return blogStatuses.includes(status as BlogStatus)
    ? (status as BlogStatus)
    : undefined;
}

export default async function AdminBlogsPage({
  searchParams,
}: AdminBlogsPageProps) {
  const params = await searchParams;

  const selectedStatus = getValidStatus(params.status);
  const selectedCategory = params.category;
  const search = params.q?.trim();

  const [blogs, categories] = await Promise.all([
    getAdminBlogs(selectedStatus, selectedCategory, search),
    getAdminBlogCategories(),
  ]);

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Blogs"
        description="View, publish, draft, and archive blog articles."
        action={
          <Link
            href="/admin/blogs/new"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            New Blog
          </Link>
        }
      />

      <BlogAdminToolbar
        categories={categories}
        selectedStatus={selectedStatus}
        selectedCategory={selectedCategory}
        search={search}
      />

      <BlogTable blogs={blogs} />
    </div>
  );
}