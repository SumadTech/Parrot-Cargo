import Link from "next/link";
import {
  Archive,
  Eye,
  FileText,
  Mail,
  Megaphone,
  Newspaper,
  Send,
  Users,
} from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getAdminBlogs } from "@/lib/blog";
import { getNewsletterCampaigns, getNewsletterStats } from "@/lib/newsletter";

export default async function AdminDashboardPage() {
  const [blogs, newsletterStats, campaigns] = await Promise.all([
    getAdminBlogs(),
    getNewsletterStats(),
    getNewsletterCampaigns(),
  ]);

  const total = blogs.length;
  const published = blogs.filter((blog) => blog.status === "published").length;
  const drafts = blogs.filter((blog) => blog.status === "draft").length;
  const archived = blogs.filter((blog) => blog.status === "archived").length;
  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Manage Parrot Cargo blog content, newsletter subscribers, campaigns, publishing status, drafts, archived articles, views, and public articles."
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
          label="Archived"
          value={archived}
          icon={<Archive className="size-5" />}
        />

        <StatCard
          label="Total Views"
          value={totalViews}
          icon={<Eye className="size-5" />}
        />

        <StatCard
          label="Newsletter Subscribers"
          value={newsletterStats.total}
          icon={<Users className="size-5" />}
        />

        <StatCard
          label="Active Subscribers"
          value={newsletterStats.subscribed}
          icon={<Mail className="size-5" />}
        />

        <StatCard
          label="Campaigns Sent"
          value={campaigns.length}
          icon={<Megaphone className="size-5" />}
        />
      </section>
    </div>
  );
}