import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NewsletterCampaignForm } from "@/components/newsletter/newsletter-campaign-form";
import { getNewsletterStats } from "@/lib/newsletter";

export default async function NewCampaignPage() {
  const stats = await getNewsletterStats();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="New Campaign"
        description="Create and send a newsletter campaign to every active subscriber."
        action={
          <Link
            href="/admin/campaigns"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-stroke bg-card px-5 text-caption-1 font-semibold text-heading transition-colors hover:bg-secondary-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
          >
            Campaign History
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2">
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
            Unsubscribed
          </p>
          <p className="mt-2 text-heading-4 text-heading">
            {stats.unsubscribed}
          </p>
        </div>
      </section>

      <NewsletterCampaignForm activeSubscribersCount={stats.subscribed} />
    </div>
  );
}