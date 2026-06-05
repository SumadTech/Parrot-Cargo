import type { Metadata } from "next";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import { notFound } from "next/navigation";

import { BlogContent } from "@/components/blog/blog-content";
import { BlogDetailSidebar } from "@/components/blog/blog-detail-sidebar";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/sections/hero/page-hero";
import { CtaSection } from "@/components/sections/shared/cta-section";
import {
  addIdsToBlogHeadings,
  extractBlogHeadings,
} from "@/lib/blog-headings";
import { getPublishedBlogBySlug, getPublishedBlogs } from "@/lib/blog";
import heroImage from "@/public/images/hero/hero-air-cargo.png";

type BlogDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

function formatDate(value?: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Parrot Cargo",
    };
  }

  return {
    title: blog.seo.title || `${blog.title} | Parrot Cargo`,
    description: blog.seo.description || blog.excerpt,
  };
}

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;

  const [blog, blogs] = await Promise.all([
    getPublishedBlogBySlug(slug),
    getPublishedBlogs(),
  ]);

  if (!blog) {
    notFound();
  }

  const headings = extractBlogHeadings(blog.contentHtml);
  const contentHtml = addIdsToBlogHeadings(blog.contentHtml);

  return (
    <main>
      <PageHero
        title={blog.title}
        image={blog.coverImageUrl || heroImage}
        align="left"
        titleClassName="text-heading-3 sm:text-heading-2 [color:var(--text-foreground)]"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Blog",
            href: "/blogs",
          },
          {
            label: "Detail",
          },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-caption-1 text-primary-foreground/90">
          <span className="inline-flex items-center gap-2">
            <UserRound className="size-4" aria-hidden="true" />
            {blog.author.name}
          </span>

          {blog.publishedAt ? (
            <time
              dateTime={blog.publishedAt}
              className="inline-flex items-center gap-2"
            >
              <CalendarDays className="size-4" aria-hidden="true" />
              {formatDate(blog.publishedAt)}
            </time>
          ) : null}

          <span className="inline-flex pb-4 sm:pb-0 items-center gap-2">
            <Clock3 className="size-4" aria-hidden="true" />
            {blog.readingTimeMinutes} min read
          </span>
        </div>
      </PageHero>

      <section className="bg-background py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <article className="min-w-0">
              <BlogContent contentHtml={contentHtml} />
            </article>

            <BlogDetailSidebar
              headings={headings}
              recentPosts={blogs}
              currentSlug={blog.slug}
            />
          </div>
        </Container>
      </section>

      <CtaSection />
    </main>
  );
}