import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NewsletterAdminToolbar } from "@/components/newsletter/newsletter-admin-toolbar";
import { SubscribersTable } from "@/components/newsletter/subscribers-table";
import {
  getNewsletterCampaigns,
  getNewsletterStats,
  getNewsletterSubscribers,
} from "@/lib/newsletter";
import type { SubscriberStatus } from "@/types/newsletter";

type AdminNewsletterPageProps = {
  searchParams: Promise<{
    status?: string;
    q?: string;
  }>;
};

const subscriberStatuses: SubscriberStatus[] = ["subscribed", "unsubscribed"];

function getValidStatus(status?: string): SubscriberStatus | undefined {
  if (!status) return undefined;

  return subscriberStatuses.includes(status as SubscriberStatus)
    ? (status as SubscriberStatus)
    : undefined;
}

export default async function AdminNewsletterPage({
  searchParams,
}: AdminNewsletterPageProps) {
  const params = await searchParams;

  const selectedStatus = getValidStatus(params.status);
  const search = params.q?.trim();

  const [subscribers, stats, campaigns] = await Promise.all([
    getNewsletterSubscribers(selectedStatus, search),
    getNewsletterStats(),
    getNewsletterCampaigns(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Newsletter"
        description="Manage subscribers, export emails, and control newsletter status."
        action={
          <Link
            href="/admin/campaigns"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
          >
            Campaigns
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-sm border border-stroke bg-card p-4">
          <p className="text-caption-2 font-semibold text-body">
            Total Subscribers
          </p>
          <p className="mt-2 text-heading-4 text-heading">{stats.total}</p>
        </div>

        <div className="rounded-sm border border-stroke bg-card p-4">
          <p className="text-caption-2 font-semibold text-body">Active</p>
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

        <div className="rounded-sm border border-stroke bg-card p-4">
          <p className="text-caption-2 font-semibold text-body">
            Campaigns Sent
          </p>
          <p className="mt-2 text-heading-4 text-heading">
            {campaigns.length}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-body-2 font-semibold text-heading">
            Subscribers
          </h2>
          <p className="mt-1 text-caption-1 text-body">
            Search, filter, export, and manage newsletter subscribers.
          </p>
        </div>

        <NewsletterAdminToolbar
          selectedStatus={selectedStatus}
          search={search}
        />

        <SubscribersTable subscribers={subscribers} />
      </section>
    </div>
  );
}