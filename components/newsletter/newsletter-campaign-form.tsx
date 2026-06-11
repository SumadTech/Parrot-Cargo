"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { ConfirmationModal } from "@/components/common/confirmation-modal";

type NewsletterCampaignFormProps = {
  activeSubscribersCount: number;
};

type CampaignPayload = {
  subject: string;
  previewText: string;
  content: string;
};

export function NewsletterCampaignForm({
  activeSubscribersCount,
}: NewsletterCampaignFormProps) {
  const [isSending, setIsSending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<CampaignPayload | null>(
    null,
  );
  const [pendingForm, setPendingForm] = useState<HTMLFormElement | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (activeSubscribersCount === 0) {
      toast.error("There are no active subscribers to email.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      subject: String(formData.get("subject") || ""),
      previewText: String(formData.get("previewText") || ""),
      content: String(formData.get("content") || ""),
    };

    setPendingPayload(payload);
    setPendingForm(form);
    setConfirmOpen(true);
  }

  async function sendCampaign() {
    if (!pendingPayload) return;

    setIsSending(true);

    try {
      const response = await fetch("/api/admin/newsletter/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pendingPayload),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
        campaign?: {
          sentCount: number;
          failedCount: number;
        };
      } | null;

      if (!response.ok) {
        throw new Error(result?.message || "Failed to send campaign.");
      }

      toast.success(
        `Campaign sent to ${result?.campaign?.sentCount ?? 0} subscriber${
          result?.campaign?.sentCount === 1 ? "" : "s"
        }.`,
      );

      pendingForm?.reset();
      setConfirmOpen(false);
      setPendingPayload(null);
      setPendingForm(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send campaign. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-sm border border-stroke bg-card p-4 sm:p-6"
      >
        <div>
          <h2 className="text-body-3 font-semibold text-heading">
            Send Email Campaign
          </h2>

          <p className="mt-2 text-caption-1 text-body">
            This sends one email to every active subscriber and includes an
            unsubscribe link automatically.
          </p>
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="campaign-subject"
            className="text-caption-2 font-semibold text-heading"
          >
            Subject
          </label>
          <input
            id="campaign-subject"
            name="subject"
            required
            maxLength={120}
            placeholder="Latest logistics update from Parrot Cargo"
            className="min-h-11 w-full rounded-sm border border-stroke bg-background px-3 text-caption-1 text-heading outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="campaign-preview"
            className="text-caption-2 font-semibold text-heading"
          >
            Preview text
          </label>
          <input
            id="campaign-preview"
            name="previewText"
            maxLength={160}
            placeholder="Short text shown in email inbox preview"
            className="min-h-11 w-full rounded-sm border border-stroke bg-background px-3 text-caption-1 text-heading outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="campaign-content"
            className="text-caption-2 font-semibold text-heading"
          >
            Content
          </label>
          <textarea
            id="campaign-content"
            name="content"
            required
            rows={9}
            placeholder="Write the campaign content here..."
            className="w-full rounded-sm border border-stroke bg-background px-3 py-3 text-caption-1 text-heading outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          disabled={isSending || activeSubscribersCount === 0}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
        >
          {isSending ? "Sending Campaign..." : "Send Campaign"}
        </button>
      </form>

      <ConfirmationModal
        open={confirmOpen}
        title="Send newsletter campaign?"
        description={`This campaign will be sent to ${activeSubscribersCount} active subscriber${
          activeSubscribersCount === 1 ? "" : "s"
        }. This action cannot be undone.`}
        confirmLabel="Send Campaign"
        isLoading={isSending}
        onConfirm={sendCampaign}
        onClose={() => {
          if (isSending) return;
          setConfirmOpen(false);
        }}
      />
    </>
  );
}