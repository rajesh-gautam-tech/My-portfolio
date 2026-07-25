import { useEffect } from "react";

/**
 * Adds a cursor-tracking spotlight + subtle 3D tilt to any element
 * matching the given selectors. Sets --mx/--my (0-100%) CSS vars for
 * the spotlight gradient and a small rotateX/rotateY for the tilt.
 * No-ops on touch devices (no meaningful mouse position there).
 */
export default function useTiltCards(selectors = ".pc, .tc", options = {}) {
  const { tilt = 6 } = options;

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const els = Array.from(document.querySelectorAll(selectors));
    if (!els.length) return;

    const handleMove = (e, el) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);

      const rx = (0.5 - py) * tilt;
      const ry = (px - 0.5) * tilt;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    };

    const handleLeave = (el) => {
      el.style.transform = "";
      el.style.setProperty("--mx", `50%`);
      el.style.setProperty("--my", `50%`);
    };

    const cleanups = els.map((el) => {
      const onMove = (e) => handleMove(e, el);
      const onLeave = () => handleLeave(el);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [selectors, tilt]);
}