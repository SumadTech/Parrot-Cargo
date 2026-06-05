import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogForm } from "@/components/blog/blog-form";
import { getBlogById } from "@/lib/blog";

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Edit Blog"
        description="Update content, SEO, media, category, and publishing status."
      />

      <BlogForm mode="edit" blog={blog} />
    </div>
  );
}