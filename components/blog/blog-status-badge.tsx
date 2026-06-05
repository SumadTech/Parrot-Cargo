import type { BlogStatus } from "@/types/blog";

const statusLabel: Record<BlogStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

type BlogStatusBadgeProps = {
  status: BlogStatus;
};

export function BlogStatusBadge({ status }: BlogStatusBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-stroke bg-secondary-background px-3 py-1 text-caption-2 font-semibold text-heading">
      {statusLabel[status]}
    </span>
  );
}