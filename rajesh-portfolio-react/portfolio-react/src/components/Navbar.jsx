import { useEffect, useState } from "react";
import { brand, navLinks } from "../data/portfolioData";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="mnav" className={scrolled ? "sc" : ""}>
      <a
        href="#"
        className="nlogo"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <svg viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#12181d" />
              <stop offset="100%" stopColor="#8A95A0" />
            </linearGradient>
          </defs>
          <path
            d="M10 6L10 42 M10 6L28 6Q38 6 38 17Q38 24 30 26L38 42 M10 24L28 24Q35 24 35 17Q35 10 28 10L10 10"
            stroke="url(#ng)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        {brand.initials}
      </a>

      <ul className={`nlinks${open ? " open" : ""}`} id="nlinks">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="premium-btn nav-fluid-link" onClick={() => setOpen(false)}>
              <span className="btn-text-main">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="premium-btn ncta">
        <span className="btn-text-main">HIRE ME</span>
        <svg
          className="wave-bg"
          viewBox="0 0 2400 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sssurf-grad-nav" y2="100%" x2="50%" y1="0%" x1="50%">
              <stop offset="0%" stopOpacity="1" stopColor="#8A95A0" />
              <stop offset="100%" stopOpacity="1" stopColor="#6b7784" />
            </linearGradient>
          </defs>
          <g transform="matrix(1,0,0,1,0,-91.08)" fill="url(#sssurf-grad-nav)">
            <path
              opacity="0.05"
              transform="matrix(1,0,0,1,0,35)"
              d="M 0 305.98 Q 227.6 450 600 302.17 Q 1010.77 450 1200 343.3 Q 1379.44 450 1800 320.38 Q 2153.57 450 2400 314.38 L 2400 800 L 0 800 Z"
            />
            <path
              opacity="1"
              transform="matrix(1,0,0,1,0,245)"
              d="M 0 305.98 Q 227.6 450 600 302.17 Q 1010.77 450 1200 343.3 Q 1379.44 450 1800 320.38 Q 2153.57 450 2400 314.38 L 2400 800 L 0 800 Z"
            />
          </g>
        </svg>
      </a>

      <button
        className="ntog"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span style={open ? { transform: "translateY(6.5px) rotate(45deg)" } : undefined} />
        <span style={open ? { opacity: 0 } : undefined} />
        <span style={open ? { transform: "translateY(-6.5px) rotate(-45deg)" } : undefined} />
      </button>
    </nav>
  );
}