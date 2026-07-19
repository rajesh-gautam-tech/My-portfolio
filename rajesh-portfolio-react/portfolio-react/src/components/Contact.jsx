import { useState } from "react";
import { contactIntro, contactLinks } from "../data/portfolioData";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    // Hook up your own send logic here (API call, email service, etc.)
    setSent(true);
  };

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
            disabled={sent}
          >
            <span className="btn-text-main">{sent ? "TRANSMITTED ✓" : "SEND PAYLOAD →"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
