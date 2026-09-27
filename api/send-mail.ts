import nodemailer from 'nodemailer';

function escapeHtml(value: unknown): string {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

interface SendMailRequestBody {
    name: string;
    email: string;
    subject: string;
    message: string;
    type: string;
    [key: string]: unknown;
}

export default async function handler(req: { method: string, body: SendMailRequestBody }, res: { status: (code: number) => { json: (data: unknown) => void } }) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message, type, ...details } = req.body;

    // SMTP Settings from Environment
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.VITE_CONTACT_EMAIL || 'lm2024express@gmail.com',
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
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr/>
      <p><strong>Additional Details:</strong></p>
      <pre>${escapeHtml(JSON.stringify(details, null, 2))}</pre>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true });
    } catch (error: unknown) {
        console.error('SMTP Error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
