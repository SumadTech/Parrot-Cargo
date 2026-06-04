import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { galleryColumns } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function GallerySection() {
  const t = useTranslations("galleryPage");

  return (
    <Section className="bg-background">
      <Container>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {galleryColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="grid content-start gap-5 lg:gap-6">
              {column.map((image, index) => (
                <MotionWrapper
                  key={`${image.id}-${image.src}`}
                  delay={(columnIndex + index) * 0.04}
                >
                  <figure
                    className={cn(
                      "group relative overflow-hidden rounded-sm border border-stroke bg-surface-secondary shadow-sm",
                      image.className,
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={t(`images.${image.altKey}`)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-media-card-overlay-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </figure>
                </MotionWrapper>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}