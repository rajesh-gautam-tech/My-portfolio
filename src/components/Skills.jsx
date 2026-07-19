import React from 'react';

export default function Skills() {
  const tracks = [
    { cat: "CORE ARCHITECTURE", items: ["React / Next.js", "TypeScript", "HTML5 / Canvas", "TailwindCSS"] },
    { cat: "BACKEND STACK",     items: ["Node.js / Express", "Asynchronous Rust", "RESTful / WebSockets", "GraphQL"] },
    { cat: "DATA ENGINE",       items: ["MongoDB / Mongoose", "PostgreSQL", "Redis Cache", "SQL / NoSQL Processing"] },
    { cat: "CYBER DEPLOYMENT",  items: ["Git / Version Control", "Docker Containers", "Vercel / AWS", "Linux Terminal Systems"] },
  ];

  return (
    <>
      <style>{`
        /* ── SKILLS GRID ── */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding-bottom: 100px;
        }

        /* Glass panel */
        .sk-panel {
          position: relative;
          background: linear-gradient(
            155deg,
            rgba(255,255,255,0.06) 0%,
            rgba(255,255,255,0.012) 100%
          );
          backdrop-filter: blur(18px) saturate(130%);
          -webkit-backdrop-filter: blur(18px) saturate(130%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 32px 28px;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.35), 0 12px 32px -10px rgba(0,0,0,0.55);
        }

        /* Top signal line per panel */
        .sk-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 20px; right: 20px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(123,95,255,0.6), transparent);
          opacity: 0;
          transition: opacity 0.35s;
        }

        .sk-panel:hover {
          transform: translateY(-4px);
          border-color: rgba(123,95,255,0.22);
          box-shadow:
            0 4px 10px rgba(0,0,0,0.5),
            0 24px 56px -16px rgba(0,0,0,0.65),
            0 0 40px -10px rgba(123,95,255,0.2);
        }

        .sk-panel:hover::before { opacity: 1; }

        /* Category header */
        .sk-cat {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .sk-cat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7b5fff;
          box-shadow: 0 0 8px #7b5fff, 0 0 16px rgba(123,95,255,0.5);
          flex-shrink: 0;
        }

        .sk-cat-label {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #ffffff;
          text-transform: uppercase;
        }

        /* Skill list */
        .sk-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sk-item {}

        .sk-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .sk-item-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(199,203,220,0.85);
        }

        .sk-item-status {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          color: rgba(123,95,255,0.7);
          text-transform: uppercase;
        }

        /* Progress bar track */
        .sk-bar-track {
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.05);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }

        /* Animated fill — triggers when .vis is on parent */
        .sk-bar-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #7b5fff 0%, #ff9f45 100%);
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 8px rgba(123,95,255,0.5);
        }

        .rv.vis .sk-bar-fill,
        .rvs.vis .sk-bar-fill {
          transform: scaleX(1);
        }

        .sk-bar-fill:nth-child(1) { transition-delay: 0s; }
        .sk-bar-fill:nth-child(2) { transition-delay: 0.1s; }
        .sk-bar-fill:nth-child(3) { transition-delay: 0.2s; }
        .sk-bar-fill:nth-child(4) { transition-delay: 0.3s; }

        /* Reveal */
        .rv { opacity:0; transform:translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .rv.vis { opacity:1; transform:none; }

        @media (max-width: 1100px) { .sk-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .sk-grid { grid-template-columns: 1fr; gap: 20px; } .sk-panel { padding: 24px 22px; } }
      `}</style>

      <div className="sk-grid rv">
        {tracks.map((track, idx) => (
          <div className="sk-panel" key={idx}>
            <div className="sk-cat">
              <div className="sk-cat-dot" aria-hidden="true" />
              <span className="sk-cat-label">{track.cat}</span>
            </div>

            <ul className="sk-list">
              {track.items.map((item, i) => (
                <li className="sk-item" key={i}>
                  <div className="sk-item-header">
                    <span className="sk-item-name">{item}</span>
                    <span className="sk-item-status">ONLINE</span>
                  </div>
                  <div className="sk-bar-track">
                    <div
                      className="sk-bar-fill"
                      style={{ transitionDelay: `${i * 0.12}s` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}