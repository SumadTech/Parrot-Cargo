import { getNewsletterSubscribers } from "@/lib/newsletter";

function csvValue(value: string | number | null | undefined) {
  const text = value === null || value === undefined ? "" : String(value);

  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const subscribers = await getNewsletterSubscribers();

  const header = [
    "Email",
    "Status",
    "Source",
    "Subscribed At",
    "Unsubscribed At",
    "Last Email Sent At",
    "Created At",
  ];

  const rows = subscribers.map((subscriber) => [
    subscriber.email,
    subscriber.status,
    subscriber.source,
    subscriber.subscribedAt,
    subscriber.unsubscribedAt,
    subscriber.lastEmailSentAt,
    subscriber.createdAt,
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((value) => csvValue(value)).join(","))
    .join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-subscribers.csv"`,
    },
  });
}
