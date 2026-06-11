"use client";

import { AlertTriangle, X } from "lucide-react";

type ConfirmationModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: "default" | "danger";
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmationModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
  variant = "default",
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  if (!open) return null;

  const isDanger = variant === "danger";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md animate-in zoom-in-95 fade-in-0 rounded-sm border border-stroke bg-card shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-stroke p-5">
          <div className="flex gap-3">
            <span
              className={[
                "grid size-11 shrink-0 place-items-center rounded-full",
                isDanger
                  ? "bg-red-50 text-red-600"
                  : "bg-secondary-background text-primary",
              ].join(" ")}
            >
              <AlertTriangle className="size-5" aria-hidden="true" />
            </span>

            <div>
              <h2 className="text-body-3 font-semibold text-heading">
                {title}
              </h2>
              <p className="mt-2 text-caption-1 text-body">{description}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="grid size-9 shrink-0 place-items-center rounded-sm text-body transition-colors hover:bg-secondary-background hover:text-heading disabled:pointer-events-none disabled:opacity-60"
            aria-label="Close modal"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col-reverse gap-3 p-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-stroke bg-card px-5 text-caption-1 font-semibold text-heading transition-colors hover:bg-secondary-background disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={[
              "inline-flex min-h-11 w-full items-center justify-center rounded-sm px-5 text-caption-1 font-semibold text-white transition-colors disabled:pointer-events-none disabled:opacity-60 sm:w-auto",
              isDanger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary hover:bg-blue-normal-hover",
            ].join(" ")}
          >
            {isLoading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}