import { aboutStats, aboutParagraphs, aboutQuote } from "../data/portfolioData";
import "./About.css";

export default function About() {
  return (
    <section id="about">
      <p className="ey">01 // Profile</p>
      <h2 className="sh rv">
        About <em>Me</em>
      </h2>
      <div className="ag">
        <div className="rv">
          <div className="acard">
            <div className="aavatar">
              <svg viewBox="0 0 120 120" fill="none">
                <defs>
                  <linearGradient id="avG" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#12181d" />
                    <stop offset="100%" stopColor="#8A95A0" />
                  </linearGradient>
                </defs>
                <line x1="28" y1="20" x2="28" y2="100" stroke="url(#avG)" strokeWidth="10" strokeLinecap="round" />
                <line x1="28" y1="20" x2="62" y2="20" stroke="url(#avG)" strokeWidth="10" strokeLinecap="round" />
                <path d="M62 20 Q86 20 86 42 Q86 62 62 62 L28 62" stroke="url(#avG)" strokeWidth="9" strokeLinecap="round" fill="none" />
                <path d="M52 62 L86 100" stroke="url(#avG)" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </div>
            <div className="astats">
              {aboutStats.map((stat) => (
                <div className="astat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="at rv">
          {aboutParagraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p.html }} />
          ))}
          <div className="aq">
            <p>&quot;{aboutQuote}&quot;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
