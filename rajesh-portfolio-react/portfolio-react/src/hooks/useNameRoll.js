import { useEffect, useRef } from "react";

/**
 * Splits the hero name into two stacked, gradient-clipped copies of every
 * character and periodically toggles an "active" class that rolls the
 * primary copy up and out while the secondary copy rolls in — same
 * effect as initAutomaticNameRoll() in the original check.html.
 */
export default function useNameRoll(name) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const STAGGER = 0.035;
    const midIndex = (name.length - 1) / 2;

    const interval = setInterval(() => {
      el.classList.add("active");
      setTimeout(() => el.classList.remove("active"), 1500);
    }, 3500);

    return () => clearInterval(interval);
  }, [name]);

  return ref;
}
