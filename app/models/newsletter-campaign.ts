import { Schema, model, models, type InferSchemaType } from "mongoose";

const NewsletterCampaignSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    previewText: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    sentCount: {
      type: Number,
      default: 0,
    },
    failedCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["sent", "failed"],
      default: "sent",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

NewsletterCampaignSchema.index({ sentAt: -1 });

export type NewsletterCampaignModelDocument = InferSchemaType<
  typeof NewsletterCampaignSchema
>;

export const NewsletterCampaign =
  models.NewsletterCampaign ||
  model("NewsletterCampaign", NewsletterCampaignSchema);
