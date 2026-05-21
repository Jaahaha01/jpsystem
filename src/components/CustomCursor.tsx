"use client";

import { useEffect, useMemo, useState } from "react";

type Point = { x: number; y: number };

export function CustomCursor() {
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const style = useMemo(() => {
    const size = hover ? 38 : 22;
    return {
      transform: `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`,
      width: size,
      height: size,
      opacity: active ? 1 : 0,
    } as const;
  }, [pos, active, hover]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setActive(true);
    };
    const onLeave = () => setActive(false);

    const onOver = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      setHover(Boolean(el.closest("[data-cursor='interactive']")));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div
        style={style}
        className="fixed left-0 top-0 rounded-full border border-slate-200 bg-white/30 backdrop-blur transition-[width,height,opacity] duration-150"
      />
    </div>
  );
}

