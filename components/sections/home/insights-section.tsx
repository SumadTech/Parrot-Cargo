import { Container } from "@/components/common/container";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Section } from "@/components/common/section";
import { getPublishedBlogs } from "@/lib/blog";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

function formatTimeAgo(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / 1000 / 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }

  if (diffDays === 1) {
    return "1 day ago";
  }

  return `${diffDays} days ago`;
}

export async function InsightsSection() {
  const t = await getTranslations("homeInsights");

  const blogs = await getPublishedBlogs();
  const featuredBlogs = blogs.filter((blog) => blog.featured).slice(0, 3);

  if (!featuredBlogs.length) {
    return null;
  }

  const [mainPost, ...sidePosts] = featuredBlogs;

  return (
    <Section className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,1fr)] lg:items-stretch xl:gap-8">
          <MotionWrapper>
            <Link
              href={`/blogs/${mainPost.slug}`}
              className="group block h-full rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <article className="relative min-h-80 overflow-hidden rounded-sm border border-stroke bg-card shadow-sm sm:min-h-97.5 lg:min-h-full">
                {mainPost.coverImageUrl ? (
                  <Image
                    src={mainPost.coverImageUrl}
                    alt={mainPost.coverImageAlt || mainPost.title}
                    fill
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}

                <div className="absolute inset-0 bg-media-card-overlay-soft" />
                <div className="absolute inset-0 bg-linear-to-t from-media-card-overlay via-media-card-overlay-soft to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="max-w-md text-body-2 font-semibold text-media-card-foreground sm:text-body-1 lg:text-body-2">
                      {mainPost.title}
                    </h3>

                    <span className="hidden shrink-0 items-center gap-3 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 py-1.5 pe-1.5 ps-4 text-caption-2 font-medium text-media-card-foreground backdrop-blur-sm transition-colors duration-300 group-hover:bg-primary-foreground group-hover:text-primary sm:inline-flex">
                      {t("readMore")}
                      <span className="grid size-8 place-items-center rounded-full bg-primary-foreground text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </span>

                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground text-primary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground sm:hidden">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </MotionWrapper>

          <MotionWrapper delay={0.12}>
            <div className="flex h-full flex-col">
              <div className="max-w-2xl">
                <p className="text-caption-1 font-medium text-secondary">
                  {t("eyebrow")}
                </p>

                <h2 className="mt-3 text-heading-4 text-heading sm:text-heading-3">
                  {t("title")}
                </h2>
              </div>

              <div className="mt-6 grid flex-1 content-between gap-5 sm:gap-6">
                {sidePosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blogs/${post.slug}`}
                    className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <article className="grid grid-cols-1 gap-4 rounded-sm transition-transform duration-300 group-hover:-translate-y-1 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-center lg:grid-cols-[minmax(0,1fr)_160px]">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-caption-2 text-body">
                          {post.category ? (
                            <span className="font-semibold text-heading">
                              {post.category}
                            </span>
                          ) : null}

                          {post.category ? (
                            <span
                              className="size-1.5 rounded-full bg-secondary"
                              aria-hidden="true"
                            />
                          ) : null}

                          {post.publishedAt ? (
                            <time dateTime={post.publishedAt}>
                              {formatTimeAgo(post.publishedAt)}
                            </time>
                          ) : null}
                        </div>

                        <h3 className="mt-3 line-clamp-2 text-body-3 font-semibold text-heading transition-colors duration-300 group-hover:text-primary">
                          {post.title}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-caption-1 text-body sm:line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="relative min-h-45 overflow-hidden rounded-md border border-stroke bg-card sm:min-h-30">
                        {post.coverImageUrl ? (
                          <Image
                            src={post.coverImageUrl}
                            alt={post.coverImageAlt || post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 160px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : null}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </Section>
  );
}