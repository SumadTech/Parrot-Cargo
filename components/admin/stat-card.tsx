import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
};

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <article className="min-w-0 rounded-sm border border-stroke bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-caption-2 font-medium text-body">{label}</p>
          <p className="mt-2 wrap-break-word text-body-2 font-semibold text-heading">
            {value}
          </p>
        </div>

        {icon ? (
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary-background text-secondary">
            {icon}
          </div>
        ) : null}
      </div>
    </article>
  );
}