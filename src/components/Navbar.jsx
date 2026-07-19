import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shared Lightning R SVG Component for UI consistency
  const LightningLogo = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Red/Crimson Shadow Stroke */}
      <path d="M15,25 L65,25 C75,25 82,32 78,45 C75,55 65,65 52,65 L40,65 L65,92 L28,68 L32,58 L45,58 C52,58 56,54 58,48 C60,42 55,38 48,38 L32,38 L32,58 L15,58 Z" fill="#991b1b" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />
      {/* Dark inner backing */}
      <path d="M18,28 L62,28 C70,28 76,33 73,43 C70,52 62,61 50,61 L37,61 L60,86 L29,64 L34,54 L45,54 C50,54 54,50 55,45 C56,40 52,35 45,35 L29,35 L29,54 L18,54 Z" fill="#11111d" />
      {/* Main White Lightning Core Accent */}
      <path d="M28,35 L50,35 C55,35 56,39 55,43 C53,48 49,52 44,52 L35,52 L58,78 L31,56 L35,46 L28,46 Z" fill="#ffffff" />
    </svg>
  );

  return (
    <>
      <style>{`
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 15px 40px; display: flex; align-items: center; justify-content: space-between; transition: background 0.4s, backdrop-filter 0.4s; }
        nav.sc { background: rgba(7,7,13,0.85); backdrop-filter: blur(18px); box-shadow: 0 1px 0 var(--border); }
        .nlogo { font-family: var(--fd); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.22em; color: var(--white); text-decoration: none; display: flex; align-items: center; gap: 12px; }
        .nlogo svg { width: 34px; height: 34px; filter: drop-shadow(0 0 6px rgba(230,57,70,0.5)); }
        .nlinks { display: flex; gap: 40px; list-style: none; align-items: center; }
        .premium-btn.nav-fluid-link { padding: 8px 24px; font-size: 0.62rem; letter-spacing: 0.15em; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.12); }
        .ncta.premium-btn { padding: 10px 24px; }
        .ncta.premium-btn .btn-text-main { background: linear-gradient(to right, #ffffff, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ntog { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .ntog span { display: block; width: 20px; height: 1.5px; background: var(--silver); transition: all 0.3s; }
        @media(max-width:900px){
          .nlinks { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(7,7,13,0.96); backdrop-filter: blur(20px); padding: 22px 22px; gap: 16px; border-bottom: 1px solid var(--border); }
          .nlinks.open { display: flex; }
          .premium-btn.nav-fluid-link { width: 100%; padding: 12px; font-size: 0.65rem; text-align: center; }
          .premium-btn.ncta { display: none; } 
          .ntog { display: flex; }
        }
      `}</style>

      <nav className={navScrolled ? 'sc' : ''}>
        <a href="#" className="nlogo">
          <LightningLogo />
          RKG
        </a>

        <ul className={`nlinks ${menuOpen ? 'open' : ''}`}>
          {['ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="premium-btn nav-fluid-link">
                <span className="btn-text-main">{item}</span>
                <svg className="wave-bg" viewBox="0 0 2400 800" xmlns="http://www.w3.org/2000/svg">
                  <path fill="url(#sssurf-grad-nav)" opacity="1" d="M 0 305 Q 227 450 600 302 Q 1010 450 1200 343 Q 1379 450 1800 320 Q 2153 450 2400 314 L 2400 800 L 0 800 Z" transform="matrix(1,0,0,1,0,180)"></path>
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="premium-btn ncta">
          <span className="btn-text-main">HIRE ME</span>
          <svg className="wave-bg" viewBox="0 0 2400 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sssurf-grad-nav" y2="100%" x2="50%" y1="0%" x1="50%">
                <stop offset="0%" stopColor="hsl(37, 99%, 67%)"></stop>
                <stop offset="100%" stopColor="hsl(316, 73%, 52%)"></stop>
              </linearGradient>
            </defs>
            <path opacity="1" d="M 0 305 Q 227 450 600 302 Q 1010 450 1200 343 Q 1379 450 1800 320 Q 2153 450 2400 314 L 2400 800 L 0 800 Z" transform="matrix(1,0,0,1,0,245)"></path>
          </svg>
        </a>

        <button className="ntog" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : '' }}></span>
          <span style={{ opacity: menuOpen ? '0' : '' }}></span>
          <span style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : '' }}></span>
        </button>
      </nav>
    </>
  );
}