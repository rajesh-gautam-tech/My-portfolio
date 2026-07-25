const nodemailer = require("nodemailer");

// This runs on Vercel's servers, not in the browser — so your Gmail
// App Password stays secret and is never exposed to visitors.
module.exports = async (req, res) => {
  // Allow your frontend (any origin) to call this endpoint.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing name, email, or message" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // 16-char App Password (not your real password)
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // messages land in your own inbox
      replyTo: email, // hit "reply" and it goes straight to the visitor
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\n---\nFrom: ${name}\nEmail: ${email}`,
      html: `<p>${message.replace(/\n/g, "<br/>")}</p><hr/><p><strong>From:</strong> ${name}<br/><strong>Email:</strong> ${email}</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
};