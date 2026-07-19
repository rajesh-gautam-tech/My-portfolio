import React from 'react';

export default function SectionHeader({ num, subtitle, title }) {
  return (
    <>
      <style>{`
        /* 5th Image (image_81f9c7.png) Lower-Third Dynamic Replicant Box */
        .l3-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 60px auto 40px auto;
          padding: 0 20px;
          box-sizing: border-box;
          user-select: none;
        }

        .l3-container {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          height: 90px;
          margin-bottom: 25px;
        }

        /* Red Cyber Main Glass Bar (Center-Right Backdrop) */
        .l3-main-bar {
          position: absolute;
          left: 60px;
          right: 35px;
          height: 68px;
          background: linear-gradient(180deg, #9e1b1b 0%, #520b0b 100%);
          border-top: 1px solid rgba(230, 57, 70, 0.4);
          border-bottom: 2px solid rgba(139, 26, 26, 0.85);
          box-shadow: 0 8px 32px rgba(139, 26, 26, 0.25), inset 0 1px 15px rgba(255,255,255,0.1);
          z-index: 2;
          display: flex;
          align-items: center;
          padding-left: 110px;
          box-sizing: border-box;
        }

        /* Top Bright Glow Beam Line over the red bar */
        .l3-main-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff4d5a, transparent);
          box-shadow: 0 0 12px #e63946;
        }

        /* Left Branding Container (Where "YOUR LOGO" was replaced) */
        .l3-logo-block {
          position: absolute;
          left: 0;
          width: 135px;
          height: 84px;
          background: linear-gradient(135deg, #1b133a 0%, #0d091a 100%);
          border: 1px solid rgba(106, 90, 205, 0.35);
          border-radius: 18px;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.65), 0 0 15px rgba(106, 90, 205, 0.25);
          overflow: hidden;
        }

        /* Neon Border Capsule Ring on Left Block */
        .l3-logo-block::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 18px;
          padding: 1.5px;
          background: linear-gradient(140deg, #6a5acd, transparent 50%, #8b1a1a);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .l3-logo-block svg {
          width: 52px;
          height: 52px;
          filter: drop-shadow(0 0 8px rgba(139,26,26,0.5));
        }

        /* Heading Title Placement (Replaces "HEADLINE TEXT") */
        .l3-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(1.2rem, 3vw, 1.9rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.25);
        }

        /* Cyberpunk Neon Cap / Wing on the Right Edge */
        .l3-right-cap {
          position: absolute;
          right: 0;
          width: 48px;
          height: 76px;
          background: linear-gradient(135deg, #2c0b3d 0%, #110318 100%);
          border-radius: 14px;
          border: 1px solid rgba(218, 112, 214, 0.4);
          box-shadow: 0 0 20px rgba(218, 112, 214, 0.3), inset 0 0 12px rgba(218,112,214,0.2);
          z-index: 3;
          transform: skewX(-6deg);
        }

        /* Bottom Support Purple Marquee Ribbon Bar */
        .l3-sub-ribbon {
          position: relative;
          width: calc(100% - 120px);
          margin-left: 85px;
          height: 22px;
          background: linear-gradient(90deg, #3d3566 0%, #201a3b 100%);
          border-left: 3px solid #6a5acd;
          border-radius: 0 4px 4px 0;
          display: flex;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          z-index: 1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        /* Meta Indicator Text Inside Sub Ribbon Bar */
        .l3-sub-ribbon p {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: #bcaee6;
          text-transform: uppercase;
          margin: 0;
        }

        .l3-num {
          color: #e63946;
          margin-right: 8px;
          font-weight: 900;
        }

        @media (max-width: 768px) {
          .l3-main-bar { left: 40px; right: 15px; padding-left: 95px; height: 58px; }
          .l3-logo-block { width: 110px; height: 72px; }
          .l3-logo-block svg { width: 42px; height: 42px; }
          .l3-right-cap { width: 32px; height: 64px; }
          .l3-sub-ribbon { width: calc(100% - 70px); margin-left: 55px; }
        }
      `}</style>

      <div className="l3-wrapper">
        <div className="l3-container">
          {/* LEFT CAPSULE: Your premium identity logo replacement */}
          <div className="l3-logo-block">
            <svg viewBox="0 0 120 120" fill="none">
              <defs>
                <linearGradient id="headerG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff"/>
                  <stop offset="100%" stopColor="#8b1a1a"/>
                </linearGradient>
              </defs>
              <line x1="28" y1="20" x2="28" y2="100" stroke="url(#headerG)" strokeWidth="11" strokeLinecap="round"/>
              <line x1="28" y1="20" x2="62" y2="20" stroke="url(#headerG)" strokeWidth="11" strokeLinecap="round"/>
              <path d="M62 20 Q88 20 88 42 Q88 62 62 62 L28 62" stroke="url(#headerG)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M52 62 L88 100" stroke="url(#headerG)" strokeWidth="11" strokeLinecap="round"/>
            </svg>
          </div>

          {/* MAIN RED BODY BAR */}
          <div className="l3-main-bar">
            <h2 className="l3-title">{title}</h2>
          </div>

          {/* RIGHT GLASS WING */}
          <div className="l3-right-cap"></div>
        </div>

        {/* BOTTOM SUB SUPPORTING BAR */}
        <div className="l3-sub-ribbon">
          <p>
            <span className="l3-num">{num}</span> // {subtitle}
          </p>
        </div>
      </div>
    </>
  );
}