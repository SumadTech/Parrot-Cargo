import { Breadcrumbs, type BreadcrumbItem } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  image: StaticImageData | string;
  breadcrumbs: BreadcrumbItem[];
  align?: "center" | "left";
  children?: ReactNode;
  titleClassName?: string;
};

export function PageHero({
  title,
  image,
  breadcrumbs,
  align = "center",
  children,
  titleClassName,
}: PageHeroProps) {
  const isLeft = align === "left";

  return (
    <section className="relative min-h-85 overflow-hidden bg-heading text-primary-foreground sm:min-h-100 lg:min-h-115">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-hero-overlay-strong via-hero-overlay to-hero-overlay-soft" />

      <Container>
        <div
          className={cn(
            "relative z-10 flex min-h-85 flex-col justify-center pt-25 sm:min-h-100 sm:pt-20 lg:min-h-115 lg:pt-18",
            isLeft ? "items-start text-start" : "items-center text-center",
          )}
        >
            <Breadcrumbs items={breadcrumbs} />
          <div className={cn(isLeft ? "max-w-6xl" : "mx-auto max-w-6xl")}>
            <h1
              className={cn(
                "mt-5 text-heading-2 text-primary-foreground sm:text-heading-1",
                isLeft && "max-w-4xl",
                titleClassName,
              )}
            >
              {title}
            </h1>

            {children ? <div className="mt-5">{children}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}