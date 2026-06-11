"use client";

import { CheckCircle2, X } from "lucide-react";

type NewsletterSuccessModalProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export function NewsletterSuccessModal({
  open,
  message,
  onClose,
}: NewsletterSuccessModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md animate-in zoom-in-95 fade-in-0 slide-in-from-bottom-4 overflow-hidden rounded-sm border border-primary-foreground/10 bg-card p-6 text-center shadow-2xl duration-300">
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-e-3 top-3 grid size-9 place-items-center rounded-full text-body transition-colors hover:bg-secondary-background hover:text-heading"
          aria-label="Close success message"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="mx-auto grid size-20 animate-in zoom-in-50 place-items-center rounded-full bg-green-50 text-green-600 duration-500">
          <CheckCircle2 className="size-10" aria-hidden="true" />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-heading">
          Successfully Subscribed!
        </h2>

        <p className="mt-3 text-caption-1 text-body">
          {message || "Thanks for subscribing to our newsletter."}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
        >
          Great, thanks
        </button>
      </div>
    </div>
  );
}