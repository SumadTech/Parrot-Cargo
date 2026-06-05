export type BlogHeading = {
  id: string;
  text: string;
  level: 1 | 2 | 3 | 4;
};

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

export function createHeadingId(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueHeadingId(baseId: string, counts: Map<string, number>) {
  const count = counts.get(baseId) ?? 0;
  counts.set(baseId, count + 1);

  return count === 0 ? baseId : `${baseId}-${count + 1}`;
}

export function extractBlogHeadings(contentHtml: string): BlogHeading[] {
  const counts = new Map<string, number>();
  const matches = Array.from(
    contentHtml.matchAll(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi),
  );

  return matches
    .map((match) => {
      const level = Number(match[1]) as 1 | 2 | 3 | 4;
      const text = stripHtml(match[2] ?? "");
      const baseId = createHeadingId(text);

      if (!text || !baseId) {
        return null;
      }

      return {
        id: uniqueHeadingId(baseId, counts),
        text,
        level,
      };
    })
    .filter((heading): heading is BlogHeading => Boolean(heading));
}

function hasId(attributes: string) {
  return /\sid=(["']).*?\1/i.test(attributes);
}

function addOrMergeClass(attributes: string) {
  if (/\sclass=(["'])(.*?)\1/i.test(attributes)) {
    return attributes.replace(
      /\sclass=(["'])(.*?)\1/i,
      (_match, quote: string, className: string) =>
        ` class=${quote}${className} scroll-mt-28${quote}`,
    );
  }

  return `${attributes} class="scroll-mt-28"`;
}

export function addIdsToBlogHeadings(contentHtml: string) {
  const counts = new Map<string, number>();

  return contentHtml.replace(
    /<h([1-4])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, level: string, attributes: string, inner: string) => {
      const text = stripHtml(inner);
      const baseId = createHeadingId(text);

      if (!baseId) {
        return `<h${level}${attributes}>${inner}</h${level}>`;
      }

      const nextAttributes = addOrMergeClass(attributes);

      if (hasId(attributes)) {
        return `<h${level}${nextAttributes}>${inner}</h${level}>`;
      }

      const id = uniqueHeadingId(baseId, counts);

      return `<h${level}${nextAttributes} id="${id}">${inner}</h${level}>`;
    },
  );
}