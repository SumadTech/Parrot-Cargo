"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { BlogEditor } from "@/components/blog/blog-editor";
import type { BlogDocument, BlogInput, BlogStatus } from "@/types/blog";
import { slugify } from "@/lib/slugify";

type BlogFormProps = {
  blog?: BlogDocument;
  mode: "create" | "edit";
};

const defaultCategories = [
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

const statuses: BlogStatus[] = ["draft", "published", "archived"];

function normalizeItem(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/upload-image", {
    method: "POST",
    body: formData,
  });

  const result = (await response.json().catch(() => null)) as {
    url?: string;
    message?: string;
  } | null;

  if (!response.ok || !result?.url) {
    throw new Error(result?.message || "Failed to upload image.");
  }

  return result.url;
}

export function BlogForm({ blog, mode }: BlogFormProps) {
  const router = useRouter();
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState(blog?.title ?? "");
  const [slug, setSlug] = useState(blog?.slug ?? "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt ?? "");
  const [contentHtml, setContentHtml] = useState(blog?.contentHtml ?? "");

  const [coverImageUrl, setCoverImageUrl] = useState(blog?.coverImageUrl ?? "");
const [coverImageAlt, setCoverImageAlt] = useState(blog?.coverImageAlt ?? "");
const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

const [categories, setCategories] = useState<string[]>(
  blog?.categories?.length
    ? blog.categories
    : blog?.category
      ? [blog.category]
      : [],
);

const [categoryInput, setCategoryInput] = useState("");

const [tags, setTags] = useState<string[]>(blog?.tags ?? []);
const [tagInput, setTagInput] = useState("");

const [status, setStatus] = useState<BlogStatus>(blog?.status ?? "draft");
const [featured, setFeatured] = useState(blog?.featured ?? false);

const [seoTitle, setSeoTitle] = useState(blog?.seo.title ?? "");
const [seoDescription, setSeoDescription] = useState(
  blog?.seo.description ?? "",
);

const [isSubmitting, setIsSubmitting] = useState(false);

const generatedSlug = useMemo(() => slugify(title), [title]);

const coverPreviewUrl = useMemo(() => {
  if (!coverImageFile) {
    return "";
  }

  return URL.createObjectURL(coverImageFile);
}, [coverImageFile]);

const activeCoverPreview = coverPreviewUrl || coverImageUrl;

const allCategoryOptions = useMemo(
  () => Array.from(new Set([...defaultCategories, ...categories])),
  [categories],
);

useEffect(() => {
  return () => {
    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl);
    }
  };
}, [coverPreviewUrl]);
  const inputClass =
    "min-h-11 w-full rounded-sm border border-stroke bg-background px-3 text-caption-1 text-heading outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring";
  const textareaClass =
    "w-full rounded-sm border border-stroke bg-background px-3 py-3 text-caption-1 text-heading outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring";
  const labelClass = "text-caption-2 font-semibold text-heading";

  function addCategory(value: string) {
    const next = normalizeItem(value);

    if (!next) return;

    setCategories((current) =>
      current.includes(next) ? current : [...current, next],
    );
    setCategoryInput("");
  }

  function removeCategory(value: string) {
    setCategories((current) => current.filter((item) => item !== value));
  }

  function addTag(value: string) {
    const next = normalizeItem(value);

    if (!next) return;

    setTags((current) =>
      current.includes(next) ? current : [...current, next],
    );
    setTagInput("");
  }

  function removeTag(value: string) {
    setTags((current) => current.filter((item) => item !== value));
  }

  function handleThumbnailSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Thumbnail must be smaller than 5MB.");
      return;
    }

    setCoverImageFile(file);

    if (!coverImageAlt.trim()) {
      setCoverImageAlt(title || file.name);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Blog title is required.");
      return;
    }

    if (!excerpt.trim()) {
      toast.error("Blog excerpt is required.");
      return;
    }

    if (!contentHtml.trim() || contentHtml.trim() === "<p></p>") {
      toast.error("Blog content is required.");
      return;
    }

    if (!categories.length) {
      toast.error("Please select at least one category.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalCoverImageUrl = coverImageUrl;

      if (coverImageFile) {
        toast.loading("Uploading thumbnail...", { id: "thumbnail-upload" });

        finalCoverImageUrl = await uploadImageToCloudinary(coverImageFile);

        toast.success("Thumbnail uploaded.", { id: "thumbnail-upload" });
      }

      const payload: BlogInput = {
        title,
        slug: slug || generatedSlug,
        excerpt,
        contentHtml,
        coverImageUrl: finalCoverImageUrl,
        coverImageAlt,
        categories,
        tags,
        status,
        featured,
        author: {
          name: "Parrot Cargo",
          role: "Logistics Team",
        },
        seo: {
          title: seoTitle,
          description: seoDescription,
          keywords: tags,
        },
      };

      const endpoint =
        mode === "create"
          ? "/api/admin/blogs"
          : `/api/admin/blogs/${blog?._id}`;

      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        toast.error(
          result?.message || "Failed to save blog. Please try again.",
        );
        return;
      }

      toast.success(
        mode === "create"
          ? "Blog created successfully."
          : "Blog updated successfully.",
      );

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving the blog.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="min-w-0 space-y-4 rounded-sm border border-stroke bg-card p-4 sm:p-6">
          <div className="grid gap-2">
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={inputClass}
              required
              placeholder="When should you choose air freight?"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="slug" className={labelClass}>
              Slug
            </label>
            <input
              id="slug"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className={inputClass}
              placeholder={generatedSlug}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="excerpt" className={labelClass}>
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              className={`${textareaClass} min-h-28`}
              required
              placeholder="Short summary shown on blog cards."
            />
          </div>

          <div className="grid gap-2">
            <span className={labelClass}>Content</span>
            <BlogEditor value={contentHtml} onChange={setContentHtml} />
          </div>
        </section>

        <aside className="min-w-0 space-y-4">
          <section className="space-y-4 rounded-sm border border-stroke bg-card p-4 sm:p-6">
            <h2 className="text-body-3 font-semibold text-heading">
              Publish Settings
            </h2>

            <div className="grid gap-2">
              <label htmlFor="status" className={labelClass}>
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as BlogStatus)
                }
                className={inputClass}>
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-3 text-caption-1 text-heading">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
                className="size-4 accent-primary"
              />
              Featured blog
            </label>
          </section>

          <section className="space-y-4 rounded-sm border border-stroke bg-card p-4 sm:p-6">
            <h2 className="text-body-3 font-semibold text-heading">
              Thumbnail
            </h2>

            {activeCoverPreview ? (
              <div className="relative min-h-40 overflow-hidden rounded-sm border border-stroke bg-secondary-background">
                <Image
                  src={activeCoverPreview}
                  alt={coverImageAlt || title || "Blog thumbnail preview"}
                  fill
                  sizes="360px"
                  className="object-cover"
                  unoptimized={activeCoverPreview.startsWith("blob:")}
                />
              </div>
            ) : (
              <div className="grid min-h-40 place-items-center rounded-sm border border-dashed border-stroke bg-secondary-background p-4 text-center text-caption-1 text-body">
                No thumbnail selected
              </div>
            )}

            {coverImageFile ? (
              <p className="text-caption-2 text-body">
                Selected:{" "}
                <span className="font-semibold text-heading">
                  {coverImageFile.name}
                </span>
              </p>
            ) : null}

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  handleThumbnailSelect(file);
                }
              }}
            />

            <div className="grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                disabled={isSubmitting}
                className="col-span-2 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover disabled:opacity-60">
                Choose Thumbnail
              </button>

              <button
                type="button"
                onClick={() => {
                  setCoverImageFile(null);
                  setCoverImageUrl("");

                  if (coverInputRef.current) {
                    coverInputRef.current.value = "";
                  }
                }}
                disabled={isSubmitting || (!coverImageFile && !coverImageUrl)}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-stroke bg-card px-5 text-caption-1 font-semibold text-heading transition-colors hover:bg-secondary-background disabled:opacity-60">
                Remove
              </button>
            </div>

            <div className="grid gap-2">
              <label htmlFor="coverImageAlt" className={labelClass}>
                Thumbnail Alt Text
              </label>
              <input
                id="coverImageAlt"
                value={coverImageAlt}
                onChange={(event) => setCoverImageAlt(event.target.value)}
                className={inputClass}
                placeholder="Cargo containers at port"
              />
            </div>
          </section>

          <section className="space-y-4 rounded-sm border border-stroke bg-card p-4 sm:p-6">
            <h2 className="text-body-3 font-semibold text-heading">
              Categories
            </h2>

            <div className="flex flex-wrap gap-2">
              {allCategoryOptions.map((item) => {
                const selected = categories.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      selected ? removeCategory(item) : addCategory(item)
                    }
                    className={[
                      "rounded-sm border px-3 py-1.5 text-caption-2 font-semibold transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-stroke bg-background text-heading hover:bg-secondary-background",
                    ].join(" ")}>
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input
                value={categoryInput}
                onChange={(event) => setCategoryInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCategory(categoryInput);
                  }
                }}
                className={inputClass}
                placeholder="Add category"
              />
              <button
                type="button"
                onClick={() => addCategory(categoryInput)}
                className="shrink-0 rounded-sm bg-primary px-4 text-caption-2 font-semibold text-primary-foreground">
                Add
              </button>
            </div>

            {categories.length ? (
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-sm bg-secondary-background px-3 py-1.5 text-caption-2 font-semibold text-heading">
                    {item}
                    <button
                      type="button"
                      aria-label={`Remove ${item}`}
                      onClick={() => removeCategory(item)}>
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
          </section>

          <section className="space-y-4 rounded-sm border border-stroke bg-card p-4 sm:p-6">
            <h2 className="text-body-3 font-semibold text-heading">Tags</h2>

            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTag(tagInput);
                  }
                }}
                className={inputClass}
                placeholder="shipping, logistics, cargo"
              />
              <button
                type="button"
                onClick={() => addTag(tagInput)}
                className="shrink-0 rounded-sm bg-primary px-4 text-caption-2 font-semibold text-primary-foreground">
                Add
              </button>
            </div>

            {tags.length ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-secondary-background px-3 py-1.5 text-caption-2 font-semibold text-heading">
                    {item}
                    <button
                      type="button"
                      aria-label={`Remove ${item}`}
                      onClick={() => removeTag(item)}>
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
          </section>

          <section className="space-y-4 rounded-sm border border-stroke bg-card p-4 sm:p-6">
            <h2 className="text-body-3 font-semibold text-heading">SEO</h2>

            <div className="grid gap-2">
              <label htmlFor="seoTitle" className={labelClass}>
                SEO Title
              </label>
              <input
                id="seoTitle"
                value={seoTitle}
                onChange={(event) => setSeoTitle(event.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="seoDescription" className={labelClass}>
                SEO Description
              </label>
              <textarea
                id="seoDescription"
                value={seoDescription}
                onChange={(event) => setSeoDescription(event.target.value)}
                className={`${textareaClass} min-h-24`}
              />
            </div>
          </section>
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          disabled={isSubmitting}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-stroke bg-card px-5 text-caption-1 font-semibold text-heading transition-colors hover:bg-secondary-background disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto">
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-5 text-caption-1 font-semibold text-primary-foreground transition-colors hover:bg-blue-normal-hover disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto">
          {isSubmitting
            ? coverImageFile
              ? "Uploading & Saving..."
              : "Saving..."
            : mode === "create"
              ? "Create Blog"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
