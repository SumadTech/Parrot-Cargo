import { cn } from "@/lib/utils";
import type { SubscriberStatus } from "@/types/newsletter";

const statusLabel: Record<SubscriberStatus, string> = {
  subscribed: "Subscribed",
  unsubscribed: "Unsubscribed",
};

const statusClassName: Record<SubscriberStatus, string> = {
  subscribed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  unsubscribed: "border-slate-200 bg-slate-100 text-slate-600",
};

type SubscriberStatusBadgeProps = {
  status: SubscriberStatus;
};

export function SubscriberStatusBadge({ status }: SubscriberStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-3 py-1 text-caption-2 font-semibold",
        statusClassName[status],
      )}
    >
      {statusLabel[status]}
    </span>
  );
}
