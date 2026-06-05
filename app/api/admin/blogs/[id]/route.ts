import { NextResponse } from "next/server";
import { deleteBlog, getBlogById, updateBlog } from "@/lib/blog";
import type { BlogInput } from "@/types/blog";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

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

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return NextResponse.json({ message: "Blog not found." }, { status: 404 });
  }

  return NextResponse.json({ blog });
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = (await request.json()) as BlogInput;
    const validationError = validateBlogInput(body);

    if (validationError) {
      return NextResponse.json(
        { message: validationError },
        { status: 400 },
      );
    }

    const blog = await updateBlog(id, body);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to update blog. Please try again.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const deleted = await deleteBlog(id);

  if (!deleted) {
    return NextResponse.json({ message: "Blog not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}