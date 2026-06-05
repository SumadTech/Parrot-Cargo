import Link from "next/link";
import { Eye, FileText, Newspaper, Send } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getAdminBlogs } from "@/lib/blog";

export default async function AdminDashboardPage() {
  const blogs = await getAdminBlogs();

  const total = blogs.length;
  const published = blogs.filter((blog) => blog.status === "published").length;
  const drafts = blogs.filter((blog) => blog.status === "draft").length;
  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Manage Parrot Cargo blog content, publishing status, drafts, views, and public articles."
        action={
          <Link
            href="/admin/blogs/new"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            Create Blog
          </Link>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Blogs"
          value={total}
          icon={<Newspaper className="size-5" />}
        />

        <StatCard
          label="Published"
          value={published}
          icon={<Send className="size-5" />}
        />

        <StatCard
          label="Drafts"
          value={drafts}
          icon={<FileText className="size-5" />}
        />

        <StatCard
          label="Total Views"
          value={totalViews}
          icon={<Eye className="size-5" />}
        />
      </section>
    </div>
  );
}