import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [btnText, setBtnText] = useState('SEND MESSAGE →');
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) {
      setBtnText('FILL ALL FIELDS ✗');
      setTimeout(() => setBtnText('SEND MESSAGE →'), 2000);
      return;
    }
    setSending(true);
    setBtnText('SENDING...');
    setTimeout(() => {
      setBtnText('SENT ✓');
      setSending(false);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setBtnText('SEND MESSAGE →'), 3000);
    }, 1200);
  };

  return (
    <>
      <style>{`
        /* ── CONTACT SECTION ── */
        .ct-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 64px;
          align-items: start;
          padding-bottom: 120px;
        }

        /* ── LEFT: Info panel ── */
        .ct-info {}

        .ct-tagline {
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgba(199,203,220,0.8);
          margin-bottom: 36px;
        }

        .ct-tagline strong {
          color: #ffffff;
          font-weight: 600;
        }

        /* Contact link cards */
        .ct-links { display: flex; flex-direction: column; gap: 12px; }

        .ct-link {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          color: rgba(199,203,220,0.8);
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }

        .ct-link:hover {
          border-color: rgba(123,95,255,0.35);
          color: #ffffff;
          transform: translateX(4px);
          box-shadow:
            -3px 0 0 #7b5fff,
            0 4px 20px rgba(123,95,255,0.18);
          background: linear-gradient(135deg, rgba(123,95,255,0.08), rgba(255,255,255,0.01));
        }

        .ct-link-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(123,95,255,0.12);
          border: 1px solid rgba(123,95,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s, border-color 0.25s;
        }

        .ct-link:hover .ct-link-icon {
          background: rgba(123,95,255,0.22);
          border-color: rgba(123,95,255,0.4);
        }

        .ct-link-icon svg {
          width: 16px;
          height: 16px;
          color: #7b5fff;
        }

        .ct-link-meta { display: flex; flex-direction: column; gap: 2px; }

        .ct-link-type {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          color: rgba(123,95,255,0.8);
          text-transform: uppercase;
        }

        .ct-link-val {
          font-size: 0.85rem;
          color: inherit;
          font-weight: 500;
        }

        /* ── RIGHT: Glass form ── */
        .ct-form {
          background: linear-gradient(155deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.015) 100%);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.4),
            0 18px 44px -14px rgba(0,0,0,0.65),
            0 0 32px -10px rgba(123,95,255,0.12);
          position: relative;
          overflow: hidden;
        }

        /* Top gradient line on form panel */
        .ct-form::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(123,95,255,0.6), rgba(255,159,69,0.4), transparent);
        }

        .ct-field { display: flex; flex-direction: column; gap: 6px; }

        .ct-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          color: rgba(129,138,163,0.8);
          text-transform: uppercase;
        }

        .ct-input,
        .ct-textarea {
          background: rgba(10,13,20,0.6);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          color: #ffffff;
          padding: 13px 16px;
          font-size: 0.88rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          width: 100%;
          box-sizing: border-box;
        }

        .ct-input:focus,
        .ct-textarea:focus {
          border-color: rgba(123,95,255,0.5);
          background: rgba(10,13,20,0.8);
          box-shadow: 0 0 0 3px rgba(123,95,255,0.12), 0 0 20px rgba(123,95,255,0.1);
        }

        .ct-textarea {
          height: 130px;
          resize: none;
          line-height: 1.6;
        }

        /* Send button */
        .ct-send-btn {
          align-self: flex-start;
          min-width: 200px;
          position: relative;
          padding: 14px 28px;
          background: linear-gradient(135deg, rgba(123,95,255,0.2), rgba(123,95,255,0.08));
          border: 1px solid rgba(123,95,255,0.4);
          border-radius: 10px;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 4px 16px rgba(123,95,255,0.15);
        }

        .ct-send-btn:hover {
          background: linear-gradient(135deg, rgba(123,95,255,0.35), rgba(123,95,255,0.15));
          border-color: rgba(123,95,255,0.65);
          box-shadow: 0 0 0 1px rgba(123,95,255,0.4), 0 0 28px rgba(123,95,255,0.35);
          transform: translateY(-2px);
        }

        .ct-send-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.3);
        }

        .ct-send-btn[data-sending="true"] {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Reveal */
        .rv { opacity:0; transform:translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .rv.vis { opacity:1; transform:none; }

        @media (max-width: 900px) {
          .ct-grid { grid-template-columns: 1fr; gap: 40px; }
          .ct-send-btn { width: 100%; }
        }
      `}</style>

      <div className="ct-grid rv">
        {/* ── LEFT ── */}
        <div className="ct-info">
          <p className="ct-tagline">
            Open to <strong>internships, college projects, and collaborations.</strong>
          </p>

          <div className="ct-links">
            <a href="mailto:rajeshkumargautam@email.com" className="ct-link">
              <div className="ct-link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div className="ct-link-meta">
                <span className="ct-link-type">Email</span>
                <span className="ct-link-val">rajeshkumargautam@email.com</span>
              </div>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="ct-form">
          <div className="ct-field">
            <label className="ct-label">Name</label>
            <input
              className="ct-input"
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Rajesh Kumar"
            />
          </div>

          <div className="ct-field">
            <label className="ct-label">Email</label>
            <input
              className="ct-input"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>

          <div className="ct-field">
            <label className="ct-label">Message</label>
            <textarea
              className="ct-textarea"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Let's build something together..."
            />
          </div>

          <button
            className="ct-send-btn"
            onClick={handleSend}
            data-sending={sending}
          >
            {btnText}
          </button>
        </div>
      </div>
    </>
  );
}