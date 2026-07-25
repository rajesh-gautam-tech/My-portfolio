import { forwardRef } from "react";

const FlowerCluster = ({ transform }) => (
  <g transform={transform} filter="url(#softGlow)">
    <circle cx="-12" cy="0" r="10" fill="#ffffff" opacity="0.95" />
    <circle cx="12" cy="0" r="10" fill="#ffffff" opacity="0.95" />
    <circle cx="0" cy="-12" r="10" fill="#ffffff" opacity="0.95" />
    <circle cx="0" cy="12" r="10" fill="#ffffff" opacity="0.95" />
    <circle cx="-8" cy="-8" r="9" fill="#f8fafc" opacity="0.9" />
    <circle cx="8" cy="-8" r="9" fill="#f8fafc" opacity="0.9" />
    <circle cx="-8" cy="8" r="9" fill="#f8fafc" opacity="0.9" />
    <circle cx="8" cy="8" r="9" fill="#f8fafc" opacity="0.9" />
    <circle cx="0" cy="0" r="6" fill="#cbd5e1" />
  </g>
);

const SideDecoration = forwardRef(function SideDecoration({ side }, ref) {
  const mirrored = side === "right";
  return (
    <div className={`side-decoration ${mirrored ? "right-side" : "left-side"}`} ref={ref}>
      <svg
        className={`vine-svg${mirrored ? " mirror-x" : ""}`}
        viewBox="0 0 120 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`shiningGrey-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M50 40 C65 140, 25 260, 55 400 C80 520, 30 640, 60 800"
          stroke={`url(#shiningGrey-${side})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M53 320 C30 440, 75 580, 48 730"
          stroke={`url(#shiningGrey-${side})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />

        <path d="M52 110 C25 95, 20 135, 52 140 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />
        <path d="M46 240 C15 230, 10 270, 45 275 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />
        <path d="M56 370 C28 380, 32 420, 58 405 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />
        <path d="M42 540 C12 550, 16 590, 44 570 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />
        <path d="M51 690 C20 710, 28 750, 53 725 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />

        <path d="M54 170 C80 155, 85 195, 54 200 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />
        <path d="M57 310 C88 300, 92 340, 58 345 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />
        <path d="M50 480 C82 495, 78 535, 48 515 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />
        <path d="M57 630 C88 640, 84 680, 56 665 Z" fill={`url(#shiningGrey-${side})`} opacity="0.85" />

        <FlowerCluster transform="translate(50, 40)" />
      </svg>
    </div>
  );
});

export default SideDecoration;
