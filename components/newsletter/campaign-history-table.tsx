import type { NewsletterCampaignDocument } from "@/types/newsletter";

type CampaignHistoryTableProps = {
  campaigns: NewsletterCampaignDocument[];
};

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleString();
}

export function CampaignHistoryTable({ campaigns }: CampaignHistoryTableProps) {
  if (campaigns.length === 0) {
    return (
      <div className="rounded-sm border border-stroke bg-card p-6 text-caption-1 text-body">
        No campaigns sent yet.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {campaigns.map((campaign) => (
          <article
            key={campaign._id}
            className="rounded-sm border border-stroke bg-card p-4"
          >
            <div className="min-w-0">
              <h2 className="truncate text-body-3 font-semibold text-heading">
                {campaign.subject}
              </h2>

              {campaign.previewText ? (
                <p className="mt-1 line-clamp-2 text-caption-2 text-body">
                  {campaign.previewText}
                </p>
              ) : null}
            </div>

            <div className="mt-4 grid gap-2 text-caption-1">
              <div className="flex justify-between gap-4">
                <span className="text-body">Sent</span>
                <span className="font-semibold text-heading">
                  {campaign.sentCount}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-body">Failed</span>
                <span className="font-semibold text-heading">
                  {campaign.failedCount}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-body">Date</span>
                <span className="text-end font-semibold text-heading">
                  {formatDate(campaign.sentAt)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-body">Status</span>
                <span className="rounded-sm bg-secondary-background px-3 py-1 text-caption-2 font-semibold text-heading">
                  {campaign.status}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden w-full overflow-x-auto rounded-sm border border-stroke bg-card md:block">
        <table className="w-full min-w-[720px] text-start text-caption-1">
          <thead className="border-b border-stroke bg-secondary-background text-heading">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">Subject</th>
              <th className="px-4 py-3 text-start font-semibold">Sent</th>
              <th className="px-4 py-3 text-start font-semibold">Failed</th>
              <th className="px-4 py-3 text-start font-semibold">Date</th>
              <th className="px-4 py-3 text-start font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke">
            {campaigns.map((campaign) => (
              <tr
                key={campaign._id}
                className="transition-colors hover:bg-secondary-background"
              >
                <td className="max-w-sm px-4 py-4">
                  <p className="truncate font-semibold text-heading">
                    {campaign.subject}
                  </p>
                  {campaign.previewText ? (
                    <p className="mt-1 line-clamp-1 text-caption-2 text-body">
                      {campaign.previewText}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-4 text-body">{campaign.sentCount}</td>
                <td className="px-4 py-4 text-body">{campaign.failedCount}</td>
                <td className="px-4 py-4 text-body">
                  {formatDate(campaign.sentAt)}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-sm bg-secondary-background px-3 py-1 text-caption-2 font-semibold text-heading">
                    {campaign.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}