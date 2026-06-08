"use client";

import { AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BlogDeleteButtonProps = {
  blogId: string;
};

export function BlogDeleteButton({ blogId }: BlogDeleteButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDelete() {
    setIsDeleting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = (await response.json()) as {
          message?: string;
        };

        throw new Error(data.message ?? "Failed to delete blog.");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete blog. Please try again.",
      );
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isDeleting}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-red-600 px-4 text-caption-1 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
      >
        Delete
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-blog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
        >
          <div className="w-full max-w-md rounded-sm border border-stroke bg-card shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-stroke p-5">
              <div className="flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle className="size-5" />
                </span>

                <div>
                  <h2
                    id="delete-blog-title"
                    className="text-body-2 font-semibold text-heading"
                  >
                    Delete blog
                  </h2>

                  <p className="mt-1 text-caption-1 text-body">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="grid size-9 place-items-center rounded-sm text-body transition-colors hover:bg-secondary-background disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Close delete confirmation"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-5">
              <p className="text-caption-1 text-body">
                Are you sure you want to delete this blog? Once deleted, it will
                be removed permanently.
              </p>

              {errorMessage ? (
                <p className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-caption-1 font-medium text-red-700">
                  {errorMessage}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-stroke p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-stroke bg-card px-4 text-caption-1 font-semibold text-heading transition-colors hover:bg-secondary-background disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex min-h-11 items-center justify-center rounded-sm bg-red-600 px-4 text-caption-1 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete blog"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}