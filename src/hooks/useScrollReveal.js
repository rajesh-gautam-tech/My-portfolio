import { useEffect } from "react";

/**
 * Observes every element with class "rv" or "rvs" inside the document
 * and adds the "vis" class the first time it scrolls into view.
 * Also triggers the skill progress-bar fill animation (elements with
 * class "sbf" and a data-w attribute) once their parent becomes visible.
 *
 * Mirrors the original IntersectionObserver logic in check.html.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("vis");
          entry.target.querySelectorAll(".sbf").forEach((bar, i) => {
            const w = parseFloat(bar.dataset.w || "1");
            setTimeout(() => {
              bar.style.transform = `scaleX(${w})`;
            }, 200 + i * 110);
          });
          ro.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    );

    document.querySelectorAll(".rv, .rvs").forEach((el) => ro.observe(el));

    return () => ro.disconnect();
  }, []);
}
