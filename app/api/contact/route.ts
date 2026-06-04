import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const brand = {
  primary: "#04457F",
  primaryHover: "#043E72",
  primaryDark: "#033766",
  secondary: "#F6660D",
  secondaryLight: "#FFF0E7",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceSecondary: "#EDF4FA",
  heading: "#0F172A",
  body: "#475569",
  muted: "#94A3B8",
  stroke: "#E2E8F0",
  border: "#CBD5E1",
  white: "#FFFFFF",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function createInfoCard(label: string, value: string, href?: string) {
  const content = href
    ? `<a href="${href}" style="color:${brand.primary};text-decoration:none;">${value}</a>`
    : value;

  return `
    <td style="padding:0 0 12px 0;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brand.surfaceSecondary};border:1px solid ${brand.stroke};border-radius:14px;">
        <tr>
          <td style="padding:16px 18px;">
            <p style="margin:0 0 6px;color:${brand.muted};font-size:12px;line-height:1.2;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">
              ${label}
            </p>
            <p style="margin:0;color:${brand.heading};font-size:16px;line-height:1.45;font-weight:700;">
              ${content}
            </p>
          </td>
        </tr>
      </table>
    </td>
  `;
}

function createContactEmailTemplate({
  fullName,
  email,
  phone,
  service,
  message,
}: {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const safeFullName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New Contact Form Submission</title>
  </head>

  <body style="margin:0;padding:0;background:${brand.background};font-family:Arial,Helvetica,sans-serif;color:${brand.body};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brand.background};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:720px;background:${brand.surface};border:1px solid ${brand.stroke};border-radius:20px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
            
            <tr>
              <td style="background:${brand.primary};padding:0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:30px 34px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <p style="margin:0 0 10px;color:${brand.secondary};font-size:13px;line-height:1.2;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;">
                              Parrot Cargo & Logistics
                            </p>

                            <h1 style="margin:0;color:${brand.white};font-size:30px;line-height:1.18;font-weight:800;">
                              New Contact Form Submission
                            </h1>

                            <p style="margin:14px 0 0;color:${brand.white};font-size:15px;line-height:1.7;opacity:0.88;">
                              A new logistics inquiry was submitted from the website contact page.
                            </p>
                          </td>

                          <td align="right" style="width:72px;vertical-align:top;">
                            <div style="width:56px;height:56px;border-radius:999px;background:${brand.white};color:${brand.primary};text-align:center;line-height:56px;font-size:24px;font-weight:800;">
                              PC
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="height:6px;background:${brand.secondary};font-size:0;line-height:0;">
                      &nbsp;
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:30px 34px 26px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    ${createInfoCard("Full Name", safeFullName)}
                  </tr>

                  <tr>
                    ${createInfoCard("Email Address", safeEmail, `mailto:${safeEmail}`)}
                  </tr>

                  <tr>
                    ${createInfoCard("Phone Number", safePhone, `tel:${safePhone}`)}
                  </tr>

                  <tr>
                    ${createInfoCard("Service Required", safeService)}
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:10px;background:${brand.surface};border:1px solid ${brand.border};border-left:6px solid ${brand.secondary};border-radius:16px;">
                  <tr>
                    <td style="padding:22px;">
                      <p style="margin:0 0 12px;color:${brand.heading};font-size:18px;line-height:1.25;font-weight:800;">
                        Message
                      </p>

                      <p style="margin:0;color:${brand.body};font-size:15px;line-height:1.8;">
                        ${safeMessage}
                      </p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${safeEmail}" style="display:inline-block;background:${brand.primary};color:${brand.white};padding:14px 24px;border-radius:999px;font-size:14px;line-height:1.2;font-weight:800;text-decoration:none;">
                        Reply to Customer
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background:${brand.surfaceSecondary};padding:22px 34px;border-top:1px solid ${brand.stroke};">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <p style="margin:0;color:${brand.heading};font-size:14px;line-height:1.5;font-weight:800;">
                        Parrot Cargo & Logistics
                      </p>

                      <p style="margin:4px 0 0;color:${brand.body};font-size:13px;line-height:1.6;">
                        Trusted freight forwarding, customs clearance, and international logistics solutions.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background:${brand.primaryDark};padding:16px 34px;">
                <p style="margin:0;color:${brand.white};font-size:12px;line-height:1.6;text-align:center;opacity:0.86;">
                  This email was sent automatically from the Parrot Cargo website contact form.
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const service = body.service?.trim();
    const message = body.message?.trim();

    if (!fullName || !email || !phone || !service || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_PORT ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.EMAIL_FROM
    ) {
      return NextResponse.json(
        { message: "Email server is not configured correctly." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: receiverEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${fullName}`,
      text: `
Full Name: ${fullName}
Email Address: ${email}
Phone Number: ${phone}
Service Required: ${service}

Message:
${message}
      `.trim(),
      html: createContactEmailTemplate({
        fullName,
        email,
        phone,
        service,
        message,
      }),
    });

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { message: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}