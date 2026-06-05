type BlogContentProps = {
  contentHtml: string;
};

export function BlogContent({ contentHtml }: BlogContentProps) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}