import { isValidObjectId, type HydratedDocument } from "mongoose";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

import { Blog, type BlogModelDocument } from "@/app/models/blog";
import { connectDB } from "@/lib/db";
import { cleanBlogHtml } from "@/lib/sanitize-html";
import { slugify } from "@/lib/slugify";
import type { BlogDocument, BlogInput, BlogStatus } from "@/types/blog";

const BLOGS_CACHE_TAG = "blogs";
const BLOGS_REVALIDATE_SECONDS = 300;

function estimateReadingTime(html: string) {
  const plainText = html.replace(/<[^>]*>/g, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function normalizeList(value?: string[]) {
  return Array.from(
    new Set(
      (value ?? [])
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function normalizeCategory(value?: string | null) {
  const category = value?.trim();

  if (!category || category.toLowerCase() === "all articles") {
    return undefined;
  }

  return category;
}

function toIsoDate(value: unknown): string | null {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(String(value));

  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString();
}

type BlogRawDocument = BlogModelDocument & {
  _id: {
    toString(): string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

type BlogHydratedDocument = HydratedDocument<BlogModelDocument>;

function mapBlog(doc: BlogHydratedDocument): BlogDocument {
  const raw = doc.toObject<BlogRawDocument>();

  const categories = normalizeList(
    raw.categories?.length
      ? raw.categories
      : raw.category
        ? [raw.category]
        : [],
  );

  return {
    _id: raw._id.toString(),
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt,
    contentHtml: raw.contentHtml,

    coverImageUrl: raw.coverImageUrl ?? "",
    coverImageAlt: raw.coverImageAlt ?? "",

    category: raw.category ?? categories[0] ?? "",
    categories,
    tags: normalizeList(raw.tags),

    status: raw.status,
    featured: Boolean(raw.featured),

    author: raw.author ?? {
      name: "Parrot Cargo",
      role: "Logistics Team",
    },
    seo: raw.seo ?? {},

    readingTimeMinutes: Number(raw.readingTimeMinutes ?? 1),
    views: Number(raw.views ?? 0),

    publishedAt: toIsoDate(raw.publishedAt),
    lastViewedAt: toIsoDate(raw.lastViewedAt),
    createdAt: toIsoDate(raw.createdAt) ?? new Date().toISOString(),
    updatedAt: toIsoDate(raw.updatedAt) ?? new Date().toISOString(),
  };
}

export function revalidateBlogCache(slug?: string) {
  revalidateTag(BLOGS_CACHE_TAG, "max");
  revalidatePath("/blogs");

  if (slug) {
    revalidatePath(`/blogs/${slug}`);
  }
}

export async function ensureBlogIndexes() {
  await connectDB();
  await Blog.syncIndexes();
}

export async function getAdminBlogs(status?: BlogStatus) {
  await connectDB();

  const query = status ? { status } : {};

  const docs = await Blog.find(query).sort({ updatedAt: -1 });

  return docs.map(mapBlog);
}

export const getPublishedBlogs = unstable_cache(
  async (category?: string) => {
    await connectDB();

    const selectedCategory = normalizeCategory(category);

    const query = selectedCategory
      ? {
          status: "published",
          $or: [
            { category: selectedCategory },
            { categories: selectedCategory },
          ],
        }
      : {
          status: "published",
        };

    const docs = await Blog.find(query).sort({ publishedAt: -1 });

    return docs.map(mapBlog);
  },
  ["published-blogs"],
  {
    tags: [BLOGS_CACHE_TAG],
    revalidate: BLOGS_REVALIDATE_SECONDS,
  },
);

export const getPublishedBlogBySlug = unstable_cache(
  async (slug: string) => {
    await connectDB();

    const doc = await Blog.findOne({
      slug,
      status: "published",
    });

    return doc ? mapBlog(doc) : null;
  },
  ["published-blog-by-slug"],
  {
    tags: [BLOGS_CACHE_TAG],
    revalidate: BLOGS_REVALIDATE_SECONDS,
  },
);

export const getPublishedBlogCategories = unstable_cache(
  async () => {
    await connectDB();

    const docs = await Blog.find({ status: "published" }).select(
      "category categories",
    );

    const categories = docs.flatMap((doc) => {
      const blog = mapBlog(doc);
      return blog.categories.length ? blog.categories : blog.category ? [blog.category] : [];
    });

    return Array.from(new Set(categories.filter(Boolean))).sort((a, b) =>
      a.localeCompare(b),
    );
  },
  ["published-blog-categories"],
  {
    tags: [BLOGS_CACHE_TAG],
    revalidate: BLOGS_REVALIDATE_SECONDS,
  },
);

export async function getBlogById(id: string) {
  await connectDB();

  if (!isValidObjectId(id)) {
    return null;
  }

  const doc = await Blog.findById(id);

  return doc ? mapBlog(doc) : null;
}

export async function createBlog(input: BlogInput) {
  await connectDB();

  const now = new Date();

  const contentHtml = cleanBlogHtml(input.contentHtml);
  const slug = slugify(input.slug || input.title);

  const categories = normalizeList(
    input.categories?.length
      ? input.categories
      : input.category
        ? [input.category]
        : [],
  );

  const tags = normalizeList(input.tags);

  const doc = await Blog.create({
    title: input.title.trim(),
    slug,
    excerpt: input.excerpt.trim(),
    contentHtml,

    coverImageUrl: input.coverImageUrl?.trim() || "",
    coverImageAlt: input.coverImageAlt?.trim() || input.title.trim(),

    category: categories[0] ?? "",
    categories,
    tags,

    status: input.status,
    featured: Boolean(input.featured),

    author: input.author ?? {
      name: "Parrot Cargo",
      role: "Logistics Team",
    },
    seo: input.seo ?? {},

    readingTimeMinutes: estimateReadingTime(contentHtml),
    views: 0,

    publishedAt: input.status === "published" ? now : null,
    lastViewedAt: null,
  });

  const blog = mapBlog(doc);

  revalidateBlogCache(blog.slug);

  return blog;
}

export async function updateBlog(id: string, input: BlogInput) {
  await connectDB();

  if (!isValidObjectId(id)) {
    return null;
  }

  const existing = await Blog.findById(id);

  if (!existing) {
    return null;
  }

  const existingMapped = mapBlog(existing);
  const now = new Date();

  const contentHtml = cleanBlogHtml(input.contentHtml);

  const categories = normalizeList(
    input.categories?.length
      ? input.categories
      : input.category
        ? [input.category]
        : [],
  );

  const tags = normalizeList(input.tags);

  const shouldSetPublishedAt =
    input.status === "published" && !existingMapped.publishedAt;

  existing.set({
    title: input.title.trim(),
    slug: slugify(input.slug || input.title),
    excerpt: input.excerpt.trim(),
    contentHtml,

    coverImageUrl: input.coverImageUrl?.trim() || "",
    coverImageAlt: input.coverImageAlt?.trim() || input.title.trim(),

    category: categories[0] ?? "",
    categories,
    tags,

    status: input.status,
    featured: Boolean(input.featured),

    author: input.author ?? {
      name: "Parrot Cargo",
      role: "Logistics Team",
    },
    seo: input.seo ?? {},

    readingTimeMinutes: estimateReadingTime(contentHtml),
    publishedAt: shouldSetPublishedAt
      ? now
      : existingMapped.publishedAt
        ? new Date(existingMapped.publishedAt)
        : null,
  });

  await existing.save();

  const blog = mapBlog(existing);

  revalidateBlogCache(existingMapped.slug);
  revalidateBlogCache(blog.slug);

  return blog;
}

export async function deleteBlog(id: string) {
  await connectDB();

  if (!isValidObjectId(id)) {
    return false;
  }

  const existing = await Blog.findById(id);

  if (!existing) {
    return false;
  }

  const existingMapped = mapBlog(existing);

  await existing.deleteOne();

  revalidateBlogCache(existingMapped.slug);

  return true;
}

export async function incrementBlogViews(slug: string) {
  await connectDB();

  const doc = await Blog.findOneAndUpdate(
    {
      slug,
      status: "published",
    },
    {
      $inc: { views: 1 },
      $set: { lastViewedAt: new Date() },
    },
    {
      new: true,
    },
  );

  return doc ? mapBlog(doc) : null;
}