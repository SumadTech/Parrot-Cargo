"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
  Undo,
  X,
} from "lucide-react";

type BlogEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

type ToolbarButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={[
        "inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm border px-3 text-caption-2 font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        disabled
          ? "cursor-not-allowed border-transparent bg-transparent text-muted opacity-70"
          : active
            ? "border-primary bg-primary text-primary-foreground"
            : "border-transparent bg-transparent text-heading hover:border-stroke hover:bg-secondary-background",
      ].join(" ")}>
      {children}
    </button>
  );
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

export function BlogEditor({ value, onChange }: BlogEditorProps) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [imageAlt, setImageAlt] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Subscript,
      Superscript,
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    ],
    content: value || "<p>Write your blog content...</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-90 rounded-sm border border-stroke bg-background px-4 py-4 text-body outline-none focus:outline-none",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-80 rounded-sm border border-stroke bg-background p-4 text-body">
        Loading editor...
      </div>
    );
  }

  const selectedText = () => {
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, " ").trim();
  };

  const openLinkForm = () => {
    const currentUrl = editor.getAttributes("link").href as string | undefined;
    const highlightedText = selectedText();

    setLinkTitle(highlightedText);
    setLinkUrl(currentUrl ?? "");
    setIsLinkOpen(true);
  };

  const applyLink = () => {
    const title = linkTitle.trim();
    const url = linkUrl.trim();

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setIsLinkOpen(false);
      return;
    }

    const hasSelection = !editor.state.selection.empty;

    if (hasSelection) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else if (title) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: title,
          marks: [
            {
              type: "link",
              attrs: {
                href: url,
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          ],
        })
        .run();
    } else {
      toast.error("Please add link title or select text first.");
      return;
    }

    setIsLinkOpen(false);
    setLinkTitle("");
    setLinkUrl("");
  };

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    setIsUploadingImage(true);
    toast.loading("Uploading content image...", { id: "content-image-upload" });

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      const altText = imageAlt.trim() || file.name;

      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: altText,
          title: altText,
        })
        .run();

      setImageAlt("");
      toast.success("Image added to content.", { id: "content-image-upload" });
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image.",
        { id: "content-image-upload" },
      );
    } finally {
      setIsUploadingImage(false);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const clearFormatting = () => {
    editor.chain().focus().unsetAllMarks().clearNodes().run();
  };

  return (
    <div className="space-y-3">
      <div className="rounded-sm border border-stroke bg-card p-2">
        <div className="flex flex-wrap items-center gap-2">
          <ToolbarButton
            label="Bold"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Italic"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Underline"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <UnderlineIcon className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Strikethrough"
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}>
            <Strikethrough className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Heading 1"
            active={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }>
            <Heading1 className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Heading 2"
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }>
            <Heading2 className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Heading 3"
            active={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }>
            <Heading3 className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Heading 4"
            active={editor.isActive("heading", { level: 4 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }>
            <Heading4 className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Bullet list"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Ordered list"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Blockquote"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Code block"
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            <Code className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Subscript"
            active={editor.isActive("subscript")}
            onClick={() => editor.chain().focus().toggleSubscript().run()}>
            <SubscriptIcon className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Superscript"
            active={editor.isActive("superscript")}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}>
            <SuperscriptIcon className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Add link"
            active={editor.isActive("link")}
            onClick={openLinkForm}>
            <LinkIcon className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Upload image"
            disabled={isUploadingImage}
            onClick={() => imageInputRef.current?.click()}>
            <ImageIcon className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Undo"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}>
            <Undo className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Redo"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}>
            <Redo className="size-4" />
          </ToolbarButton>

          <ToolbarButton label="Clear formatting" onClick={clearFormatting}>
            <RemoveFormatting className="size-4" />
          </ToolbarButton>
        </div>

        {isLinkOpen ? (
          <div className="mt-3 grid gap-3 rounded-sm border border-stroke bg-background p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
            <label className="grid gap-1 text-caption-2 font-semibold text-heading">
              Link title
              <input
                value={linkTitle}
                onChange={(event) => setLinkTitle(event.target.value)}
                placeholder="Read more"
                className="min-h-10 rounded-sm border border-stroke bg-card px-3 text-caption-1 text-heading outline-none focus:ring-2 focus:ring-ring"
              />
            </label>

            <label className="grid gap-1 text-caption-2 font-semibold text-heading">
              URL
              <input
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
                placeholder="https://example.com"
                className="min-h-10 rounded-sm border border-stroke bg-card px-3 text-caption-1 text-heading outline-none focus:ring-2 focus:ring-ring"
              />
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={applyLink}
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-4 text-caption-2 font-semibold text-primary-foreground">
                Apply
              </button>

              <button
                type="button"
                aria-label="Close link editor"
                onClick={() => setIsLinkOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-stroke text-heading">
                <X className="size-4" />
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <label className="grid gap-1 text-caption-2 font-semibold text-heading">
            Image Alt Text
            <input
              value={imageAlt}
              onChange={(event) => setImageAlt(event.target.value)}
              placeholder="Describe the image for accessibility and SEO"
              className="min-h-10 rounded-sm border border-stroke bg-background px-3 text-caption-1 text-heading outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                uploadImage(file);
              }
            }}
          />
        </div>
      </div>

      <div className="blog-editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
