import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CampaignHistoryTable } from "@/components/newsletter/campaign-history-table";
import { getNewsletterCampaigns, getNewsletterStats } from "@/lib/newsletter";

export default async function AdminCampaignsPage() {
  const [campaigns, stats] = await Promise.all([
    getNewsletterCampaigns(),
    getNewsletterStats(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Newsletter Campaigns"
        description="View campaign history and create a new campaign for active subscribers."
        action={
          <Link
            href="/admin/campaigns/new"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
          >
            New Campaign
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-sm border border-stroke bg-card p-4">
          <p className="text-caption-2 font-semibold text-body">
            Active Subscribers
          </p>
          <p className="mt-2 text-heading-4 text-heading">
            {stats.subscribed}
          </p>
        </div>

        <div className="rounded-sm border border-stroke bg-card p-4">
          <p className="text-caption-2 font-semibold text-body">
            Campaigns Sent
          </p>
          <p className="mt-2 text-heading-4 text-heading">
            {campaigns.length}
          </p>
        </div>

        <div className="rounded-sm border border-stroke bg-card p-4">
          <p className="text-caption-2 font-semibold text-body">
            Total Subscribers
          </p>
          <p className="mt-2 text-heading-4 text-heading">{stats.total}</p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="mt-1 text-caption-1 text-body">
            The latest email campaigns sent from this dashboard.
          </p>
        </div>

        <CampaignHistoryTable campaigns={campaigns} />
      </section>
    </div>
  );
}