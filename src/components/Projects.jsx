import React, { useEffect, useRef } from 'react';

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.p-card');
    if (!cards) return;

    const cleanups = [];

    cards.forEach(card => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const tiltX = (yc - y) / 14;
        const tiltY = (x - xc) / 14;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.025, 1.025, 1.025)`;
        const glow = card.querySelector('.p-card-glow');
        if (glow) {
          glow.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(230,57,70,0.14), transparent)`;
        }
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        const glow = card.querySelector('.p-card-glow');
        if (glow) glow.style.background = 'transparent';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  const projectList = [
    {
      title: "NEXUS CRYPTO ENGINE",
      tech: ["React", "Web3", "Node.js"],
      desc: "Decentralized automated high-frequency trading interface executing atomic swaps across multi-chain smart contracts in sub-milliseconds.",
    },
    {
      title: "DARKMATTER OS INTERFACE",
      tech: ["Three.js", "WebGL", "GLSL"],
      desc: "A browser-rendered 3D workspace environment utilizing custom GLSL fragment shaders simulating node networks and data fields.",
    },
    {
      title: "QUANTUM CHAT TERMINAL",
      tech: ["WebSockets", "Rust", "E2EE"],
      desc: "Military-grade end-to-end encrypted messaging pipeline backed by a lightning-fast asynchronous Rust socket framework.",
    },
  ];

  return (
    <>
      <style>{`
        /* ── PROJECTS GRID ── */
        .p-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding-bottom: 100px;
        }

        /* Glass card */
        .p-card {
          position: relative;
          background: linear-gradient(
            155deg,
            rgba(255,255,255,0.065) 0%,
            rgba(255,255,255,0.015) 100%
          );
          backdrop-filter: blur(18px) saturate(130%);
          -webkit-backdrop-filter: blur(18px) saturate(130%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px 32px 32px;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out, box-shadow 0.35s ease, border-color 0.35s;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.35),
            0 14px 40px -12px rgba(0,0,0,0.6);
          cursor: default;
        }

        /* Edge-lit gradient border on hover */
        .p-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(123,95,255,0.0) 40%,
            rgba(255,159,69,0.0) 70%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          transition: background 0.4s;
        }

        .p-card:hover {
          border-color: rgba(123,95,255,0.3);
          box-shadow:
            0 4px 10px rgba(0,0,0,0.5),
            0 28px 70px -18px rgba(0,0,0,0.7),
            0 0 56px -10px rgba(123,95,255,0.22);
        }

        .p-card:hover::before {
          background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(123,95,255,0.5) 40%,
            rgba(255,159,69,0.4) 70%,
            transparent 100%
          );
        }

        /* Radial hover glow overlay */
        .p-card-glow {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          pointer-events: none;
          transition: background 0.1s ease;
        }

        /* Protocol label */
        .p-num {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          color: rgba(123,95,255,0.7);
          margin-bottom: 20px;
          transform: translateZ(30px);
        }

        .p-title {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.04em;
          line-height: 1.25;
          margin: 0 0 14px 0;
          transform: translateZ(50px);
        }

        .p-desc {
          font-size: 0.86rem;
          line-height: 1.65;
          color: rgba(129,138,163,0.9);
          margin: 0 0 32px 0;
          transform: translateZ(40px);
        }

        /* Tech tags */
        .p-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          transform: translateZ(30px);
        }

        .p-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          color: rgba(199,203,220,0.75);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 5px 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.03);
          text-transform: uppercase;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }

        .p-card:hover .p-tag {
          border-color: rgba(123,95,255,0.3);
          color: rgba(199,203,220,0.95);
          background: rgba(123,95,255,0.06);
        }

        /* Arrow action button */
        .p-action {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(199,203,220,0.5);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateZ(45px);
          background: rgba(255,255,255,0.02);
        }

        .p-card:hover .p-action {
          background: rgba(123,95,255,0.2);
          border-color: rgba(123,95,255,0.5);
          color: #ffffff;
          box-shadow: 0 0 20px rgba(123,95,255,0.35);
          transform: translateZ(45px) scale(1.1);
        }

        /* Reveal */
        .rvs > * {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .rvs.vis > *:nth-child(1) { opacity:1; transform:none; transition-delay: 0s; }
        .rvs.vis > *:nth-child(2) { opacity:1; transform:none; transition-delay: 0.1s; }
        .rvs.vis > *:nth-child(3) { opacity:1; transform:none; transition-delay: 0.2s; }

        @media (max-width: 1100px) { .p-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px) {
          .p-grid { grid-template-columns: 1fr; gap: 24px; }
          .p-card { min-height: 300px; padding: 28px 24px 24px; }
        }
      `}</style>

      <div className="p-grid rvs" ref={containerRef}>
        {projectList.map((p, idx) => (
          <div className="p-card" key={idx}>
            <div className="p-card-glow" aria-hidden="true" />
            <div>
              <span className="p-num">// PROTOCOL_0{idx + 1}</span>
              <h3 className="p-title">{p.title}</h3>
              <p className="p-desc">{p.desc}</p>
            </div>
            <div>
              <div className="p-tags">
                {p.tech.map((t, i) => (
                  <span className="p-tag" key={i}>{t}</span>
                ))}
              </div>
              <div className="p-action" aria-label={`Open ${p.title}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}