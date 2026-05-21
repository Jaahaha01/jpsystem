"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

/**
 * Lightweight YouTube embed — loads a static thumbnail first,
 * then swaps in the real iframe only when the user clicks play.
 * Saves ~800KB+ of JS from loading on initial page load.
 */
export function LazyYouTube({
  videoId,
  title = "YouTube video",
}: {
  videoId: string;
  title?: string;
}) {
  const [active, setActive] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only show thumbnail when element is near viewport
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl sm:rounded-3xl border border-slate-100 bg-slate-900"
      onClick={() => setActive(true)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setActive(true);
      }}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <>
          {/* YouTube thumbnail — lightweight image instead of full iframe */}
          {inView && (
            <Image
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              fill
              sizes="(max-width: 1024px) 90vw, 55vw"
              className="object-cover"
              unoptimized
            />
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30">
            <div className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-red-600 shadow-xl transition-transform hover:scale-110">
              <svg
                className="ml-1 h-6 w-6 sm:h-7 sm:w-7 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
