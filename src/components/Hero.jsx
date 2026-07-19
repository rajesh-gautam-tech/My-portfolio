import React, { useEffect, useRef } from 'react';

export default function Hero({ portRef }) {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollHintRef = useRef(null);
  const heroOvRef = useRef(null);
  const nameRef = useRef(null);

  const gridCellsRef = useRef([]);
  const cellDataRef = useRef([]);
  const dimsRef = useRef({ cols: 0, rows: 0 });
  const mouseRef = useRef({ mx: 0.5, my: 0.5, tmx: 0.5, tmy: 0.5 });

  useEffect(() => {
    const nameElement = nameRef.current;
    if (nameElement) {
      const nameText = "RAJESH KUMAR GAUTAM";
      nameElement.innerHTML = `<div class="roll-container">
        <div class="roll-primary">${nameText.split("").map((c, i) => `<span class="roll-char" style="--delay: ${0.02 * Math.abs(i - 9)}s">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div>
        <div class="roll-absolute">${nameText.split("").map((c, i) => `<span class="roll-char" style="--delay: ${0.02 * Math.abs(i - 9)}s">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div>
      </div>`;
      
      const interval = setInterval(() => {
        nameElement.classList.add('active');
        setTimeout(() => nameElement.classList.remove('active'), 1500);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const gc = canvasRef.current;
    if (!hero || !gc) return;

    const buildGrid = () => {
      const W = hero.offsetWidth, H = hero.offsetHeight;
      const C = window.innerWidth < 600 ? 140 : 260;
      const cols = Math.ceil(W / C) + 1, rows = Math.ceil(H / C) + 1;
      dimsRef.current = { cols, rows };

      gc.innerHTML = '';
      gc.style.gridTemplateColumns = `repeat(${cols}, ${C}px)`;
      gc.style.gridTemplateRows = `repeat(${rows}, ${C}px)`;

      gridCellsRef.current = [];
      cellDataRef.current = [];

      for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement('div');
        cell.className = 'gc';
        cell.innerHTML = `<div class="gc-inner"><div class="gc-front"></div><div class="gc-back"></div></div>`;
        gc.appendChild(cell);
        gridCellsRef.current.push(cell);

        const ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 180;
        cellDataRef.current.push({
          tx: Math.cos(ang) * dist, ty: Math.sin(ang) * dist, tz: -60 - Math.random() * 100,
          rx: (Math.random() - 0.5) * 320, ry: (Math.random() - 0.5) * 320, delay: Math.random() * 0.28
        });
      }
    };

    buildGrid();
    window.addEventListener('resize', buildGrid);

    const flippedCells = new Set();
    const handleMouseMove = (e) => {
      const sp = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight || 1)));
      if (sp > 0.04) return;

      const rect = gc.getBoundingClientRect();
      const mouseX = e.clientX - rect.left, mouseY = e.clientY - rect.top;
      const C = window.innerWidth < 600 ? 140 : 260;
      let exactIdx = -1;

      for (let i = 0; i < gridCellsRef.current.length; i++) {
        const cCol = i % dimsRef.current.cols, cRow = Math.floor(i / dimsRef.current.cols);
        if (mouseX >= 4 + cCol * (C + 6) && mouseX <= 4 + cCol * (C + 6) + C && mouseY >= 4 + cRow * (C + 6) && mouseY <= 4 + cRow * (C + 6) + C) {
          exactIdx = i; break;
        }
      }
      flippedCells.forEach(idx => { if (idx !== exactIdx && gridCellsRef.current[idx]) { gridCellsRef.current[idx].classList.remove('flipped'); flippedCells.delete(idx); } });
      if (exactIdx !== -1 && gridCellsRef.current[exactIdx]) { gridCellsRef.current[exactIdx].classList.add('flipped'); flippedCells.add(exactIdx); }
      
      mouseRef.current.tmx = e.clientX / window.innerWidth;
      mouseRef.current.tmy = e.clientY / window.innerHeight;
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    hero.addEventListener('mouseleave', () => { flippedCells.forEach(idx => gridCellsRef.current[idx]?.classList.remove('flipped')); flippedCells.clear(); });

    const tick = () => {
      const sp = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight || 1)));
      const e = sp < 0.5 ? 2 * sp * sp : 1 - Math.pow(-2 * sp + 2, 2) / 2;

      gridCellsRef.current.forEach((cell, i) => {
        const d = cellDataRef.current[i]; if (!d) return;
        const le = Math.max(0, Math.min(1, (e - d.delay * 0.5) / (1 - d.delay * 0.5)));
        cell.style.transform = `perspective(700px) translate(${d.tx * le}px,${d.ty * le}px) translateZ(${d.tz * le}px) rotateX(${d.rx * le}deg) rotateY(${d.ry * le}deg)`;
        cell.style.opacity = Math.max(0, 1 - le * 1.8);
      });

      if (portRef && portRef.current) {
        const smoothFade = Math.max(0, Math.min(1, (sp - 0.25) / 0.6));
        portRef.current.style.opacity = smoothFade;
        portRef.current.style.transform = `translateY(${(1 - smoothFade) * 60}px)`;
        if (sp < 0.05) {
          portRef.current.style.pointerEvents = 'none';
          gc.style.pointerEvents = 'auto';
        } else {
          portRef.current.style.pointerEvents = 'auto';
          gc.style.pointerEvents = 'none';
        }
      }

      if (scrollHintRef.current) scrollHintRef.current.style.opacity = Math.max(0, 1 - e * 5);
      if (heroOvRef.current) heroOvRef.current.style.opacity = Math.max(0, 1 - e * 2.5);

      let { mx, my, tmx, tmy } = mouseRef.current;
      mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      mouseRef.current.mx = mx; mouseRef.current.my = my;

      if (sp < 0.04) {
        const tmax = 10 * (1 - sp * 20);
        const gx = (my - 0.5) * -tmax, gy = (mx - 0.5) * tmax;
        gridCellsRef.current.forEach((cell, i) => {
          if (parseFloat(cell.style.opacity || 1) < 0.1) return;
          const col = i % dimsRef.current.cols, row = Math.floor(i / dimsRef.current.cols);
          const rx = gx * 0.4 + (row / dimsRef.current.rows - 0.5) * gx * 0.25;
          const ry = gy * 0.4 + (col / dimsRef.current.cols - 0.5) * gy * 0.25;
          cell.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
      }

      requestAnimationFrame(tick);
    };
    const animId = requestAnimationFrame(tick);
    return () => { window.removeEventListener('resize', buildGrid); cancelAnimationFrame(animId); };
  }, [portRef]);

  return (
    <>
      <style>{`
        #hero-wrapper { position: relative; height: 200vh; width: 100%; z-index: 1; background: #07070d; }
        #hero { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; overflow: hidden; background: #07070d; }
        #grid-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: grid; z-index: 1; padding: 4px; gap: 6px; box-sizing: border-box; }
        
        .gc { position: relative; transform-style: preserve-3d; will-change: transform, opacity; cursor: crosshair; }
        .gc-inner { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1); }
        
        .gc-front { position: absolute; inset: 0; backface-visibility: hidden; background: #0e0e18; border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 20px; transition: border-color 0.25s, box-shadow 0.25s, background 0.25s; }
        
        /* HOVER HONE PAR RED FLIP EFFECT WITH SHARP CYBER GLOW */
        .gc-back { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 20px; background: #8b1a1a; border: 1px solid #e63946; box-shadow: inset 0 0 30px rgba(0,0,0,0.7), 0 0 20px rgba(139,26,26,0.5); transform: rotateY(180deg); }
        .gc.flipped .gc-front { background: #1a0808; border-color: rgba(230, 57, 70, 0.6); box-shadow: 0 0 25px rgba(139, 26, 26, 0.4); }
        .gc.flipped .gc-inner { transform: rotateY(180deg); }
        
        /* OVERLAP & CLIPPING FIX: Pure fluid typography constraints */
        #hero-ov { position: absolute; inset: 0; z-index: 12; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; text-align: center; width: 100%; padding: 0 30px; box-sizing: border-box; }
        #hero-brand { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; animation: hIn 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s both; pointer-events: auto; width: 100%; max-width: 1400px; margin: 0 auto; box-sizing: border-box; }
        @keyframes hIn { from { opacity:0; transform:translateY(30px) scale(0.97) } to { opacity:1; transform:none } }
        
        #logo-svg { width: 88px; height: 88px; filter: drop-shadow(0 0 15px rgba(139,26,26,0.4)); animation: lpulse 3s ease-in-out infinite; }
        @keyframes lpulse { 0%,100% { filter:drop-shadow(0 0 15px rgba(139,26,26,0.4)) } 50% { filter:drop-shadow(0 0 25px rgba(139,26,26,0.6)) } }
        
        /* OPTIMIZED FONT METRICS: Safely scaled to never overflow or clip horizontally */
        #hero-name { position: relative; font-family: 'Orbitron', sans-serif; font-size: clamp(1.3rem, 4vw, 2.9rem); font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; margin: 0; line-height: 1.2; width: 100%; text-align: center; display: block; overflow: hidden; }
        .roll-container { position: relative; overflow: hidden; display: block; width: 100%; }
        .roll-primary, .roll-absolute { display: flex; justify-content: center; align-items: center; white-space: pre; width: 100%; }
        .roll-absolute { position: absolute; inset: 0; }
        .roll-char { display: inline-block; transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: var(--delay); }
        
        .roll-primary .roll-char { transform: translateY(0); background: linear-gradient(135deg, #ffffff 0%, #a0a0b5 50%, #8b1a1a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .roll-absolute .roll-char { transform: translateY(100%); background: linear-gradient(135deg, #8b1a1a 0%, #e63946 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        #hero-name.active .roll-primary .roll-char { transform: translateY(-100%); }
        #hero-name.active .roll-absolute .roll-char { transform: translateY(0); }
        
        /* CLEAN SUBTITLE: Simplified and mapped cleanly to Frontend Developer */
        #hero-sub { font-family: 'Space Mono', monospace; font-size: clamp(0.68rem, 1.3vw, 0.82rem); letter-spacing: 0.2em; color: #a0a0b5; text-transform: uppercase; margin: 0; text-align: center; line-height: 1.6; }
        .hdiv { width: 140px; height: 1px; background: linear-gradient(90deg, transparent, #8b1a1a, transparent); }
        
        #scroll-hint { position: absolute; bottom: 35px; left: 50%; transform: translateX(-50%); z-index: 12; display: flex; flex-direction: column; align-items: center; gap: 10px; pointer-events: none; }
        #scroll-hint span { font-family: 'Space Mono', monospace; font-size: 0.6rem; letter-spacing: 0.3em; color: #62627a; text-transform: uppercase; }
        .sarrow { width: 16px; height: 16px; border-right: 1px solid #62627a; border-bottom: 1px solid #62627a; transform: rotate(45deg); animation: ab 1.5s ease-in-out infinite; }
        @keyframes ab { 0%,100% { transform:rotate(45deg) translateY(0); opacity:0.35 } 50% { transform:rotate(45deg) translateY(5px); opacity:0.85 } }
        
        @media(max-width: 768px) {
          #hero-brand { gap: 14px; }
          #hero-name { font-size: 1.25rem; letter-spacing: 0.02em; }
          #hero-sub { letter-spacing: 0.12em; }
        }
      `}</style>

      <div id="hero-wrapper" ref={heroRef}>
        <div id="hero">
          <div id="grid-canvas" ref={canvasRef} aria-hidden="true"></div>
          <div id="hero-ov" ref={heroOvRef}>
            <div id="hero-brand">
              <svg id="logo-svg" viewBox="0 0 120 120" fill="none">
                <defs>
                  <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="100%" stop-color="#8b1a1a"/>
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 8"/>
                <path d="M 8 92 Q 40 18 92 48 Q 112 60 96 96" stroke="rgba(139,26,26,0.2)" strokeWidth="1.5" fill="none" />
                <line x1="28" y1="20" x2="28" y2="100" stroke="url(#lg1)" strokeWidth="11" strokeLinecap="round"/>
                <line x1="28" y1="20" x2="62" y2="20" stroke="url(#lg1)" strokeWidth="11" strokeLinecap="round"/>
                <path d="M62 20 Q88 20 88 42 Q88 62 62 62 L28 62" stroke="url(#lg1)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M52 62 L88 100" stroke="url(#lg1)" strokeWidth="11" strokeLinecap="round"/>
              </svg>
              <div className="hdiv"></div>
              <h1 id="hero-name" ref={nameRef}>RAJESH KUMAR GAUTAM</h1>
              {/* Perfectly Simple and Clean Title Mapping Your Core Frontend Stack */}
              <p id="hero-sub">Frontend Developer</p>
            </div>
          </div>
          <div id="scroll-hint" ref={scrollHintRef}>
            <span>Scroll to explore</span>
            <div className="sarrow"></div>
          </div>
        </div>
      </div>
    </>
  );
}