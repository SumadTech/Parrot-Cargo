import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-background pt-28 lg:pt-36">
      <Section>
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="text-caption-1 font-semibold uppercase tracking-[0.2em] text-secondary">
              404
            </p>

            <h1 className="mt-4 text-heading-2 text-heading">
              Page not found
            </h1>

            <p className="mt-4 text-body-3 text-body">
              The page you are looking for does not exist or may have been
              moved.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-6 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}