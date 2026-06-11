"use client";

import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";

import { NewsletterSuccessModal } from "@/components/newsletter/newsletter-success-modal";

type FormState = "idle" | "loading" | "success" | "error";

type NewsletterSubscribeFormProps = {
  emailLabel: string;
  placeholder: string;
  submitLabel: string;
};

export function NewsletterSubscribeForm({
  emailLabel,
  placeholder,
  submitLabel,
}: NewsletterSubscribeFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      email: String(formData.get("email") || ""),
      website: String(formData.get("website") || ""),
      source: "footer",
    };

    setFormState("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.message || "Failed to subscribe.");
      }

      const message = result?.message || "Thanks for subscribing.";

      setFormState("success");
      setFeedback(message);
      setSuccessModalOpen(true);
      form.reset();
    } catch (error) {
      setFormState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Failed to subscribe. Please try again.",
      );
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 sm:flex-row lg:justify-end"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          {emailLabel}
        </label>

        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder={placeholder}
          disabled={formState === "loading"}
          className="min-h-12 w-full rounded-full border border-primary-foreground/10 bg-primary-foreground/20 px-5 text-caption-1 text-primary-foreground placeholder:text-primary-foreground/70 outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/40 disabled:cursor-not-allowed disabled:opacity-70 sm:max-w-82.5"
        />

        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={formState === "loading"}
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-card py-1.5 pe-1.5 ps-5 text-caption-2 font-semibold text-primary transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {formState === "loading" ? "Subscribing..." : submitLabel}

          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-primary-foreground rtl:group-hover:-translate-x-0.5">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </button>
      </form>

      {feedback && formState === "error" ? (
        <p className="mt-3 text-caption-1 text-secondary" role="status">
          {feedback}
        </p>
      ) : null}

      <NewsletterSuccessModal
        open={successModalOpen}
        message={feedback}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  );
}