import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-heading-4 text-heading">{title}</h1>

        {description ? (
          <p className="mt-2 max-w-2xl text-caption-1 text-body">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="w-full sm:w-auto">{action}</div> : null}
    </div>
  );
}