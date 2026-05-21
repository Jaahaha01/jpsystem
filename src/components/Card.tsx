import type { ReactNode } from "react";
import Link from "next/link";

export function Card({
  title,
  desc,
  icon,
  className,
  href,
}: {
  title: string;
  desc: string;
  icon?: ReactNode;
  className?: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      {icon ? (
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-110 group-hover:border-sky-200">
          {icon}
        </div>
      ) : null}
      <div className="min-w-0">
        <div className="text-sm font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
          {title}
        </div>
        <div className="mt-2 text-sm leading-6 text-slate-500">{desc}</div>
      </div>
    </div>
  );

  const cardClasses =
    "group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] card-glow gradient-border " +
    (className ?? "");

  if (href) {
    return (
      <Link href={href} className="block" data-cursor="interactive">
        <div className={cardClasses}>
          {/* Subtle gradient accent on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-50/0 to-indigo-50/0 transition-all duration-500 group-hover:from-sky-50/50 group-hover:to-indigo-50/30" />
          <div className="relative">{content}</div>
          {/* Arrow indicator */}
          <div className="absolute right-5 top-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
            <span className="text-sky-500/60 text-sm">→</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className={cardClasses} data-cursor="interactive">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-50/0 to-indigo-50/0 transition-all duration-500 group-hover:from-sky-50/50 group-hover:to-indigo-50/30" />
      <div className="relative">{content}</div>
    </div>
  );
}
