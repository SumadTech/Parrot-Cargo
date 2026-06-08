import { cn } from "@/lib/utils";
import type { BlogStatus } from "@/types/blog";

const statusLabel: Record<BlogStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

const statusClassName: Record<BlogStatus, string> = {
  draft: "border-amber-200 bg-amber-50 text-amber-700",
  published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  archived: "border-slate-200 bg-slate-100 text-slate-600",
};

type BlogStatusBadgeProps = {
  status: BlogStatus;
};

export function BlogStatusBadge({ status }: BlogStatusBadgeProps) {
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