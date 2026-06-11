import { NextResponse } from "next/server";

import {
  getNewsletterSubscribers,
  updateSubscriberStatus,
} from "@/lib/newsletter";
import type { SubscriberStatus } from "@/types/newsletter";

const subscriberStatuses: SubscriberStatus[] = ["subscribed", "unsubscribed"];

function validateSubscriberStatus(
  status: string | null,
): SubscriberStatus | undefined {
  if (!status) return undefined;

  return subscriberStatuses.includes(status as SubscriberStatus)
    ? (status as SubscriberStatus)
    : undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const status = validateSubscriberStatus(searchParams.get("status"));
  const search = searchParams.get("q") ?? undefined;

  const subscribers = await getNewsletterSubscribers(status, search);

  return NextResponse.json({ subscribers });
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      id?: string;
      status?: SubscriberStatus;
    };

    if (!body.id) {
      return NextResponse.json(
        { message: "Subscriber id is required." },
        { status: 400 },
      );
    }

    if (!body.status || !subscriberStatuses.includes(body.status)) {
      return NextResponse.json(
        { message: "Valid subscriber status is required." },
        { status: 400 },
      );
    }

    const subscriber = await updateSubscriberStatus(body.id, body.status);

    if (!subscriber) {
      return NextResponse.json(
        { message: "Subscriber not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ subscriber });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to update subscriber.",
      },
      { status: 500 },
    );
  }
}
