export type SubscriberStatus = "subscribed" | "unsubscribed";

export type SubscriberDocument = {
  _id: string;
  email: string;
  status: SubscriberStatus;
  source: string;
  subscribedAt: string | null;
  unsubscribedAt: string | null;
  lastEmailSentAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NewsletterCampaignDocument = {
  _id: string;
  subject: string;
  previewText: string;
  content: string;
  sentCount: number;
  failedCount: number;
  status: "sent" | "failed";
  errorMessage: string;
  sentAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NewsletterCampaignInput = {
  subject?: string;
  previewText?: string;
  content?: string;
};
