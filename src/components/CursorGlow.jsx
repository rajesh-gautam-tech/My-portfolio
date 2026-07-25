import { useEffect, useRef } from "react";
import "./CursorGlow.css";

/**
 * A soft light + custom dot/ring cursor that trails the mouse across the page.
 * Purely decorative — disabled on touch devices.
 */
export default function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (glowRef.current) glowRef.current.style.opacity = "1";
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onDown = () => ringRef.current?.classList.add("cursor-ring-active");
    const onUp = () => ringRef.current?.classList.remove("cursor-ring-active");

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.16;
      pos.current.y += (target.current.y - pos.current.y) * 0.16;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
}