import { useRef } from "react";
import { brand } from "../data/portfolioData";
import useHeroGrid from "../hooks/useHeroGrid";
import useNameRoll from "../hooks/useNameRoll";
import SideDecoration from "./SideDecoration";
import "./Hero.css";

export default function Hero({ portRef }) {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const leftDecoRef = useRef(null);
  const rightDecoRef = useRef(null);
  const nameRef = useNameRoll(brand.fullName);

  useHeroGrid({
    heroRef,
    gridRef,
    portRef,
    leftDecoRef,
    rightDecoRef,
  });

  const chars = brand.fullName.split("");
  const midIndex = (chars.length - 1) / 2;
  const STAGGER = 0.035;

  return (
    <div id="hero-wrapper">
      <div id="hero" ref={heroRef}>
        <div id="grid-canvas" ref={gridRef} aria-hidden="true" />

        <SideDecoration side="left" ref={leftDecoRef} />
        <SideDecoration side="right" ref={rightDecoRef} />

        <div id="hero-ov">
          <div id="hero-brand">
            <svg id="logo-svg" viewBox="0 0 120 120" fill="none" role="img" aria-label="RKG Logo">
              <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#12181d" />
                  <stop offset="100%" stopColor="#8A95A0" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="54" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="4 8" />
              <path d="M 8 92 Q 40 18 92 48 Q 112 60 96 96" stroke="rgba(138, 149, 160, 0.2)" strokeWidth="1.5" fill="none" />
              <line x1="28" y1="20" x2="28" y2="100" stroke="url(#lg1)" strokeWidth="11" strokeLinecap="round" />
              <line x1="28" y1="20" x2="62" y2="20" stroke="url(#lg1)" strokeWidth="11" strokeLinecap="round" />
              <path d="M62 20 Q88 20 88 42 Q88 62 62 62 L28 62" stroke="url(#lg1)" strokeWidth="10" strokeLinecap="round" fill="none" />
              <path d="M52 62 L88 100" stroke="url(#lg1)" strokeWidth="11" strokeLinecap="round" />
            </svg>
            <div className="hdiv" />
            <h1 id="hero-name" ref={nameRef}>
              <div className="roll-container">
                <div className="roll-primary">
                  {chars.map((ch, i) => (
                    <span
                      key={`p-${i}`}
                      className="roll-char"
                      style={{ "--delay": `${STAGGER * Math.abs(i - midIndex)}s` }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </div>
                <div className="roll-absolute">
                  {chars.map((ch, i) => (
                    <span
                      key={`a-${i}`}
                      className="roll-char"
                      style={{ "--delay": `${STAGGER * Math.abs(i - midIndex)}s` }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </div>
              </div>
            </h1>
            <p id="hero-sub">{brand.tagline}</p>
          </div>
        </div>

        <div id="scroll-hint">
          <span>Scroll to explore</span>
          <div className="sarrow" />
        </div>
      </div>
    </div>
  );
}
