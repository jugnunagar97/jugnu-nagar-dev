import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }
  try {
    const { fullName, reply_to, message } = req.body || {};
    if (!fullName || !reply_to || !message) {
      res.status(400).json({ ok: false, error: 'Missing fields' });
      return;
    }

    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const TO_EMAIL = process.env.TO_EMAIL || 'dev.nagarjugnu@gmail.com';
    const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const ownerHtml = `
      <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f6f7fb;padding:24px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:auto;background:#ffffff;border-radius:12px;border:1px solid #eef0f4;overflow:hidden">
          <tr><td style="padding:20px 24px;border-bottom:1px solid #eef0f4"><h1 style="margin:0;font-size:18px;color:#0f172a">New inquiry</h1><p style="margin:4px 0 0;font-size:12px;color:#64748b">From your website contact form</p></td></tr>
          <tr><td style="padding:20px 24px"><p style="margin:0 0 12px"><strong style="color:#0f172a">Name:</strong> ${fullName}</p><p style="margin:0 0 12px"><strong style="color:#0f172a">Email:</strong> <a href="mailto:${reply_to}" style="color:#2563eb;text-decoration:none">${reply_to}</a></p><div style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #eef0f4;border-radius:10px;color:#0f172a;line-height:1.6">${String(message||'').replace(/\n/g,'<br/>')}</div></td></tr>
          <tr><td style="padding:16px 24px;border-top:1px solid #eef0f4;color:#94a3b8;font-size:12px">© ${new Date().getFullYear()} Jugnu Nagar</td></tr>
        </table>
      </div>`;

    const userHtml = `
      <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f6f7fb;padding:24px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:auto;background:#ffffff;border-radius:12px;border:1px solid #eef0f4;overflow:hidden">
          <tr><td style="padding:24px;text-align:center"><h1 style="margin:0 0 6px;font-size:18px;color:#0f172a">Thanks, ${fullName}.</h1><p style="margin:0;color:#64748b;font-size:14px">I received your message and will reply shortly.</p></td></tr>
          <tr><td style="padding:0 24px 20px"><div style="margin-top:10px;padding:14px 16px;background:#f8fafc;border:1px solid #eef0f4;border-radius:10px;color:#0f172a;font-size:14px">In the meantime, feel free to reply to this email with any extra details.</div></td></tr>
          <tr><td style="padding:16px 24px;border-top:1px solid #eef0f4;color:#94a3b8;font-size:12px">© ${new Date().getFullYear()} Jugnu Nagar</td></tr>
        </table>
      </div>`;

    await transporter.sendMail({ from: FROM_EMAIL, to: TO_EMAIL, subject: `New inquiry from ${fullName}`, replyTo: reply_to, text: message, html: ownerHtml });
    await transporter.sendMail({ from: FROM_EMAIL, to: reply_to, subject: 'Thanks for reaching out — Jugnu Nagar', text: `Hi ${fullName},\n\nThanks for reaching out. I received your message and will reply shortly.\n\n— Jugnu Nagar`, html: userHtml });

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'Email failed' });
  }
}


