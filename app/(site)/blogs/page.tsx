import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogCategoryFilter } from "@/components/blog/blog-category-filter";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/sections/hero/page-hero";
import { CtaSection } from "@/components/sections/shared/cta-section";
import { getPublishedBlogCategories, getPublishedBlogs } from "@/lib/blog";
import heroImage from "@/public/images/hero/hero-air-cargo.png";

type BlogsPageProps = {
  searchParams: Promise<{
    category?: string | string[];
  }>;
};

export const revalidate = 300;

const defaultFilterCategories = [
  "Air Freight",
  "Sea Freight",
  "Customs Clearance",
  "Project Cargo",
  "Global Trade",
  "Supply Chain",
  "Shipping Guides",
  "Logistics Technology",
  "Industry Insights",
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs | Parrot Cargo",
    description:
      "Read Parrot Cargo logistics articles, shipping guides, freight insights, and supply chain updates.",
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const t = await getTranslations("navigation");
  const { category } = await searchParams;

  const [blogs, databaseCategories] = await Promise.all([
    getPublishedBlogs(category),
    getPublishedBlogCategories(),
  ]);

  const selectedCategories = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];

  const categories = [
    "All Articles",
    ...Array.from(new Set([...defaultFilterCategories, ...databaseCategories])),
  ];

  return (
    <main>
      <PageHero
        title="Blogs"
        image={heroImage}
        titleClassName="text-heading-3 sm:text-heading-1 [color:var(--text-foreground)]"
        align="center"
        breadcrumbs={[
          {
            label: t("home"),
            href: "/",
          },
          {
            label: "Blogs",
          },
        ]}
      />

      <section className="bg-background py-8 sm:py-12 lg:py-12">
        <Container>
          <BlogCategoryFilter categories={categories} />

          {selectedCategories.length ? (
            <p className="mt-4 text-caption-1 text-body">
              Showing articles from{" "}
              <span className="font-semibold text-heading">
                {selectedCategories.join(", ")}
              </span>
            </p>
          ) : null}

          {blogs.length ? (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-sm border border-stroke bg-card p-6 text-center">
              <h2 className="text-body-3 font-semibold text-heading">
                No articles found
              </h2>
              <p className="mt-2 text-caption-1 text-body">
                There are no published articles in the selected categories yet.
              </p>
            </div>
          )}
        </Container>
      </section>

      <CtaSection />
    </main>
  );
}