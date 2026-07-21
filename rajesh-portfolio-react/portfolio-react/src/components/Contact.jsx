import { useState } from "react";
import { contactIntro, contactLinks } from "../data/portfolioData";
import "./Contact.css";

// Paste your deployed Vercel URL here after deploying the backend,
// e.g. "https://your-project-name.vercel.app/api/send"
const API_URL = "https://YOUR-VERCEL-PROJECT.vercel.app/api/send";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    if (status === "sending" || status === "sent") return;

    setStatus("sending");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch (err) {
      console.error("Send error:", err);
      setStatus("error");
    }
  };

  const btnLabel = {
    idle: "SEND PAYLOAD →",
    sending: "SENDING…",
    sent: "TRANSMITTED ✓",
    error: "FAILED — TRY AGAIN",
  }[status];


  return (
    <section id="contact">
      <p className="ey">04 // Communications</p>
      <h2 className="sh rv">
        Get In <em>Touch</em>
      </h2>
      <div className="cl">
        <div className="rv ci">
          <h3 dangerouslySetInnerHTML={{ __html: contactIntro.html }} />
          <div className="clinks">
            {contactLinks.map((link) => (
              <a
                href={link.href}
                className="clink"
                key={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <div className="clico">{link.icon}</div>
                <div className="clc">
                  <strong>{link.label}</strong>
                  <span>{link.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="cf rv">
          <div className="fg">
            <label className="fl" htmlFor="cn">
              Identity
            </label>
            <input
              className="fi"
              type="text"
              id="cn"
              placeholder="Your name / organization"
              value={form.name}
              onChange={handleChange("name")}
            />
          </div>
          <div className="fg">
            <label className="fl" htmlFor="ce">
              Return Routing
            </label>
            <input
              className="fi"
              type="email"
              id="ce"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange("email")}
            />
          </div>
          <div className="fg">
            <label className="fl" htmlFor="cm">
              Transmission Payload
            </label>
            <textarea
              className="fta"
              id="cm"
              placeholder="Type your message payload here..."
              value={form.message}
              onChange={handleChange("message")}
            />
          </div>

          <button
            className="premium-btn"
            id="sbtn"
            type="button"
            style={{ alignSelf: "flex-start", minWidth: "200px" }}
            onClick={handleSubmit}
            disabled={status === "sending" || status === "sent"}
          >
            <span className="btn-text-main">{btnLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}