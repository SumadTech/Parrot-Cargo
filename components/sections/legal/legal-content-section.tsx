import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { legalPages, type LegalPageKey } from "@/data/legal-pages";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type LegalContentSectionProps = {
  pageKey: LegalPageKey;
};

function slugify(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function LegalContentSection({ pageKey }: LegalContentSectionProps) {
  const t = useTranslations(`legalPages.${pageKey}`);
  const sections = legalPages[pageKey];

  return (
    <Section className="bg-background">
      <Container>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start xl:gap-16">
          <MotionWrapper className="min-w-0">
            <article className="max-w-4xl text-body-3 leading-8 text-heading">
              {sections.map((section, index) => {
                const sectionId = slugify(section.key);

                return (
                  <section
                    key={section.key}
                    id={sectionId}
                    className={cn(
                      "scroll-mt-32",
                      index > 0 ? "mt-8 border-t border-stroke pt-7" : "",
                    )}
                  >
                    <h2 className="text-heading-5 font-semibold leading-tight text-heading sm:text-heading-4">
                      {index + 1}. {t(`sections.${section.key}.title`)}
                    </h2>

                    <div className="mt-5 grid gap-5">
                      {section.blocks?.map((block) => (
                        <div key={block.key} className="grid gap-3">
                          {t.has(
                            `sections.${section.key}.blocks.${block.key}.title`,
                          ) ? (
                            <h3 className="text-body-2 font-semibold leading-snug text-heading">
                              {t(
                                `sections.${section.key}.blocks.${block.key}.title`,
                              )}
                            </h3>
                          ) : null}

                          {t.has(
                            `sections.${section.key}.blocks.${block.key}.description`,
                          ) ? (
                            <p className="max-w-3xl text-body-3 leading-8 text-body">
                              {t(
                                `sections.${section.key}.blocks.${block.key}.description`,
                              )}
                            </p>
                          ) : null}

                          {block.list ? (
                            <ul className="grid list-disc gap-2 ps-6 text-body-3 leading-8 text-body">
                              {block.list.map((item) => (
                                <li key={item.key}>
                                  {t(
                                    `sections.${section.key}.blocks.${block.key}.items.${item.key}`,
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          {block.paragraphs?.length ? (
                            <div className="grid gap-4">
                              {block.paragraphs.map((paragraph) => (
                                <p
                                  key={paragraph.key}
                                  className="max-w-3xl text-body-3 leading-8 text-body"
                                >
                                  {t(
                                    `sections.${section.key}.blocks.${block.key}.paragraphs.${paragraph.key}`,
                                  )}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </article>
          </MotionWrapper>

          <aside className="min-w-0 border-s border-primary ps-4 lg:sticky lg:top-5 lg:self-start">
            <nav aria-label={t("navLabel")} className="grid gap-3">
              {sections.map((section, index) => (
                <a
                  key={section.key}
                  href={`#${slugify(section.key)}`}
                  className={cn(
                    "text-caption-1 leading-6 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    index === 0 ? "font-semibold text-heading" : "text-body",
                  )}
                >
                  {t(`sections.${section.key}.title`)}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </Container>
    </Section>
  );
}