export type BlogStatus = "draft" | "published" | "archived";

export type BlogCategory = string;

export type BlogAuthor = {
  name: string;
  role?: string;
  avatarUrl?: string;
};

export type BlogSeo = {
  title?: string;
  description?: string;
  keywords?: string[];
};

export type BlogDocument = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;

  coverImageUrl?: string;
  coverImageAlt?: string;

  category?: string;
  categories: string[];
  tags: string[];

  status: BlogStatus;
  featured: boolean;

  author: BlogAuthor;
  seo: BlogSeo;

  readingTimeMinutes: number;
  views: number;

  publishedAt?: string | null;
  lastViewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogInput = {
  title: string;
  slug?: string;
  excerpt: string;
  contentHtml: string;

  coverImageUrl?: string;
  coverImageAlt?: string;

  category?: string;
  categories?: string[];
  tags?: string[];

  status: BlogStatus;
  featured?: boolean;

  author?: BlogAuthor;
  seo?: BlogSeo;
};