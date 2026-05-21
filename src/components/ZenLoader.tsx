"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ZenLoaderProps {
  onComplete?: () => void;
  duration?: number;
  logoText?: string;
  logoSub?: string;
}

export default function ZenLoader({
  onComplete,
  duration = 4000,
  logoText = "JAPAN SYSTEM",
  logoSub = "THAILAND",
}: ZenLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"enter" | "loading" | "exit">("enter");

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const MAX_PARTICLES = 60;

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      alpha: 0,
      size: Math.random() * 1.5 + 0.3,
      life: 0,
      maxLife: Math.random() * 400 + 200,
    });

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = spawn();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const t = p.life / p.maxLife;
        p.alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha * 0.25})`;
        ctx.fill();

        if (p.life >= p.maxLife) Object.assign(p, spawn());
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    setPhase("loading");
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const raw = elapsed / duration;
      const eased = raw < 1 ? 1 - Math.pow(1 - raw, 3) : 1;
      const pct = Math.min(Math.round(eased * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => onComplete?.(), 1100);
        }, 300);
      }
    };
    requestAnimationFrame(tick);
  }, [duration, onComplete]);

  useEffect(() => {
    const cleanup = initCanvas();
    return () => {
      cleanup?.();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initCanvas]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (phase !== "exit") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const messages = [
    "INITIALIZING",
    "ESTABLISHING CONNECTION",
    "PREPARING DX ENVIRONMENT",
    "ALMOST READY",
  ];
  const msgIndex = Math.floor((progress / 100) * (messages.length - 1));
  const currentMessage = messages[Math.min(msgIndex, messages.length - 1)];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden transition-all duration-[1100ms] ease-in-out ${phase === "exit"
          ? "opacity-0 blur-xl scale-[1.04] pointer-events-none invisible"
          : "opacity-100"
        }`}
      aria-hidden="true"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute inset-[-20%] pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(14,165,233,0.03)_0%,transparent_70%)] animate-zen-breathe-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(14,165,233,0.05)_0%,transparent_70%)] animate-zen-pulse-glow" />

      {/* Horizontal scan line */}
      <div className="absolute left-0 right-0 h-[1px] pointer-events-none bg-gradient-to-r from-transparent via-sky-400/10 via-sky-500/20 via-sky-400/10 to-transparent animate-zen-scan-move" />

      {/* Corner ornaments */}
      <svg className="absolute top-6 left-6 opacity-40 text-slate-300" width="40" height="40" viewBox="0 0 40 40">
        <path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="absolute top-6 right-6 opacity-40 text-slate-300 scale-x-[-1]" width="40" height="40" viewBox="0 0 40 40">
        <path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="absolute bottom-6 left-6 opacity-40 text-slate-300 scale-y-[-1]" width="40" height="40" viewBox="0 0 40 40">
        <path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="absolute bottom-6 right-6 opacity-40 text-slate-300 scale-[-1]" width="40" height="40" viewBox="0 0 40 40">
        <path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      {/* ── CENTERPIECE ── */}
      <div className="relative flex items-center justify-center w-[240px] h-[240px] animate-zen-float-y">

        {/* Outer rotating dashed ring */}
        <svg className="absolute inset-0 w-full h-full animate-zen-rotate-slow-reverse" viewBox="0 0 240 240">
          <circle
            cx="120" cy="120" r="108"
            fill="none"
            stroke="rgba(15, 23, 42, 0.05)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
        </svg>

        {/* Middle rotating ring */}
        <svg className="absolute inset-0 w-full h-full animate-zen-rotate-slow" viewBox="0 0 200 200">
          <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="rgba(14, 165, 233, 0.12)"
            strokeWidth="0.8"
            strokeDasharray="60 120"
            strokeLinecap="round"
          />
        </svg>

        {/* Inner static ring */}
        <svg className="absolute inset-0 w-full h-full animate-zen-rotate-slow-reverse" viewBox="0 0 140 140">
          <circle
            cx="70" cy="70" r="62"
            fill="none"
            stroke="rgba(15, 23, 42, 0.05)"
            strokeWidth="0.5"
          />
          {[0, 90, 180, 270].map((deg) => (
            <line
              key={deg}
              x1="70" y1="8" x2="70" y2="16"
              stroke="rgba(15, 23, 42, 0.2)"
              strokeWidth="0.8"
              transform={`rotate(${deg} 70 70)`}
            />
          ))}
        </svg>

        {/* Logo block */}
        <div className="relative flex flex-col items-center gap-0 animate-zen-logo-reveal [animation-delay:500ms]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(14,165,233,0.06)_0%,transparent_70%)] animate-zen-logo-glow-pulse" />
          <div className="font-sans text-base md:text-lg font-bold text-slate-800 tracking-[0.2em] leading-none uppercase text-center max-w-[160px] break-words">
            {logoText}
          </div>
          <div className="w-8 h-[0.5px] bg-gradient-to-r from-transparent via-slate-300 to-transparent my-3.5" />
          <div className="font-sans text-[9px] font-semibold text-slate-400 tracking-[0.35em] uppercase">
            {logoSub}
          </div>
        </div>
      </div>

      {/* ── BOTTOM UI ── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3.5 w-[280px] animate-zen-fade-up [animation-delay:700ms]">

        {/* Status message */}
        <p
          className="font-sans text-[9px] tracking-[0.35em] text-slate-400 uppercase m-0 animate-zen-msg-fade"
          key={currentMessage}
        >
          {currentMessage}
        </p>

        {/* Progress bar */}
        <div className="relative w-full h-[1px] bg-slate-100">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-linear shadow-[0_0_6px_rgba(99,102,241,0.8),0_0_12px_rgba(99,102,241,0.4)]"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="flex items-baseline gap-0.5">
          <span className="font-sans text-[11px] font-light tracking-[0.2em] text-slate-400 tabular-nums">
            {String(progress).padStart(3, "0")}
          </span>
          <span className="font-sans text-[8px] text-slate-300 tracking-wider">%</span>
        </div>

      </div>

      {/* Top label */}
      <div className="absolute top-9 left-1/2 -translate-x-1/2 flex items-center gap-2.5 font-sans text-[9px] tracking-[0.35em] text-slate-400/60 uppercase animate-zen-fade-up [animation-delay:300ms]">
        <span>JAPAN SYSTEM</span>
        <span className="opacity-40">·</span>
        <span>THAILAND</span>
      </div>

    </div>
  );
}