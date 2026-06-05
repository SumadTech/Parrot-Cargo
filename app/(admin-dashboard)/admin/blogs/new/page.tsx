import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlogForm } from "@/components/blog/blog-form";

export default function NewBlogPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Create Blog"
        description="Write a new logistics article and save it as a draft or publish it immediately."
      />

      <BlogForm mode="create" />
    </div>
  );
}