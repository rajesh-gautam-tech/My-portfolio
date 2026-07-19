import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';

export default function App() {
  const portRef = useRef(null);
  const glowRef = useRef(null);

  // Mouse Glow Effect for Background
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for Elements Reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          e.target.querySelectorAll('.sbf').forEach((bar) => {
            const w = parseFloat(bar.dataset.w || 1);
            setTimeout(() => {
              bar.style.transform = `scaleX(${w})`;
            }, 150);
          });
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.rv, .rvs').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 3D Tilt Effect on Cards
  useEffect(() => {
    const cards = document.querySelectorAll('.pc3d, .skpanel');
    const cleanups = [];

    cards.forEach(card => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const cx = r.width / 2, cy = r.height / 2;
        const tx = (cy - y) / 12, ty = (x - cx) / 12; // Adjusted sensitivity for smoother 3D feel
        card.style.transform = `perspective(1000px) rotateX(${tx}deg) rotateY(${ty}deg) scale3d(1.02, 1.02, 1.02)`;
        
        const glow = card.querySelector('.pglow');
        if (glow) glow.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(139,26,26,0.25), transparent)`;
      };

      const onLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        const glow = card.querySelector('.pglow');
        if (glow) glow.style.background = 'transparent';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
    return () => cleanups.forEach(fn => fn());
  }, []);

  // Skill Counter Functionality
  useEffect(() => {
    const counters = document.querySelectorAll('.scount');
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.target, 10);
          let current = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.round(current) + '%';
            if (current >= target) clearInterval(timer);
          }, 20);
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => cObs.observe(c));
    return () => cObs.disconnect();
  }, []);

  const handleFormSubmit = () => {
    const n = document.getElementById('cn')?.value.trim();
    const em = document.getElementById('ce')?.value.trim();
    const msg = document.getElementById('cm')?.value.trim();
    const btnText = document.querySelector('#sbtn .btn-text-main');

    if (!n || !em || !msg) {
      if (btnText) btnText.textContent = 'FILL ALL FIELDS ✗';
      setTimeout(() => { if (btnText) btnText.textContent = 'SEND MESSAGE →'; }, 2000);
      return;
    }
    if (btnText) btnText.textContent = 'SENDING...';
    setTimeout(() => {
      if (btnText) btnText.textContent = 'TRANSMITTED ✓';
      ['cn','ce','cm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value='';
      });
      setTimeout(() => { if (btnText) btnText.textContent = 'SEND MESSAGE →'; }, 3000);
    }, 1100);
  };

  return (
    <div style={{ background: '#07070d', color: '#ffffff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Dynamic Background Cyber Aura */}
      <div ref={glowRef} className="mouse-glow" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Space+Mono:monospace&display=swap');
        
        :root {
          --void: #07070d;
          --deep: #0d0d14;
          --panel: #131322;
          --border: rgba(255,255,255,0.06);
          --border-hi: rgba(139,26,26,0.5);
          --white: #ffffff;
          --red: #8b1a1a;
          --red-hi: #e63946;
          --silver: #a0a0b5;
          --muted: #62627a;
          --ff: 'Inter', sans-serif;
          --fd: 'Orbitron', sans-serif;
          --fm: 'Space Mono', monospace;
        }

        /* Mouse Glow Aura Styling */
        .mouse-glow {
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139,26,26,0.07) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 1;
          transition: transform 0.1s ease-out;
        }

        #port section { max-width: 1200px; margin: 0 auto; padding: 120px 4% 80px 4%; box-sizing: border-box; position: relative; z-index: 2; }
        .ey { font-family: var(--fm); font-size: 0.68rem; color: var(--red-hi); letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 18px; display: block; }
        .sh { font-family: var(--fd); font-size: clamp(2.2rem, 4.5vw, 3.5rem); font-weight: 900; color: var(--white); letter-spacing: -0.01em; margin: 0 0 50px 0; text-transform: uppercase; }
        .sh em { font-style: normal; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.6); }
        .sep { max-width: 1200px; margin: 0 auto; height: 1px; background: linear-gradient(90deg, var(--border), transparent); }
        
        /* ABOUT — 3D FLIP CARD */
        .ag { display: grid; grid-template-columns: 1fr 1.4fr; gap: 50px; align-items: start; }
        .acard-scene { perspective: 1200px; width: 100%; height: 430px; }
        .acard-flipper { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .acard-scene:hover .acard-flipper { transform: rotateY(180deg); }
        .acard-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 24px; border: 1px solid var(--border); background: var(--deep); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; padding: 35px 28px; box-shadow: 0 24px 48px rgba(0,0,0,0.6); overflow: hidden; }
        .acard-face::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--red-hi), transparent); }
        .acard-back { transform: rotateY(180deg); background: linear-gradient(135deg, #100808 0%, var(--deep) 100%); border-color: rgba(139,26,26,0.3); padding: 36px 32px; justify-content: flex-start; gap: 14px; }
        .aavatar { width: 110px; height: 110px; border-radius: 50%; background: var(--panel); border: 2px solid rgba(139,26,26,0.4); display: flex; align-items: center; justify-content: center; animation: avatarPulse 3s ease-in-out infinite; }
        @keyframes avatarPulse { 0%,100% { box-shadow: 0 0 20px rgba(139,26,26,0.2); } 50% { box-shadow: 0 0 40px rgba(230,57,70,0.35); } }
        .acard-name { font-family: var(--fd); font-size: 1.1rem; font-weight: 900; color: var(--white); letter-spacing: 0.06em; text-transform: uppercase; }
        .acard-role { font-family: var(--fm); font-size: 0.65rem; letter-spacing: 0.2em; color: var(--red-hi); text-transform: uppercase; }
        .astats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
        .astat { background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 4px; text-align: center; }
        .flip-hint { font-family: var(--fm); font-size: 0.6rem; letter-spacing: 0.18em; color: var(--muted); text-transform: uppercase; position: absolute; bottom: 16px; animation: hintBlink 2s ease-in-out infinite; }
        @keyframes hintBlink { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }
        .aback-label { font-family: var(--fm); font-size: 0.55rem; letter-spacing: 0.2em; color: var(--red-hi); text-transform: uppercase; margin: 0; }
        .aback-val { font-family: var(--ff); font-size: 0.9rem; color: var(--white); margin: 0 0 8px; border-bottom: 1px solid var(--border); padding-bottom: 8px; width: 100%; }
        
        /* PROJECTS — 3D TILT CARDS */
        .pgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .pc3d { background: var(--deep); border: 1px solid var(--border); border-radius: 24px; padding: 42px; display: flex; flex-direction: column; gap: 22px; position: relative; transform-style: preserve-3d; transition: transform 0.1s ease-out, box-shadow 0.3s; overflow: hidden; }
        .pc3d:hover { border-color: var(--border-hi); box-shadow: 0 24px 56px rgba(0,0,0,0.55); }
        .pglow { position: absolute; inset: 0; pointer-events: none; transition: background 0.1s ease; }
        .pct { display: flex; justify-content: space-between; align-items: center; transform: translateZ(20px); }
        .pnum { font-family: var(--fm); font-size: 0.75rem; color: var(--red-hi); font-weight: 700; }
        .ptitle { font-family: var(--fd); font-size: 1.3rem; font-weight: 700; color: var(--white); transform: translateZ(35px); }
        .pdesc { font-family: var(--ff); font-size: 0.92rem; color: var(--silver); line-height: 1.65; transform: translateZ(25px); }
        .ptags { display: flex; flex-wrap: wrap; gap: 8px; transform: translateZ(20px); }
        .tag { font-family: var(--fm); font-size: 0.62rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 5px 12px; border-radius: 8px; color: var(--silver); }
        .plinks { display: flex; gap: 14px; transform: translateZ(30px); }
        .plinks a, .plinks button { flex: 1; text-align: center; font-family: var(--fm); font-size: 0.68rem; padding: 12px; border-radius: 10px; cursor: pointer; text-decoration: none; border: none; }
        .plinks .bg { background: var(--red); color: var(--white); font-weight: 700; transition: background 0.2s; }
        .plinks .bg:hover { background: var(--red-hi); }
        .plinks .bp { background: transparent; border: 1px solid var(--border); color: var(--silver); }

        /* SKILLS — 3D PANEL FLOAT */
        .skl { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; }
        .skpanel { background: var(--deep); border: 1px solid var(--border); border-radius: 20px; padding: 36px; transform-style: preserve-3d; transition: transform 0.1s ease-out, box-shadow 0.3s; }
        .skl h3 { font-family: var(--fd); font-size: 1.1rem; color: var(--white); margin: 0 0 30px 0; letter-spacing: 0.08em; text-transform: uppercase; }
        .si { margin-bottom: 24px; }
        .sih { display: flex; justify-content: space-between; font-family: var(--ff); font-size: 0.88rem; color: var(--silver); margin-bottom: 8px; }
        .scount { font-family: var(--fd); font-size: 0.7rem; color: var(--red-hi); font-weight: 700; }
        .sbt { width: 100%; height: 3px; background: rgba(255,255,255,0.03); border-radius: 2px; overflow: hidden; }
        .sbf { height: 100%; width: 100%; background: linear-gradient(90deg, var(--red), var(--red-hi)); transform: scaleX(0); transform-origin: left; transition: transform 1.5s cubic-bezier(0.19, 1, 0.22, 1); }
        .tg { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 28px; border-top: 1px dashed var(--border); padding-top: 24px; }
        .tc { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 10px 16px; border-radius: 12px; font-family: var(--fm); font-size: 0.7rem; color: var(--white); }

        /* CONTACT FORM */
        .cl { display: grid; grid-template-columns: 1fr 1.1fr; gap: 50px; }
        .clink { background: var(--deep); border: 1px solid var(--border); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 18px; text-decoration: none; transition: transform 0.25s, border-color 0.25s; }
        .clink:hover { transform: translateX(6px); border-color: var(--red-hi); }
        .cf { background: var(--deep); border: 1px solid var(--border); border-radius: 24px; padding: 38px; display: flex; flex-direction: column; gap: 20px; }
        .fi, .fta { background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 10px; padding: 13px 16px; color: var(--white); width: 100%; box-sizing: border-box; outline: none; }
        .fi:focus, .fta:focus { border-color: var(--red-hi); }
        .premium-btn { background: var(--red); color: var(--white); border: none; padding: 16px; font-family: var(--fm); font-weight: 700; border-radius: 10px; cursor: pointer; transition: background 0.2s; }
        .premium-btn:hover { background: var(--red-hi); }

        /* REVEAL TRANSITIONS */
        .rv { opacity: 0; transform: translateY(30px) scale(0.98); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .rvs { opacity: 0; transform: translateY(40px); transition: opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .rv.vis, .rvs.vis { opacity: 1; transform: translateY(0) scale(1); }

        @media(max-width: 968px) {
          .ag, .pgrid, .skl, .cl { grid-template-columns: 1fr; gap: 36px; }
          .acard-scene { height: 390px; }
        }
      `}</style>

      <Navbar />
      <Hero portRef={portRef} />

      <div id="port" ref={portRef}>
        
        {/* ── ABOUT SECTION ── */}
        <section id="about">
          <p className="ey">01 // Profile</p>
          <h2 className="sh rv">About <em>Me</em></h2>
          <div className="ag">
            <div className="rv">
              <div className="acard-scene">
                <div className="acard-flipper">
                  {/* FRONT CARD */}
                  <div className="acard-face">
                    <div className="aavatar">
                      <span style={{ fontSize: '2.5rem' }}>👨‍💻</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="acard-name">Rajesh Kumar Gautam</div>
                      <div className="acard-role" style={{ marginTop: 6 }}>CSE · VIT · 3rd Year</div>
                    </div>
                    <div className="astats">
                      <div className="astat"><strong style={{color: '#fff'}}>3rd Year</strong><span style={{fontSize:'0.6rem', color:'var(--muted)'}}>Timeline</span></div>
                      <div className="astat"><strong style={{color: '#fff'}}>B.Tech</strong><span style={{fontSize:'0.6rem', color:'var(--muted)'}}>CSE Core</span></div>
                    </div>
                    <span className="flip-hint">Hover to flip ➔</span>
                  </div>
                  {/* BACK CARD */}
                  <div className="acard-face acard-back">
                    <p className="aback-label">University</p>
                    <p className="aback-val">VIT University (Core)</p>
                    <p className="aback-label">Specialization</p>
                    <p className="aback-val">Full-Stack &amp; AI/ML Inference</p>
                    <p className="aback-label">Status</p>
                    <p className="aback-val" style={{ color: '#4ade80', borderBottom: 'none' }}>🟢 Open to Internships</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="at rv" style={{ color: 'var(--silver)', lineHeight: '1.75' }}>
              <p>Hey, I'm <strong>Rajesh Kumar Gautam</strong> — a driven 3rd-year Computer Science Engineering student specializing in <strong>CSE Core at VIT University</strong>.</p>
              <p>I operate at the intersection of production-grade Web Architecture and practical Deep Learning. My core philosophy is to engineer clean, modular frontends tightly integrated with robust backends.</p>
            </div>
          </div>
        </section>

        <div className="sep"></div>

        {/* ── PROJECTS SECTION ── */}
        <section id="projects">
          <p className="ey">02 // Deployments</p>
          <h2 className="sh rv">My <em>Projects</em></h2>
          <div className="pgrid rvs">
            
            <div className="pc3d">
              <div className="pglow" aria-hidden="true" />
              <div className="pct"><span className="pnum">01</span><span>👁️‍🗨️</span></div>
              <h3 className="ptitle">Smart Surveillance System</h3>
              <p className="pdesc">Real-time AI-powered surveillance using TensorFlow &amp; OpenCV. Reduced inference latency by 40% on edge devices running smoothly at 30+ FPS.</p>
              <div className="ptags">
                <span className="tag">TensorFlow</span><span className="tag">OpenCV</span><span className="tag">Python</span>
              </div>
              <div className="plinks">
                <a href="https://github.com/rajesh-gautam-tech" target="_blank" rel="noreferrer" className="bg">Source</a>
              </div>
            </div>

            <div className="pc3d">
              <div className="pglow" aria-hidden="true" />
              <div className="pct"><span className="pnum">02</span><span>🌐</span></div>
              <h3 className="ptitle">Cyber-Mesh — Full-Stack Portal</h3>
              <p className="pdesc">Multi-tiered web platform with async API gateways, custom database indexing, and real-time WebSocket push mechanics.</p>
              <div className="ptags">
                <span className="tag">React.js</span><span className="tag">Node.js</span><span className="tag">MongoDB</span>
              </div>
              <div className="plinks">
                <a href="https://github.com/rajesh-gautam-tech" target="_blank" rel="noreferrer" className="bg">Source</a>
              </div>
            </div>

          </div>
        </section>

        <div className="sep"></div>

        {/* ── SKILLS SECTION ── */}
        <section id="skills">
          <p className="ey">03 // Capabilities</p>
          <h2 className="sh rv">Skills &amp; <em>Expertise</em></h2>
          <div className="skl">
            <div className="rv">
              <div className="skpanel">
                <div className="pglow" aria-hidden="true" />
                <h3 style={{marginTop:0}}>Technical Vectors</h3>
                <div className="si">
                  <div className="sih"><span>Full-Stack (React / Node.js)</span><span className="scount" data-target="85">0%</span></div>
                  <div className="sbt"><div className="sbf" data-w="0.85"></div></div>
                </div>
                <div className="si">
                  <div className="sih"><span>AI / ML Inference (TensorFlow)</span><span className="scount" data-target="80">0%</span></div>
                  <div className="sbt"><div className="sbf" data-w="0.80"></div></div>
                </div>
                <div className="tg">
                  <div className="tc">⚛️ React.js</div><div className="tc">🟢 Node.js</div><div className="tc">🤖 TensorFlow</div>
                </div>
              </div>
            </div>

            <div className="rv">
              <div className="skpanel">
                <div className="pglow" aria-hidden="true" />
                <h3 style={{marginTop:0}}>Academic Roadmap</h3>
                <div style={{borderLeft:'1px solid var(--border)', paddingLeft:20}}>
                  <div style={{color:'var(--red-hi)', fontFamily:'var(--fm)', fontSize:'0.8rem'}}>2023 — Present</div>
                  <h4 style={{margin:'5px 0', color:'#fff'}}>B.Tech — CSE Core</h4>
                  <p style={{color:'var(--silver)', fontSize:'0.9rem', margin:0}}>VIT University. Advanced Data Structures, DBMS, and Intelligent System Architectures.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sep"></div>

        {/* ── CONTACT SECTION ── */}
        <section id="contact">
          <p className="ey">04 // Communications</p>
          <h2 className="sh rv">Get In <em>Touch</em></h2>
          <div className="cl">
            <div className="rv">
              <h3 style={{fontWeight:400, color:'var(--silver)'}}>Open to <strong>Internships and Engineering positions.</strong></h3>
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                <a href="mailto:rg14262004@gmail.com" className="clink">
                  <div style={{color:'var(--red-hi)'}}>✉</div>
                  <div><div style={{fontSize:'0.65rem', color:'var(--muted)'}}>EMAIL</div><div style={{color:'#fff', fontSize:'0.9rem'}}>rg14262004@gmail.com</div></div>
                </a>
              </div>
            </div>

            <div className="cf rv">
              <input className="fi" type="text" id="cn" placeholder="Your name"/>
              <input className="fi" type="email" id="ce" placeholder="your@email.com"/>
              <textarea className="fta" id="cm" placeholder="Message payload..."></textarea>
              <button className="premium-btn" id="sbtn" type="button" onClick={handleFormSubmit}>
                <span className="btn-text-main">SEND MESSAGE →</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}