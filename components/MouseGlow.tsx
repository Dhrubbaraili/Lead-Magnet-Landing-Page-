'use client';

import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(hover: hover) and (min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || reduced.matches) return;
    const glow = glowRef.current;
    if (!glow) return;
    let frame = 0;
    let targetX = -160;
    let targetY = -160;
    let currentX = targetX;
    let currentY = targetY;
    const move = (event: MouseEvent) => { targetX = event.clientX; targetY = event.clientY; };
    const render = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };
    window.addEventListener('mousemove', move, { passive: true });
    frame = window.requestAnimationFrame(render);
    return () => { window.removeEventListener('mousemove', move); window.cancelAnimationFrame(frame); };
  }, []);
  return <div ref={glowRef} aria-hidden="true" className="mouse-glow" />;
}
