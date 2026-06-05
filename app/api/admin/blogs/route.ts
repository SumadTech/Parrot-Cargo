import { NextResponse } from "next/server";

import { createBlog, getAdminBlogs } from "@/lib/blog";
import type { BlogInput, BlogStatus } from "@/types/blog";

function validateBlogInput(body: BlogInput) {
  const title = body.title?.trim();
  const excerpt = body.excerpt?.trim();
  const contentHtml = body.contentHtml?.trim();
  const categories = body.categories?.filter((item) => item.trim());

  if (!title) {
    return "Blog title is required.";
  }

  if (!excerpt) {
    return "Blog excerpt is required.";
  }

  if (!contentHtml || contentHtml === "<p></p>") {
    return "Blog content is required.";
  }

  if (!categories?.length) {
    return "Please select at least one category.";
  }

  if (!body.status) {
    return "Please select a publishing status.";
  }

  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as BlogStatus | null;

  const blogs = await getAdminBlogs(status ?? undefined);

  return NextResponse.json({ blogs });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BlogInput;
    const validationError = validateBlogInput(body);

    if (validationError) {
      return NextResponse.json(
        { message: validationError },
        { status: 400 },
      );
    }

    const blog = await createBlog(body);

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to create blog. Please try again.",
      },
      { status: 500 },
    );
  }
}