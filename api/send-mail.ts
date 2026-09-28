import nodemailer from 'nodemailer';
import { buildMail } from '../server/mail';

export default async function handler(
    req: { method: string; body: unknown },
    res: { status: (code: number) => { json: (data: unknown) => void } },
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const result = buildMail(req.body, process.env);
    if (result.kind === 'error') return res.status(result.status).json({ error: result.error });
    if (result.kind === 'skip') return res.status(200).json({ success: true });

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail(result.mail);
        return res.status(200).json({ success: true });
    } catch (error: unknown) {
        console.error('SMTP Error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
