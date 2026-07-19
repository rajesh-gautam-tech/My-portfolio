import React from 'react';
import Tilt from 'react-parallax-tilt'; // 1. Tilt import kiya

export default function About() {
  return (
    <>
      <style>{`
        /* ── ABOUT SECTION ── */
        .ab-grid {
          display: grid;
          grid-template-columns: 0.75fr 1.25fr;
          gap: 64px;
          align-items: center;
          padding-bottom: 100px;
        }

        /* ── LEFT PANEL: Glass ID Card ── */
        .ab-card {
          position: relative;
          background: linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.015) 100%);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px 32px 0 32px;
          overflow: hidden;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.4),
            0 18px 44px -14px rgba(0,0,0,0.65),
            0 0 32px -10px rgba(123,95,255,0.18);
          
          /* 3D Context enable karne ke liye */
          transform-style: preserve-3d; 
          transform: perspective(1000px);
        }

        /* Edge-lit top border */
        .ab-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(123,95,255,0.6) 0%,
            rgba(255,159,69,0.3) 50%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Corner accent chip */
        .ab-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at top right, rgba(123,95,255,0.15), transparent 70%);
          border-radius: 0 24px 0 0;
          pointer-events: none;
        }

        .ab-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 0 36px;
          
          /* Logo ko hawa mein uthane ke liye 3D translate effect */
          transform: translateZ(50px); 
        }

        .ab-logo-wrap svg {
          width: 160px;
          height: 160px;
          filter: drop-shadow(0 0 25px rgba(230,57,70,0.65));
          animation: abFloat 4s ease-in-out infinite;
        }

        @keyframes abFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-8px) scale(1.025); }
        }

        /* Meta row at card bottom */
        .ab-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin: 0 -32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          
          /* Meta text ko halka sa 3D depth dene ke liye */
          transform: translateZ(30px);
        }

        .ab-meta-cell {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: background 0.25s;
        }

        .ab-meta-cell:first-child {
          border-right: 1px solid rgba(255,255,255,0.06);
        }

        .ab-meta-cell:hover {
          background: rgba(123,95,255,0.06);
        }

        .ab-meta-val {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }

        .ab-meta-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.52rem;
          letter-spacing: 0.22em;
          color: rgba(129,138,163,0.7);
          text-transform: uppercase;
        }

        /* ── RIGHT PANEL: Text content ── */
        .ab-content {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ab-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          color: #7b5fff;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .ab-heading {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin: 0 0 32px 0;
        }

        .ab-heading em {
          font-style: normal;
          background: linear-gradient(135deg, #7b5fff, #ff9f45);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ab-p {
          font-size: 0.95rem;
          line-height: 1.8;
          color: rgba(199,203,220,0.85);
          margin-bottom: 20px;
          font-weight: 400;
        }

        .ab-p strong {
          color: #ffffff;
          font-weight: 600;
        }

        /* Quote block — glass inset */
        .ab-quote {
          position: relative;
          margin-top: 8px;
          padding: 22px 28px;
          background: linear-gradient(135deg, rgba(123,95,255,0.06), rgba(255,159,69,0.03));
          border: 1px solid rgba(255,255,255,0.07);
          border-left: 3px solid #7b5fff;
          border-radius: 0 16px 16px 0;
          box-shadow:
            0 4px 16px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .ab-quote-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          line-height: 1.65;
          color: rgba(199,203,220,0.9);
          letter-spacing: 0.02em;
          margin: 0;
        }

        .ab-quote::before {
          content: '"';
          position: absolute;
          top: -12px;
          left: 20px;
          font-size: 3rem;
          color: rgba(123,95,255,0.3);
          font-family: Georgia, serif;
          line-height: 1;
        }

        /* Reveal animation */
        .rv { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .rv.vis { opacity: 1; transform: none; }

        @media (max-width: 900px) {
          .ab-grid { grid-template-columns: 1fr; gap: 40px; padding-bottom: 80px; }
          .ab-card { max-width: 420px; margin: 0 auto; width: 100%; }
        }
      `}</style>

      <div className="ab-grid rv vis"> {/* Animtaion test ke liye maine vis manually add kiya hai yahan */}
        
        {/* ── LEFT: ID Card wrapped inside Tilt Component ── */}
        <Tilt
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={0.12}
          glareColor="#ffffff"
          glarePosition="all"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="ab-card">
            <div className="ab-logo-wrap">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15,25 L65,25 C75,25 82,32 78,45 C75,55 65,65 52,65 L40,65 L65,92 L28,68 L32,58 L45,58 C52,58 56,54 58,48 C60,42 55,38 48,38 L32,38 L32,58 L15,58 Z" fill="#991b1b" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18,28 L62,28 C70,28 76,33 73,43 C70,52 62,61 50,61 L37,61 L60,86 L29,64 L34,54 L45,54 C50,54 54,50 55,45 C56,40 52,35 45,35 L29,35 L29,54 L18,54 Z" fill="#11111d" />
                <path d="M28,35 L50,35 C55,35 56,39 55,43 C53,48 49,52 44,52 L35,52 L58,78 L31,56 L35,46 L28,46 Z" fill="#ffffff" />
              </svg>
            </div>

            <div className="ab-meta">
              <div className="ab-meta-cell">
                <span className="ab-meta-val">3rd</span>
                <span className="ab-meta-lbl">Year</span>
              </div>
              <div className="ab-meta-cell">
                <span className="ab-meta-val">B.Tech</span>
                <span className="ab-meta-lbl">CSE</span>
              </div>
            </div>
          </div>
        </Tilt>

        {/* ── RIGHT: Content ── */}
        <div className="ab-content">
          <span className="ab-eyebrow">// Overview</span>
          <h2 className="ab-heading">System <em>Core</em></h2>

          <p className="ab-p">
            Hey, I'm <strong>Rajesh Kumar Gautam</strong> — a 3rd year Computer Science student at Dr. A.P.J. Abdul Kalam Technical University, Uttar Pradesh.
          </p>
          <p className="ab-p">
            I love building things that live on the internet — clean UIs, functional backends, and everything in between. I started with building simple web layouts and kept going deeper, picking up React, Node.js, and databases along the way to build robust apps.
          </p>

          <div className="ab-quote">
            <p className="ab-quote-text">
              "I build things, break things, fix things — and learn something new every time."
            </p>
          </div>
        </div>
      </div>
    </>
  );
}