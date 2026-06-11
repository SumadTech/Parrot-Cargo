import { NextResponse } from "next/server";

import { unsubscribeFromNewsletter } from "@/lib/newsletter";

export const runtime = "nodejs";

function createHtml({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
  </head>

  <body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;color:#475569;padding:24px;">
    <main style="width:100%;max-width:520px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:18px;padding:32px;text-align:center;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
      <p style="margin:0 0 10px;color:#F6660D;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;">
        Parrot Cargo & Logistics
      </p>

      <h1 style="margin:0;color:#0F172A;font-size:30px;line-height:1.2;">
        ${title}
      </h1>

      <p style="margin:16px 0 0;font-size:16px;line-height:1.7;">
        ${message}
      </p>

      <a href="/" style="display:inline-block;margin-top:24px;background:#04457F;color:#FFFFFF;padding:13px 20px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:800;">
        Back to website
      </a>
    </main>
  </body>
</html>
  `.trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? "";

  const unsubscribed = await unsubscribeFromNewsletter(token);

  if (!unsubscribed) {
    return new NextResponse(
      createHtml({
        title: "Invalid unsubscribe link",
        message:
          "This unsubscribe link is invalid or has expired. Please contact us if you need help.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  }

  return new NextResponse(
    createHtml({
      title: "You are unsubscribed",
      message:
        "You have successfully unsubscribed from Parrot Cargo & Logistics updates.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}
