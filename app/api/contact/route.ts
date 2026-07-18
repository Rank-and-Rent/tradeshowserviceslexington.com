import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Lead = {
  name: string;
  email: string;
  phone: string;
  showDate: string;
  showLocation: string;
  projectDetails: string;
};

const fieldAliases = {
  name: ["name", "fullName", "contactName"],
  email: ["email", "emailAddress", "workEmail"],
  phone: ["phone", "phoneNumber", "contactNumber"],
  showDate: ["showDate", "targetShowDate", "eventDate", "timeline", "Target Show Date", "Show Date", "Event Date"],
  showLocation: ["showLocation", "eventLocation", "venue", "Show Location", "Event Location", "Venue or City"],
  projectDetails: ["projectDetails", "message", "notes", "details", "Project Details", "Project Notes", "Show Notes", "Project Brief", "Exhibit Details", "Scope Notes"],
} as const;

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeBody(body: Record<string, unknown>): Lead {
  const values = new Map(
    Object.entries(body).map(([key, value]) => [normalizeKey(key), typeof value === "string" ? value.trim() : ""]),
  );

  const pick = (aliases: readonly string[]) => {
    for (const alias of aliases) {
      const value = values.get(normalizeKey(alias));
      if (value) return value;
    }
    return "";
  };

  return {
    name: pick(fieldAliases.name),
    email: pick(fieldAliases.email),
    phone: pick(fieldAliases.phone),
    showDate: pick(fieldAliases.showDate),
    showLocation: pick(fieldAliases.showLocation),
    projectDetails: pick(fieldAliases.projectDetails),
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

function splitEmails(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

async function sendMail(apiKey: string, message: Record<string, unknown>) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`SendGrid rejected the request (${response.status}): ${detail}`);
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const wantsJson = contentType.includes("application/json");

  try {
    const rawBody = wantsJson
      ? ((await request.json()) as Record<string, unknown>)
      : Object.fromEntries((await request.formData()).entries());
    const lead = normalizeBody(rawBody);
    const missing = Object.entries(lead)
      .filter(([, value]) => !value)
      .map(([field]) => field);

    if (missing.length > 0) {
      if (!wantsJson) {
        return NextResponse.redirect(new URL("/contact?formError=missing-fields", request.url), 303);
      }
      return NextResponse.json({ ok: false, error: "Please complete every contact field.", missing }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY?.trim();
    const siteUrl = process.env.EMAIL_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const hostname = new URL(siteUrl).hostname.replace(/^www\./, "");
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || hostname;
    const fromEmail =
      process.env.SENDGRID_FROM_EMAIL?.trim() ||
      process.env.BUSINESS_EMAIL?.trim() ||
      process.env.CONTACT_EMAIL?.trim() ||
      `info@${hostname}`;
    const recipients = Array.from(new Set([
      ...splitEmails(process.env.BUSINESS_EMAIL),
      ...splitEmails(process.env.CONTACT_EMAIL),
      ...splitEmails(process.env.CONTRACTOR_EMAIL),
      "rankhoundseo@gmail.com",
    ])).filter((email) => email !== lead.email);

    if (!apiKey) {
      console.error("SENDGRID_API_KEY is not configured");
      return NextResponse.json({ ok: false, error: "Email configuration error." }, { status: 500 });
    }

    const safe = Object.fromEntries(Object.entries(lead).map(([key, value]) => [key, escapeHtml(value)])) as Lead;
    const leadHtml = `
      <h2>New trade show project inquiry</h2>
      <p><strong>Website:</strong> ${escapeHtml(siteName)} (${escapeHtml(siteUrl)})</p>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Phone:</strong> ${safe.phone}</p>
      <p><strong>Show date:</strong> ${safe.showDate}</p>
      <p><strong>Show location:</strong> ${safe.showLocation}</p>
      <p><strong>Project details:</strong><br>${safe.projectDetails.replace(/\n/g, "<br>")}</p>
    `;
    const confirmationHtml = `
      <h2>We received your trade show project details</h2>
      <p>Hi ${safe.name},</p>
      <p>Thank you for contacting ${escapeHtml(siteName)}. We received the show date, location, and project notes you submitted. A team member will follow up using the contact information you provided.</p>
      <p><strong>Show date:</strong> ${safe.showDate}<br><strong>Show location:</strong> ${safe.showLocation}</p>
    `;

    await Promise.all([
      sendMail(apiKey, {
        personalizations: [{ to: recipients.map((email) => ({ email })) }],
        from: { email: fromEmail, name: siteName },
        reply_to: { email: lead.email, name: lead.name },
        subject: `New trade show lead: ${lead.name} — ${lead.showLocation}`,
        content: [{ type: "text/html", value: leadHtml }],
      }),
      sendMail(apiKey, {
        personalizations: [{ to: [{ email: lead.email, name: lead.name }] }],
        from: { email: fromEmail, name: siteName },
        reply_to: { email: fromEmail, name: siteName },
        subject: `We received your inquiry — ${siteName}`,
        content: [{ type: "text/html", value: confirmationHtml }],
      }),
    ]);

    if (!wantsJson) {
      return NextResponse.redirect(new URL("/contact?submitted=1", request.url), 303);
    }
    return NextResponse.json({ ok: true, success: true, message: "Project details received." });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ ok: false, error: "Unable to send your request right now." }, { status: 502 });
  }
}
