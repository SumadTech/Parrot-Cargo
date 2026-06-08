type BlogContentProps = {
  contentHtml: string;
};

export function BlogContent({ contentHtml }: BlogContentProps) {
  return (
    <div
      className="
        prose max-w-none
        prose-headings:font-semibold prose-headings:text-heading
        prose-h1:mb-6 prose-h1:mt-0 prose-h1:text-heading-3
        prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-heading-4
        prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-body-1
        prose-p:my-5 prose-p:text-body-3 prose-p:leading-8 prose-p:text-body
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:font-semibold prose-strong:text-heading
        prose-ul:my-6 prose-ul:list-disc prose-ul:space-y-3 prose-ul:pl-6
        prose-ol:my-6 prose-ol:list-decimal prose-ol:space-y-3 prose-ol:pl-6
        prose-li:pl-1 prose-li:text-body-3 prose-li:leading-8 prose-li:text-body
        prose-blockquote:my-8 prose-blockquote:border-s-4 prose-blockquote:border-secondary prose-blockquote:bg-secondary-background prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-body
        prose-img:my-8 prose-img:rounded-sm
        prose-hr:my-10 prose-hr:border-stroke
        prose-table:my-8 prose-table:w-full prose-table:border-collapse
        prose-th:border prose-th:border-stroke prose-th:bg-secondary-background prose-th:px-4 prose-th:py-3 prose-th:text-start prose-th:text-heading
        prose-td:border prose-td:border-stroke prose-td:px-4 prose-td:py-3 prose-td:text-body
        [&>*:first-child]:mt-0
        [&>*:last-child]:mb-0
      "
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}