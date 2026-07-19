import "./MeditatingFigure.css";

export default function MeditatingFigure() {
  return (
    <svg id="fig" viewBox="0 0 72 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="36" cy="11" rx="7" ry="5" fill="#2e1a0e" />
      <path d="M27,18 Q28,8 36,8 Q44,8 45,18" fill="#2e1a0e" />
      <circle cx="36" cy="22" r="12" fill="#e07855" />
      <ellipse cx="31" cy="22" rx="2" ry="2.5" fill="#c96040" opacity=".5" />
      <ellipse cx="41" cy="22" rx="2" ry="2.5" fill="#c96040" opacity=".5" />
      <path d="M30,21 Q31,19.5 33,21" stroke="#8a3820" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M39,21 Q41,19.5 43,21" stroke="#8a3820" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M33,26 Q36,28.5 39,26" stroke="#c96040" strokeWidth="1" fill="none" strokeLinecap="round" />
      <rect x="32" y="33" width="8" height="5" rx="2" fill="#d97048" />
      <path d="M20,38 Q16,62 18,80 Q28,86 44,86 Q50,62 52,38 Q44,32 36,32 Q28,32 20,38Z" fill="#c85e40" />
      <path d="M36,32 L36,86" stroke="#b04e34" strokeWidth="1" opacity=".4" />
      <path d="M26,38 Q24,50 24,62" stroke="#b04e34" strokeWidth="0.8" opacity=".3" fill="none" />
      <path d="M46,38 Q48,50 48,62" stroke="#b04e34" strokeWidth="0.8" opacity=".3" fill="none" />
      <path d="M20,40 Q10,48 11,58 Q15,62 20,58 Q22,52 22,44" fill="#e07855" />
      <path d="M52,40 Q62,48 61,58 Q57,62 52,58 Q50,52 50,44" fill="#e07855" />
      <ellipse cx="30" cy="56" rx="7.5" ry="5" fill="#e07855" />
      <ellipse cx="42" cy="56" rx="7.5" ry="5" fill="#d97048" />
      <path d="M18,80 Q10,84 8,88 Q24,90 36,90 Q48,90 64,88 Q62,84 54,80" fill="#c85e40" />
      <path
        d="M18,80 Q22,84 28,82 Q32,80 36,82 Q40,80 44,82 Q50,84 54,80"
        stroke="#b04e34"
        strokeWidth="1.2"
        fill="none"
        opacity=".5"
      />
    </svg>
  );
}
