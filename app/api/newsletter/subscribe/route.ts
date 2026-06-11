import { NextResponse } from "next/server";

import { subscribeToNewsletter } from "@/lib/newsletter";

export const runtime = "nodejs";

type SubscribePayload = {
  email?: string;
  source?: string;
  website?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubscribePayload;

    if (body.website) {
      return NextResponse.json(
        { message: "Thanks for subscribing." },
        { status: 200 },
      );
    }

    const result = await subscribeToNewsletter(
      body.email ?? "",
      body.source ?? "footer",
    );

    return NextResponse.json(
      { message: result.message, subscriber: result.subscriber },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again.",
      },
      { status: 400 },
    );
  }
}
