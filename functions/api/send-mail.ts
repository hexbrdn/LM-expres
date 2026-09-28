import nodemailer from 'nodemailer';
import { buildMail } from '../../server/mail';

interface Env {
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASS: string;
    VITE_CONTACT_EMAIL: string;
}

const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return json({ error: "Invalid request" }, 400);
    }

    const result = buildMail(body, env);
    if (result.kind === "error") return json({ error: result.error }, result.status);
    if (result.kind === "skip") return json({ success: true });

    const port = env.SMTP_PORT || "587";
    const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: Number(port),
        secure: port === "465",
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail(result.mail);
        return json({ success: true });
    } catch (error: unknown) {
        console.error("SMTP Error:", error instanceof Error ? error.message : "Unknown error");
        return json({ error: "Failed to send email" }, 500);
    }
};
