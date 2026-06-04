import { Breadcrumbs, type BreadcrumbItem } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import Image, { type StaticImageData } from "next/image";

type PageHeroProps = {
  title: string;
  image: StaticImageData;
  breadcrumbs: BreadcrumbItem[];
};

export function PageHero({ title, image, breadcrumbs }: PageHeroProps) {
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

      {/* <div className="absolute inset-0 bg-hero-overlay" /> */}
      <div className="absolute inset-0 bg-linear-to-r from-hero-overlay-strong via-hero-overlay to-hero-overlay-soft" />

      <Container>
        <div className="relative z-10 flex min-h-85 flex-col items-center justify-center pt-28 text-center sm:min-h-100 sm:pt-32 lg:min-h-115 lg:pt-36">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-heading-2 text-primary-foreground sm:text-heading-1">
              {title}
            </h1>

            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>
      </Container>
    </section>
  );
}