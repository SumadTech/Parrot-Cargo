import { Schema, model, models, type InferSchemaType } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["subscribed", "unsubscribed"],
      default: "subscribed",
      index: true,
    },
    source: {
      type: String,
      default: "footer",
      trim: true,
    },
    unsubscribeToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
      default: null,
    },
    lastEmailSentAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

SubscriberSchema.index({ status: 1, createdAt: -1 });

export type SubscriberModelDocument = InferSchemaType<typeof SubscriberSchema>;

export const Subscriber =
  models.Subscriber || model("Subscriber", SubscriberSchema);
