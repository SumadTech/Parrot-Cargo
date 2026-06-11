import { NextResponse } from "next/server";

import { sendNewsletterCampaign } from "@/lib/newsletter";
import type { NewsletterCampaignInput } from "@/types/newsletter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewsletterCampaignInput;

    const campaign = await sendNewsletterCampaign(body);

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to send campaign. Please try again.",
      },
      { status: 400 },
    );
  }
}
