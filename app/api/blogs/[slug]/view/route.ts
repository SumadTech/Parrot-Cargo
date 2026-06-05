import { NextResponse } from "next/server";
import { incrementBlogViews } from "@/lib/blog";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(_: Request, { params }: Params) {
  const { slug } = await params;
  const blog = await incrementBlogViews(slug);

  if (!blog) {
    return NextResponse.json({ message: "Blog not found." }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    views: blog.views,
  });
}