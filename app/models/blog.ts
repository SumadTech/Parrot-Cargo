import { Schema, model, models, type InferSchemaType } from "mongoose";

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Parrot Cargo",
    },
    role: {
      type: String,
      required: true,
      default: "Logistics Team",
    },
  },
  { _id: false },
);

const SeoSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  { _id: false, strict: false },
);

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    contentHtml: {
      type: String,
      required: true,
    },

    coverImageUrl: {
      type: String,
      default: "",
    },
    coverImageAlt: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },
    categories: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      required: true,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },

    author: {
      type: AuthorSchema,
      default: () => ({
        name: "Parrot Cargo",
        role: "Logistics Team",
      }),
    },
    seo: {
      type: SeoSchema,
      default: () => ({}),
    },

    readingTimeMinutes: {
      type: Number,
      default: 1,
    },
    views: {
      type: Number,
      default: 0,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
    lastViewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ categories: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ featured: 1 });
BlogSchema.index({ views: -1 });

export type BlogModelDocument = InferSchemaType<typeof BlogSchema>;

export const Blog = models.Blog || model("Blog", BlogSchema);