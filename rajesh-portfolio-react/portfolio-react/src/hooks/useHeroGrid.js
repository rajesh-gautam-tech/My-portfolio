import { useEffect } from "react";

/**
 * Recreates the interactive hero grid from check.html:
 *  - builds a grid of flip-cards sized to the viewport
 *  - flips the cell under the cursor
 *  - applies a subtle parallax tilt to the whole grid
 *  - on scroll, "shatters" the grid outward while fading the
 *    portfolio content (#port) in, and syncs the side vine decorations
 *
 * refs: { heroRef, gridRef, portRef, leftDecoRef, rightDecoRef }
 */
export default function useHeroGrid({
  heroRef,
  gridRef,
  portRef,
  leftDecoRef,
  rightDecoRef,
}) {
  useEffect(() => {
    const hero = heroRef.current;
    const gc = gridRef.current;
    const port = portRef.current;
    const leftDeco = leftDecoRef.current;
    const rightDeco = rightDecoRef.current;
    if (!hero || !gc || !port) return;

    let cells = [];
    let cellData = [];
    let cols = 0;
    let rows = 0;

    const cs = () => (window.innerWidth < 600 ? 140 : 260);

    function buildGrid() {
      const W = hero.offsetWidth;
      const H = hero.offsetHeight;
      const C = cs();
      cols = Math.ceil(W / C) + 1;
      rows = Math.ceil(H / C) + 1;
      gc.innerHTML = "";
      gc.style.gridTemplateColumns = `repeat(${cols}, ${C}px)`;
      gc.style.gridTemplateRows = `repeat(${rows}, ${C}px)`;
      cells = [];
      cellData = [];
      for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        cell.className = "gc";
        const inner = document.createElement("div");
        inner.className = "gc-inner";
        const front = document.createElement("div");
        front.className = "gc-front";
        const back = document.createElement("div");
        back.className = "gc-back";
        inner.appendChild(front);
        inner.appendChild(back);
        cell.appendChild(inner);
        gc.appendChild(cell);
        cells.push(cell);
        const ang = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 180;
        cellData.push({
          tx: Math.cos(ang) * dist,
          ty: Math.sin(ang) * dist,
          tz: -60 - Math.random() * 100,
          rx: (Math.random() - 0.5) * 320,
          ry: (Math.random() - 0.5) * 320,
          delay: Math.random() * 0.28,
        });
      }
    }
    buildGrid();

    const flippedCells = new Set();

    function onFlipMove(e) {
      if (scrollProg > 0.04) return;
      const rect = gc.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      let exactTargetIndex = -1;
      for (let i = 0; i < cells.length; i++) {
        const cCol = i % cols;
        const C = cs();
        const xStart = 4 + cCol * (C + 6);
        const xEnd = xStart + C;
        const yStart = 4 + Math.floor(i / cols) * (C + 6);
        const yEnd = yStart + C;
        if (mouseX >= xStart && mouseX <= xEnd && mouseY >= yStart && mouseY <= yEnd) {
          exactTargetIndex = i;
          break;
        }
      }
      flippedCells.forEach((idx) => {
        if (cells[idx] && idx !== exactTargetIndex) {
          cells[idx].classList.remove("flipped");
          flippedCells.delete(idx);
        }
      });
      if (exactTargetIndex !== -1 && cells[exactTargetIndex]) {
        if (!flippedCells.has(exactTargetIndex)) {
          cells[exactTargetIndex].classList.add("flipped");
          flippedCells.add(exactTargetIndex);
        }
      }
    }

    let mx = 0.5,
      my = 0.5,
      tmx = 0.5,
      tmy = 0.5;

    function onTiltMove(e) {
      tmx = e.clientX / window.innerWidth;
      tmy = e.clientY / window.innerHeight;
    }

    function onLeave() {
      flippedCells.forEach((idx) => {
        if (cells[idx]) cells[idx].classList.remove("flipped");
      });
      flippedCells.clear();
    }

    hero.addEventListener("mousemove", onFlipMove, { passive: true });
    hero.addEventListener("mousemove", onTiltMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);

    let scrollProg = 0;
    let lastSP = -1;

    const getSP = () =>
      Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    function applyShatter(sp) {
      const shStart = 0.0,
        shEnd = 0.85;
      const norm = Math.max(0, (sp - shStart) / (shEnd - shStart));
      const e = easeInOut(Math.min(1, norm));

      cells.forEach((cell, i) => {
        const d = cellData[i];
        const le = Math.max(
          0,
          Math.min(1, (e - d.delay * 0.5) / (1 - d.delay * 0.5))
        );
        const tx = d.tx * le,
          ty = d.ty * le,
          tz = d.tz * le;
        const rx = d.rx * le,
          ry = d.ry * le;
        const op = Math.max(0, 1 - le * 1.8);
        cell.style.transform = `perspective(700px) translate(${tx}px,${ty}px) translateZ(${tz}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        cell.style.opacity = op;
      });

      if (leftDeco && rightDeco) {
        const vOp = Math.max(0, 1 - e * 2.2);
        const vTransY = e * -90;
        const vTransXLeft = e * -45;
        const vTransXRight = e * 45;

        leftDeco.style.opacity = vOp;
        leftDeco.style.transform = `translateY(${vTransY}px) translateX(${vTransXLeft}px) rotate(${-e * 15}deg)`;

        rightDeco.style.opacity = vOp;
        rightDeco.style.transform = `translateY(${vTransY}px) translateX(${vTransXRight}px) rotate(${e * 15}deg)`;
      }

      if (norm < 0.05) {
        port.style.pointerEvents = "none";
        gc.style.pointerEvents = "auto";
      } else {
        port.style.pointerEvents = "auto";
        gc.style.pointerEvents = "none";
      }

      const smoothFade = Math.max(0, Math.min(1, (sp - 0.25) / 0.6));
      port.style.opacity = smoothFade;
      port.style.transform = `translateY(${(1 - smoothFade) * 60}px)`;

      const sh = document.getElementById("scroll-hint");
      if (sh) sh.style.opacity = Math.max(0, 1 - e * 5);
      const ov = document.getElementById("hero-ov");
      if (ov) ov.style.opacity = Math.max(0, 1 - e * 2.5);
    }

    function applyTilt(sp) {
      if (sp > 0.04) return;
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      const tmax = 10 * (1 - sp * 20);
      const gx = (my - 0.5) * -tmax;
      const gy = (mx - 0.5) * tmax;
      cells.forEach((cell, i) => {
        if (parseFloat(cell.style.opacity || "1") < 0.1) return;
        const col = i % cols,
          row = Math.floor(i / cols);
        const cx = (col + 0.5) / cols,
          cy = (row + 0.5) / rows;
        const rx = gx * 0.4 + (cy - 0.5) * gx * 0.25;
        const ry = gy * 0.4 + (cx - 0.5) * gy * 0.25;
        cell.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    }

    let rafId;
    function tick() {
      scrollProg = getSP();
      if (scrollProg !== lastSP) {
        applyShatter(scrollProg);
        lastSP = scrollProg;
      }
      if (scrollProg < 0.04) applyTilt(scrollProg);
      rafId = requestAnimationFrame(tick);
    }
    tick();

    function onResize() {
      buildGrid();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", onFlipMove);
      hero.removeEventListener("mousemove", onTiltMove);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [heroRef, gridRef, portRef, leftDecoRef, rightDecoRef]);
}
