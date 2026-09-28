import de from "../src/locales/de.json";

export interface MailEnv {
  SMTP_USER?: string;
  VITE_CONTACT_EMAIL?: string;
  [key: string]: string | undefined;
}

type Fields = Record<string, string>;

const LANGUAGES: Record<string, string> = { de: "Deutsch", en: "Englisch", tr: "Türkisch" };

const CONTACT_FIELDS = ["name", "email", "subject", "message"];
const QUOTE_FIELDS = [
  "serviceType", "pickupLocation", "deliveryLocation", "weight", "palletCount",
  "additionalNotes", "companyName", "contactPerson", "email", "phone",
];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

// Header-safe single line (display names, subjects)
const oneLine = (value: string) => value.replace(/[\r\n"<>]+/g, " ").replace(/\s+/g, " ").trim();

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const serviceLabel = (id: string) =>
  (de.services.items as Record<string, { title: string } | undefined>)[id]?.title ?? id;

export type MailResult =
  | { kind: "skip" }
  | { kind: "send"; mail: { from: string; to: string; replyTo: string; subject: string; text: string; html: string } }
  | { kind: "error"; status: number; error: string };

export function buildMail(body: unknown, env: MailEnv): MailResult {
  if (!body || typeof body !== "object") return { kind: "error", status: 400, error: "Invalid request" };
  const input = body as Record<string, unknown>;

  // Bots fill the hidden field: pretend success, send nothing
  if (clean(input.honeypot, 500)) return { kind: "skip" };

  const type = input.type === "quote" ? "quote" : input.type === "contact" ? "contact" : null;
  if (!type) return { kind: "error", status: 400, error: "Invalid request" };

  const f: Fields = {};
  for (const key of type === "quote" ? QUOTE_FIELDS : CONTACT_FIELDS) {
    f[key] = clean(input[key], key === "message" || key === "additionalNotes" ? 5000 : 300);
  }

  const name = type === "quote" ? f.contactPerson : f.name;
  const required = type === "quote"
    ? [f.serviceType, f.pickupLocation, f.deliveryLocation, f.weight, f.companyName, f.contactPerson, f.phone]
    : [f.name, f.subject, f.message];
  if (required.some((v) => !v) || !isEmail(f.email)) {
    return { kind: "error", status: 400, error: "Missing or invalid fields" };
  }

  const lang = LANGUAGES[clean(input.lang, 5)] ?? "Unbekannt";
  const sentAt = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "medium", timeStyle: "short" });

  const title = type === "quote" ? "Neue Angebotsanfrage" : "Neue Kontaktanfrage";
  const subject = oneLine(
    type === "quote"
      ? `${title}: ${serviceLabel(f.serviceType)} – ${f.companyName}`
      : `${title}: ${f.subject} – ${name}`,
  );

  const contactRows: [string, string][] = [
    ["Name", name],
    ...(type === "quote" ? [["Firma", f.companyName] as [string, string]] : []),
    ["E-Mail", f.email],
    ...(type === "quote" ? [["Telefon", f.phone] as [string, string]] : []),
    ["Sprache der Website", lang],
  ];

  const detailRows: [string, string][] = type === "quote"
    ? [
        ["Leistung", serviceLabel(f.serviceType)],
        ["Abholort", f.pickupLocation],
        ["Zielort", f.deliveryLocation],
        ["Gewicht", f.weight],
        ["Paletten", f.palletCount],
      ].filter(([, v]) => v) as [string, string][]
    : [["Betreff", f.subject]];

  const note = type === "quote" ? f.additionalNotes : f.message;
  const noteLabel = type === "quote" ? "Zusätzliche Hinweise" : "Nachricht";

  const text = [
    `${title} über lm-express Website (${sentAt})`,
    "",
    ...contactRows.map(([k, v]) => `${k}: ${v}`),
    "",
    ...detailRows.map(([k, v]) => `${k}: ${v}`),
    ...(note ? ["", `${noteLabel}:`, note] : []),
    "",
    "Antworten Sie direkt auf diese E-Mail, um dem Kunden zu schreiben.",
  ].join("\n");

  const valueHtml = (label: string, value: string) => {
    const v = escapeHtml(value);
    if (label === "E-Mail") return `<a href="mailto:${v}" style="color:#d4111e;text-decoration:none;">${v}</a>`;
    if (label === "Telefon") return `<a href="tel:${escapeHtml(value.replace(/[^\d+]/g, ""))}" style="color:#d4111e;text-decoration:none;">${v}</a>`;
    return v;
  };

  const table = (heading: string, rows: [string, string][]) => `
    <tr><td style="padding:24px 32px 8px;font:700 12px Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;color:#d4111e;">${heading}</td></tr>
    <tr><td style="padding:0 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${rows.map(([k, v]) => `
        <tr>
          <td style="padding:10px 12px 10px 0;border-bottom:1px solid #eceef2;font:13px Arial,sans-serif;color:#6b7280;width:170px;vertical-align:top;">${escapeHtml(k)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eceef2;font:600 14px Arial,sans-serif;color:#111827;">${valueHtml(k, v)}</td>
        </tr>`).join("")}
      </table>
    </td></tr>`;

  const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#111111;padding:24px 32px;">
          <div style="font:800 20px Arial,sans-serif;color:#ffffff;">LM <span style="color:#e11d2a;">Express</span></div>
          <div style="font:14px Arial,sans-serif;color:#9ca3af;margin-top:6px;">${title} · ${escapeHtml(sentAt)}</div>
        </td></tr>
        ${table("Kontakt", contactRows)}
        ${table(type === "quote" ? "Auftrag" : "Anfrage", detailRows)}
        ${note ? `
        <tr><td style="padding:24px 32px 8px;font:700 12px Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;color:#d4111e;">${noteLabel}</td></tr>
        <tr><td style="padding:0 32px;">
          <div style="background:#f9fafb;border-left:3px solid #d4111e;border-radius:6px;padding:14px 16px;font:14px/1.6 Arial,sans-serif;color:#111827;white-space:pre-wrap;">${escapeHtml(note)}</div>
        </td></tr>` : ""}
        <tr><td style="padding:28px 32px 8px;">
          <a href="mailto:${escapeHtml(f.email)}" style="display:inline-block;background:#d4111e;color:#ffffff;font:700 14px Arial,sans-serif;text-decoration:none;padding:12px 22px;border-radius:999px;">Kunden antworten</a>
        </td></tr>
        <tr><td style="padding:16px 32px 28px;font:12px Arial,sans-serif;color:#9ca3af;">
          Gesendet über das ${type === "quote" ? "Angebotsformular" : "Kontaktformular"} der LM Express Website. Mit „Antworten“ schreiben Sie direkt an den Kunden.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return {
    kind: "send",
    mail: {
      from: `"${oneLine(name)} via LM Express" <${env.SMTP_USER}>`,
      to: env.VITE_CONTACT_EMAIL || "lm2024express@gmail.com",
      replyTo: f.email,
      subject,
      text,
      html,
    },
  };
}
