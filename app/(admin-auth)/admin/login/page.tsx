"use client";

import { Eye, EyeOff, Loader2, Lock, Mail, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
});

type FormValues = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof FormValues, string>>;

function getApiErrorMessage(data: unknown): string {
  if (typeof data === "object" && data !== null) {
    const maybe = data as Record<string, unknown>;

    if (typeof maybe.message === "string" && maybe.message.trim().length > 0) {
      return maybe.message;
    }
  }

  return "Login failed. Please check your credentials and try again.";
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function setField<K extends keyof FormValues>(key: K, next: FormValues[K]) {
    setValues((prev) => ({
      ...prev,
      [key]: next,
    }));

    setFieldErrors((prev) => {
      if (!prev[key]) return prev;

      const { [key]: _removed, ...rest } = prev;
      console.log(_removed)
      return rest;
    });

    if (serverError) setServerError(null);
  }

  function validate(v: FormValues) {
    const parsed = schema.safeParse(v);

    if (parsed.success) {
      return {
        ok: true as const,
        data: parsed.data,
      };
    }

    const errors: FieldErrors = {};

    for (const issue of parsed.error.issues) {
      const key = issue.path[0];

      if ((key === "email" || key === "password") && !errors[key]) {
        errors[key] = issue.message;
      }
    }

    return {
      ok: false as const,
      errors,
    };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setServerError(null);

    const result = validate(values);

    if (!result.ok) {
      setFieldErrors(result.errors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data: unknown = await res.json().catch(() => ({}));
        setServerError(getApiErrorMessage(data));
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const emailError = fieldErrors.email;
  const passwordError = fieldErrors.password;

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-heading sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-md items-center">
        <section className="w-full rounded-sm border border-stroke bg-card p-5 shadow-sm sm:p-7">
          <div className="text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
              <Lock className="size-6" aria-hidden="true" />
            </div>

            <h1 className="mt-5 text-heading-4 text-heading">
              Admin Login
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-caption-1 text-body">
              Sign in to manage Parrot Cargo blog content.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 grid gap-5">
            {serverError ? (
              <div className="flex gap-3 rounded-sm border border-destructive bg-card p-4 text-destructive">
                <ShieldAlert className="mt-0.5 size-5 shrink-0" />
                <p className="text-caption-1 text-destructive">
                  {serverError}
                </p>
              </div>
            ) : null}

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-caption-1 font-medium text-heading"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute inset-s-4 top-1/2 size-4 -translate-y-1/2 text-body" />

                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="admin@parrot.com"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={!!emailError}
                  className={cn(
                    "min-h-12 w-full rounded-sm border border-input bg-background px-4 ps-11 text-caption-1 text-heading outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20",
                    emailError &&
                      "border-destructive focus:border-destructive focus:ring-destructive/20",
                  )}
                />
              </div>

              {emailError ? (
                <p className="text-caption-2 text-destructive">{emailError}</p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="password"
                className="text-caption-1 font-medium text-heading"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="pointer-events-none absolute inset-s-4 top-1/2 size-4 -translate-y-1/2 text-body" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={(e) => setField("password", e.target.value)}
                  aria-invalid={!!passwordError}
                  className={cn(
                    "min-h-12 w-full rounded-sm border border-input bg-background px-4 ps-11 pe-12 text-caption-1 text-heading outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20",
                    passwordError &&
                      "border-destructive focus:border-destructive focus:ring-destructive/20",
                  )}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-e-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-sm text-body transition-colors hover:bg-accent hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {passwordError ? (
                <p className="text-caption-2 text-destructive">
                  {passwordError}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="me-2 size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}