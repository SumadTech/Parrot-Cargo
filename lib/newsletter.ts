import crypto from "crypto";
import { isValidObjectId, type HydratedDocument } from "mongoose";
import { revalidatePath } from "next/cache";

import {
  NewsletterCampaign,
  type NewsletterCampaignModelDocument,
} from "@/app/models/newsletter-campaign";
import { Subscriber, type SubscriberModelDocument } from "@/app/models/subscriber";
import { connectDB } from "@/lib/db";
import { sendCampaignEmail, sendWelcomeEmail } from "@/lib/newsletter-email";
import type {
  NewsletterCampaignDocument,
  NewsletterCampaignInput,
  SubscriberDocument,
  SubscriberStatus,
} from "@/types/newsletter";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function createUnsubscribeToken() {
  return crypto.randomBytes(32).toString("hex");
}

function toIsoDate(value: unknown): string | null {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(String(value));

  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString();
}

type SubscriberRawDocument = SubscriberModelDocument & {
  _id: { toString(): string };
  createdAt?: Date;
  updatedAt?: Date;
};

type CampaignRawDocument = NewsletterCampaignModelDocument & {
  _id: { toString(): string };
  createdAt?: Date;
  updatedAt?: Date;
};

function mapSubscriber(
  doc: HydratedDocument<SubscriberModelDocument>,
): SubscriberDocument {
  const raw = doc.toObject<SubscriberRawDocument>();

  return {
    _id: raw._id.toString(),
    email: raw.email,
    status: raw.status as SubscriberStatus,
    source: raw.source ?? "footer",
    subscribedAt: toIsoDate(raw.subscribedAt),
    unsubscribedAt: toIsoDate(raw.unsubscribedAt),
    lastEmailSentAt: toIsoDate(raw.lastEmailSentAt),
    createdAt: toIsoDate(raw.createdAt) ?? new Date().toISOString(),
    updatedAt: toIsoDate(raw.updatedAt) ?? new Date().toISOString(),
  };
}

function mapCampaign(
  doc: HydratedDocument<NewsletterCampaignModelDocument>,
): NewsletterCampaignDocument {
  const raw = doc.toObject<CampaignRawDocument>();

  return {
    _id: raw._id.toString(),
    subject: raw.subject,
    previewText: raw.previewText ?? "",
    content: raw.content,
    sentCount: Number(raw.sentCount ?? 0),
    failedCount: Number(raw.failedCount ?? 0),
    status: raw.status as "sent" | "failed",
    errorMessage: raw.errorMessage ?? "",
    sentAt: toIsoDate(raw.sentAt),
    createdAt: toIsoDate(raw.createdAt) ?? new Date().toISOString(),
    updatedAt: toIsoDate(raw.updatedAt) ?? new Date().toISOString(),
  };
}

export async function subscribeToNewsletter(emailValue: string, source = "footer") {
  await connectDB();

  const email = normalizeEmail(emailValue);

  if (!email) {
    throw new Error("Email address is required.");
  }

  if (!isValidEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const existing = await Subscriber.findOne({ email });

  if (existing) {
    if (existing.status === "unsubscribed") {
      existing.set({
        status: "subscribed",
        source,
        subscribedAt: new Date(),
        unsubscribedAt: null,
        unsubscribeToken: existing.unsubscribeToken || createUnsubscribeToken(),
      });

      await existing.save();

      try {
        await sendWelcomeEmail({
          email: existing.email,
          unsubscribeToken: existing.unsubscribeToken,
        });
      } catch (error) {
        console.error("Newsletter welcome email error:", error);
      }

      revalidatePath("/admin/newsletter");

      return {
        subscriber: mapSubscriber(existing),
        message: "You have been subscribed again. Welcome back!",
      };
    }

    return {
      subscriber: mapSubscriber(existing),
      message: "You are already subscribed.",
    };
  }

  const subscriber = await Subscriber.create({
    email,
    source,
    status: "subscribed",
    subscribedAt: new Date(),
    unsubscribeToken: createUnsubscribeToken(),
  });

  try {
    await sendWelcomeEmail({
      email: subscriber.email,
      unsubscribeToken: subscriber.unsubscribeToken,
    });
  } catch (error) {
    console.error("Newsletter welcome email error:", error);
  }

  revalidatePath("/admin/newsletter");

  return {
    subscriber: mapSubscriber(subscriber),
    message: "Thanks for subscribing. Please check your email.",
  };
}

export async function unsubscribeFromNewsletter(token: string) {
  await connectDB();

  const cleanToken = token.trim();

  if (!cleanToken) {
    return false;
  }

  const subscriber = await Subscriber.findOne({ unsubscribeToken: cleanToken });

  if (!subscriber) {
    return false;
  }

  if (subscriber.status !== "unsubscribed") {
    subscriber.set({
      status: "unsubscribed",
      unsubscribedAt: new Date(),
    });

    await subscriber.save();
  }

  revalidatePath("/admin/newsletter");

  return true;
}

export async function getNewsletterSubscribers(
  status?: SubscriberStatus,
  search?: string,
) {
  await connectDB();

  const selectedSearch = search?.trim();

  const query = {
    ...(status ? { status } : {}),
    ...(selectedSearch
      ? {
          email: { $regex: selectedSearch, $options: "i" },
        }
      : {}),
  };

  const docs = await Subscriber.find(query).sort({ createdAt: -1 });

  return docs.map(mapSubscriber);
}

export async function getNewsletterStats() {
  await connectDB();

  const [total, subscribed, unsubscribed] = await Promise.all([
    Subscriber.countDocuments({}),
    Subscriber.countDocuments({ status: "subscribed" }),
    Subscriber.countDocuments({ status: "unsubscribed" }),
  ]);

  return {
    total,
    subscribed,
    unsubscribed,
  };
}

export async function updateSubscriberStatus(
  id: string,
  status: SubscriberStatus,
) {
  await connectDB();

  if (!isValidObjectId(id)) {
    return null;
  }

  const subscriber = await Subscriber.findById(id);

  if (!subscriber) {
    return null;
  }

  subscriber.set({
    status,
    unsubscribedAt: status === "unsubscribed" ? new Date() : null,
    subscribedAt: status === "subscribed" ? new Date() : subscriber.subscribedAt,
  });

  await subscriber.save();

  revalidatePath("/admin/newsletter");

  return mapSubscriber(subscriber);
}

export async function deleteSubscriber(id: string) {
  await connectDB();

  if (!isValidObjectId(id)) {
    return false;
  }

  const subscriber = await Subscriber.findById(id);

  if (!subscriber) {
    return false;
  }

  await subscriber.deleteOne();

  revalidatePath("/admin/newsletter");

  return true;
}

export async function getNewsletterCampaigns() {
  await connectDB();

  const docs = await NewsletterCampaign.find({}).sort({ sentAt: -1 }).limit(25);

  return docs.map(mapCampaign);
}

export async function sendNewsletterCampaign(input: NewsletterCampaignInput) {
  await connectDB();

  const subject = input.subject?.trim();
  const previewText = input.previewText?.trim() ?? "";
  const content = input.content?.trim();

  if (!subject) {
    throw new Error("Campaign subject is required.");
  }

  if (!content) {
    throw new Error("Campaign content is required.");
  }

  const subscribers = await Subscriber.find({ status: "subscribed" }).sort({
    createdAt: -1,
  });

  if (!subscribers.length) {
    throw new Error("There are no active subscribers to email.");
  }

  let sentCount = 0;
  let failedCount = 0;
  let firstError = "";

  for (const subscriber of subscribers) {
    try {
      await sendCampaignEmail({
        email: subscriber.email,
        unsubscribeToken: subscriber.unsubscribeToken,
        subject,
        previewText,
        content,
      });

      subscriber.set({ lastEmailSentAt: new Date() });
      await subscriber.save();

      sentCount += 1;
    } catch (error) {
      failedCount += 1;

      if (!firstError) {
        firstError =
          error instanceof Error
            ? error.message
            : "Failed to send one or more campaign emails.";
      }

      console.error("Newsletter campaign email error:", error);
    }
  }

  const campaign = await NewsletterCampaign.create({
    subject,
    previewText,
    content,
    sentCount,
    failedCount,
    status: failedCount > 0 && sentCount === 0 ? "failed" : "sent",
    errorMessage: firstError,
    sentAt: new Date(),
  });

  revalidatePath("/admin/newsletter");

  return mapCampaign(campaign);
}
