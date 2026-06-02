import { Container } from "@/components/common/container";
import Image, { type StaticImageData } from "next/image";

type PageHeroProps = {
  title: string;
  description?: string;
  image: StaticImageData;
};

export function PageHero({ title, description, image }: PageHeroProps) {
  return (
    <section className="relative min-h-105 overflow-hidden bg-heading text-white sm:min-h-120 lg:min-h-140">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-linear-to-r from-hero-overlay-strong via-hero-overlay to-hero-overlay-soft" />

      <Container>
        <div className="relative z-10 flex min-h-105 max-w-3xl flex-col justify-center pt-32 sm:min-h-120 lg:min-h-140 lg:pt-40">
          <h1 className="text-heading-1 text-white">{title}</h1>

          {description ? (
            <p className="mt-5 text-body-3 text-white/85">{description}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}