import nodemailer from 'nodemailer';

function escapeHtml(value: unknown): string {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

interface Env {
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASS: string;
    VITE_CONTACT_EMAIL: string;
}

interface RequestBody {
    name: string;
    email: string;
    subject: string;
    message: string;
    type: string;
    [key: string]: unknown;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    // Cloudflare Environment variables
    const SMTP_HOST = env.SMTP_HOST;
    const SMTP_PORT = env.SMTP_PORT || "587";
    const SMTP_USER = env.SMTP_USER;
    const SMTP_PASS = env.SMTP_PASS;
    const TO_EMAIL = env.VITE_CONTACT_EMAIL || "lm2024express@gmail.com";

    try {
        const body = await request.json() as RequestBody;
        const { name, email, subject, message, type, ...details } = body;

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: SMTP_PORT === "465",
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: `"${name}" <${SMTP_USER}>`,
            to: TO_EMAIL,
            replyTo: email,
            subject: `[${type?.toUpperCase()}] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nDetails:\n${JSON.stringify(details, null, 2)}`,
            html: `
        <h2>New Message from ${escapeHtml(name)}</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Type:</strong> ${escapeHtml(type)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message ? escapeHtml(message).replace(/\n/g, '<br>') : ''}</p>
        <hr/>
        <pre>${escapeHtml(JSON.stringify(details, null, 2))}</pre>
      `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("SMTP Error:", errorMessage);
        return new Response(JSON.stringify({ error: "Failed to send: " + errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
