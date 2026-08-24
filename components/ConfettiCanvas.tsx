'use client';

import { useEffect, useRef } from 'react';

type ConfettiCanvasProps = { trigger: number; duration?: number; zIndex?: number; origin?: { x: number; y: number }; sideBursts?: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; size: number; rotation: number; rotationSpeed: number; color: string; shape: number; wobble: number; wobbleSpeed: number };
const colors = ['#c62828', '#20ad4b', '#eab308', '#ffffff'];

export default function ConfettiCanvas({ trigger, duration = 4000, zIndex = 60, origin, sideBursts = true }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTrigger = useRef(0);
  const originX = origin?.x;
  const originY = origin?.y;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !trigger || lastTrigger.current === trigger) return;
    lastTrigger.current = trigger;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const smallScreen = window.innerWidth < 640;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0; let height = 0; let frame = 0;
    const particles: Particle[] = [];
    const resize = () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width * ratio; canvas.height = height * ratio; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const addBurst = (x: number, y: number, amount: number, spread: number) => { for (let index = 0; index < amount; index += 1) { const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread; const speed = 5 + Math.random() * 8; particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, size: 4 + Math.random() * 5, rotation: Math.random() * Math.PI, rotationSpeed: (Math.random() - 0.5) * 0.24, color: colors[index % colors.length], shape: Math.random(), wobble: Math.random() * 10, wobbleSpeed: 0.04 + Math.random() * 0.08 }); } };
    resize();
    if (originX !== undefined && originY !== undefined) addBurst(originX, originY, smallScreen ? 24 : 44, Math.PI * 1.5);
    addBurst(width * 0.5, height * 0.54, smallScreen ? 28 : 56, Math.PI * 1.6);
    if (sideBursts) { addBurst(width * 0.12, height * 0.9, smallScreen ? 14 : 24, Math.PI * 0.9); addBurst(width * 0.88, height * 0.9, smallScreen ? 14 : 24, Math.PI * 0.9); }
    const started = performance.now();
    const draw = (now: number) => { context.clearRect(0, 0, width, height); const progress = now - started; particles.forEach((particle) => { particle.x += particle.vx; particle.vy += 0.14; particle.y += particle.vy; particle.vx *= 0.995; particle.rotation += particle.rotationSpeed; particle.wobble += particle.wobbleSpeed; context.save(); context.globalAlpha = Math.max(0, 1 - Math.max(0, progress - duration * 0.68) / (duration * 0.32)); context.translate(particle.x + Math.sin(particle.wobble) * 2, particle.y); context.rotate(particle.rotation); context.fillStyle = particle.color; if (particle.shape > 0.55) context.fillRect(-particle.size / 2, -particle.size / 3, particle.size, particle.size * 0.66); else { context.beginPath(); context.arc(0, 0, particle.size / 2, 0, Math.PI * 2); context.fill(); } context.restore(); }); if (progress < duration) frame = window.requestAnimationFrame(draw); else context.clearRect(0, 0, width, height); };
    window.addEventListener('resize', resize, { passive: true }); frame = window.requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); window.cancelAnimationFrame(frame); context.clearRect(0, 0, width, height); };
  }, [trigger, duration, originX, originY, sideBursts]);
  return <canvas ref={canvasRef} aria-hidden="true" className="confetti-canvas" style={{ zIndex }} />;
}
