import nodemailer from "nodemailer";

const brand = {
  primary: "#04457F",
  primaryDark: "#033766",
  secondary: "#F6660D",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceSecondary: "#EDF4FA",
  heading: "#0F172A",
  body: "#475569",
  muted: "#94A3B8",
  stroke: "#E2E8F0",
  white: "#FFFFFF",
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (!url) {
    return "http://localhost:3000";
  }

  return url.replace(/\/$/, "");
}

function requireEmailConfig() {
  if (
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_PORT ||
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    !process.env.EMAIL_FROM
  ) {
    throw new Error("Email server is not configured correctly.");
  }
}

function createTransporter() {
  requireEmailConfig();

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function paragraphHtml(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;color:${brand.body};font-size:15px;line-height:1.8;">${escapeHtml(
          paragraph,
        ).replace(/\n/g, "<br />")}</p>`,
    )
    .join("");
}

function createBaseTemplate({
  title,
  previewText,
  bodyHtml,
  unsubscribeUrl,
}: {
  title: string;
  previewText?: string;
  bodyHtml: string;
  unsubscribeUrl: string;
}) {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>

  <body style="margin:0;padding:0;background:${brand.background};font-family:Arial,Helvetica,sans-serif;color:${brand.body};">
    ${
      previewText
        ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(previewText)}</div>`
        : ""
    }

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brand.background};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:680px;background:${brand.surface};border:1px solid ${brand.stroke};border-radius:20px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:${brand.primary};padding:30px 34px;border-bottom:6px solid ${brand.secondary};">
                <p style="margin:0 0 10px;color:${brand.secondary};font-size:13px;line-height:1.2;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;">
                  Parrot Cargo & Logistics
                </p>

                <h1 style="margin:0;color:${brand.white};font-size:30px;line-height:1.18;font-weight:800;">
                  ${escapeHtml(title)}
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 34px 20px;">
                ${bodyHtml}
              </td>
            </tr>

            <tr>
              <td style="background:${brand.surfaceSecondary};padding:22px 34px;border-top:1px solid ${brand.stroke};">
                <p style="margin:0;color:${brand.heading};font-size:14px;line-height:1.5;font-weight:800;">
                  Parrot Cargo & Logistics
                </p>

                <p style="margin:4px 0 0;color:${brand.body};font-size:13px;line-height:1.6;">
                  Freight forwarding, customs clearance, and international logistics solutions.
                </p>

                <p style="margin:16px 0 0;color:${brand.muted};font-size:12px;line-height:1.6;">
                  You received this email because you subscribed to updates from Parrot Cargo & Logistics.
                  <a href="${unsubscribeUrl}" style="color:${brand.primary};text-decoration:underline;">Unsubscribe</a>
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:${brand.primaryDark};padding:16px 34px;">
                <p style="margin:0;color:${brand.white};font-size:12px;line-height:1.6;text-align:center;opacity:0.86;">
                  This email was sent automatically from the Parrot Cargo website.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export function getUnsubscribeUrl(token: string) {
  return `${getSiteUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(
    token,
  )}`;
}

export async function sendWelcomeEmail({
  email,
  unsubscribeToken,
}: {
  email: string;
  unsubscribeToken: string;
}) {
  const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken);
  const transporter = createTransporter();

  const html = createBaseTemplate({
    title: "Welcome to Parrot Cargo Updates",
    previewText: "Thank you for subscribing to Parrot Cargo updates.",
    unsubscribeUrl,
    bodyHtml: `
      <p style="margin:0 0 16px;color:${brand.body};font-size:15px;line-height:1.8;">
        Thank you for subscribing to Parrot Cargo & Logistics updates.
      </p>

      <p style="margin:0 0 16px;color:${brand.body};font-size:15px;line-height:1.8;">
        We will send you useful updates about logistics, freight forwarding, customs clearance, and global cargo movement.
      </p>

      <p style="margin:0;color:${brand.body};font-size:15px;line-height:1.8;">
        You can unsubscribe at any time using the link at the bottom of our emails.
      </p>
    `,
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to Parrot Cargo Updates",
    text: `Thank you for subscribing to Parrot Cargo & Logistics updates.

You can unsubscribe at any time:
${unsubscribeUrl}`,
    html,
  });
}

export async function sendCampaignEmail({
  email,
  unsubscribeToken,
  subject,
  previewText,
  content,
}: {
  email: string;
  unsubscribeToken: string;
  subject: string;
  previewText?: string;
  content: string;
}) {
  const unsubscribeUrl = getUnsubscribeUrl(unsubscribeToken);
  const transporter = createTransporter();

  const html = createBaseTemplate({
    title: subject,
    previewText,
    unsubscribeUrl,
    bodyHtml: paragraphHtml(content),
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    text: `${content}

Unsubscribe:
${unsubscribeUrl}`,
    html,
  });
}
