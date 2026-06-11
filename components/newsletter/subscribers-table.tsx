"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ConfirmationModal } from "@/components/common/confirmation-modal";
import { SubscriberStatusBadge } from "@/components/newsletter/subscriber-status-badge";
import type { SubscriberDocument, SubscriberStatus } from "@/types/newsletter";

type SubscribersTableProps = {
  subscribers: SubscriberDocument[];
};

type PendingAction =
  | {
      type: "delete";
      subscriber: SubscriberDocument;
    }
  | {
      type: "unsubscribe";
      subscriber: SubscriberDocument;
    }
  | null;

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString();
}

export function SubscribersTable({ subscribers }: SubscribersTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  async function updateStatus(id: string, status: SubscriberStatus) {
    setLoadingId(id);

    try {
      const response = await fetch("/api/admin/newsletter/subscribers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;

        throw new Error(result?.message || "Failed to update subscriber.");
      }

      router.refresh();
    } finally {
      setLoadingId("");
    }
  }

  async function deleteSubscriber(id: string) {
    setLoadingId(id);

    try {
      const response = await fetch(`/api/admin/newsletter/subscribers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;

        throw new Error(result?.message || "Failed to delete subscriber.");
      }

      router.refresh();
    } finally {
      setLoadingId("");
    }
  }

  async function confirmPendingAction() {
    if (!pendingAction) return;

    if (pendingAction.type === "delete") {
      await deleteSubscriber(pendingAction.subscriber._id);
    }

    if (pendingAction.type === "unsubscribe") {
      await updateStatus(pendingAction.subscriber._id, "unsubscribed");
    }

    setPendingAction(null);
  }

  if (subscribers.length === 0) {
    return (
      <div className="rounded-sm border border-stroke bg-card p-8 text-center">
        <h2 className="text-body-3 font-semibold text-heading">
          No subscribers found
        </h2>
        <p className="mt-2 text-caption-1 text-body">
          Try changing the selected filters or wait for new newsletter signups.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {subscribers.map((subscriber) => (
          <article
            key={subscriber._id}
            className="rounded-sm border border-stroke bg-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="break-words text-body-3 font-semibold text-heading">
                  {subscriber.email}
                </h2>
                <p className="mt-1 text-caption-2 text-body">
                  Joined {formatDate(subscriber.subscribedAt)}
                </p>
              </div>

              <SubscriberStatusBadge status={subscriber.status} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={
                  loadingId === subscriber._id ||
                  subscriber.status === "subscribed"
                }
                onClick={() => updateStatus(subscriber._id, "subscribed")}
                className="inline-flex min-h-10 items-center justify-center rounded-sm border border-stroke bg-card px-3 text-caption-2 font-semibold text-heading transition-colors hover:bg-secondary-background disabled:cursor-not-allowed disabled:opacity-60"
              >
                Subscribe
              </button>

              <button
                type="button"
                disabled={
                  loadingId === subscriber._id ||
                  subscriber.status === "unsubscribed"
                }
                onClick={() =>
                  setPendingAction({
                    type: "unsubscribe",
                    subscriber,
                  })
                }
                className="inline-flex min-h-10 items-center justify-center rounded-sm border border-stroke bg-card px-3 text-caption-2 font-semibold text-heading transition-colors hover:bg-secondary-background disabled:cursor-not-allowed disabled:opacity-60"
              >
                Unsubscribe
              </button>

              <button
                type="button"
                disabled={loadingId === subscriber._id}
                onClick={() =>
                  setPendingAction({
                    type: "delete",
                    subscriber,
                  })
                }
                className="inline-flex min-h-10 items-center justify-center rounded-sm bg-red-600 px-3 text-caption-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden w-full overflow-x-auto rounded-sm border border-stroke bg-card md:block">
        <table className="w-full min-w-[880px] text-start text-caption-1">
          <thead className="border-b border-stroke bg-secondary-background text-heading">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">Email</th>
              <th className="px-4 py-3 text-start font-semibold">Status</th>
              <th className="px-4 py-3 text-start font-semibold">Source</th>
              <th className="px-4 py-3 text-start font-semibold">Joined</th>
              <th className="px-4 py-3 text-start font-semibold">
                Last Email
              </th>
              <th className="px-4 py-3 text-start font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke">
            {subscribers.map((subscriber) => (
              <tr
                key={subscriber._id}
                className="transition-colors hover:bg-secondary-background"
              >
                <td className="max-w-xs px-4 py-4 font-semibold text-heading">
                  <span className="break-words">{subscriber.email}</span>
                </td>
                <td className="px-4 py-4">
                  <SubscriberStatusBadge status={subscriber.status} />
                </td>
                <td className="px-4 py-4 text-body">{subscriber.source}</td>
                <td className="px-4 py-4 text-body">
                  {formatDate(subscriber.subscribedAt)}
                </td>
                <td className="px-4 py-4 text-body">
                  {formatDate(subscriber.lastEmailSentAt)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={
                        loadingId === subscriber._id ||
                        subscriber.status === "subscribed"
                      }
                      onClick={() => updateStatus(subscriber._id, "subscribed")}
                      className="inline-flex min-h-10 items-center justify-center rounded-sm border border-stroke bg-card px-3 text-caption-2 font-semibold text-heading transition-colors hover:bg-secondary-background disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Subscribe
                    </button>

                    <button
                      type="button"
                      disabled={
                        loadingId === subscriber._id ||
                        subscriber.status === "unsubscribed"
                      }
                      onClick={() =>
                        setPendingAction({
                          type: "unsubscribe",
                          subscriber,
                        })
                      }
                      className="inline-flex min-h-10 items-center justify-center rounded-sm border border-stroke bg-card px-3 text-caption-2 font-semibold text-heading transition-colors hover:bg-secondary-background disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Unsubscribe
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${subscriber.email}`}
                      disabled={loadingId === subscriber._id}
                      onClick={() =>
                        setPendingAction({
                          type: "delete",
                          subscriber,
                        })
                      }
                      className="grid size-10 place-items-center rounded-sm bg-red-600 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        open={Boolean(pendingAction)}
        title={
          pendingAction?.type === "delete"
            ? "Delete subscriber?"
            : "Unsubscribe subscriber?"
        }
        description={
          pendingAction?.type === "delete"
            ? `Are you sure you want to delete ${pendingAction.subscriber.email}? This action cannot be undone.`
            : `Are you sure you want to unsubscribe ${pendingAction?.subscriber.email}? They will no longer receive newsletter campaigns.`
        }
        confirmLabel={
          pendingAction?.type === "delete" ? "Delete" : "Unsubscribe"
        }
        variant={pendingAction?.type === "delete" ? "danger" : "default"}
        isLoading={Boolean(loadingId)}
        onConfirm={confirmPendingAction}
        onClose={() => {
          if (loadingId) return;
          setPendingAction(null);
        }}
      />
    </>
  );
}