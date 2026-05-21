"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";

type Props = ComponentPropsWithoutRef<"a"> & {
  as?: "a" | "button";
  href?: string;
};

export function MagneticButton({ className, children, as = "a", ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 25, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 300, damping: 25, mass: 0.6 });
  const x = useTransform(sx, (v) => v);
  const y = useTransform(sy, (v) => v);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px * 10);
    my.set(py * 10);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const Comp: any = as === "button" ? motion.button : motion.a;

  return (
    <Comp
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ref={ref as any}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={
        "group inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-medium text-slate-900 backdrop-blur transition-colors hover:border-slate-300 hover:bg-white/90 " +
        (className ?? "")
      }
      {...(rest as any)}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-sky-500/70 transition-all duration-300 group-hover:w-full" />
      </span>
    </Comp>
  );
}

