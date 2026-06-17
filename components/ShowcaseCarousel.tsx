"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  description?: string;
  image: string;
  badge?: string;
};

export function ShowcaseCarousel({
  slides,
  label = "Featured carousel"
}: {
  slides: Slide[];
  label?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const active = slides[index];

  function go(next: number) {
    if (count === 0) return;
    setIndex((next + count) % count);
  }

  useEffect(() => {
    if (count === 0) return;

    setIndex((current) => {
      if (current >= count) return count - 1;
      return current;
    });
  }, [count]);

  useEffect(() => {
    if (count < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [count]);

  const preview = useMemo(() => slides.slice(0, 6), [slides]);

  if (!active) return null;

  return (
    <div className="surface overflow-hidden rounded-[2.3rem] p-3 md:p-4" aria-label={label}>
      <div className="grid gap-4 lg:grid-cols-[1fr_.38fr]">
        <div className="image-frame rounded-[1.8rem]">
          <div className="relative aspect-[4/3] md:aspect-[16/9]">
            <Image
              src={active.image}
              alt={active.title}
              fill
              sizes="(min-width: 1024px) 58vw, 92vw"
              className="object-cover"
              priority={index === 0}
            />

            <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/40 bg-white/76 p-4 shadow-soft backdrop-blur-xl dark:bg-black/35">
              {active.badge ? (
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--sage-strong)]">
                  {active.badge}
                </p>
              ) : null}

              <h3 className="mt-1 font-display text-2xl font-black tracking-[-0.04em] text-[color:var(--text)] md:text-3xl">
                {active.title}
              </h3>

              {active.description ? (
                <p className="mt-2 text-sm font-semibold leading-6 text-[color:var(--muted)]">
                  {active.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 p-1 md:p-2">
          <div className="grid grid-cols-3 gap-2 lg:grid-cols-2">
            {preview.map((slide, slideIndex) => (
              <button
                type="button"
                key={`${slide.image}-${slideIndex}`}
                onClick={() => setIndex(slideIndex)}
                className={`focus-ring relative aspect-square overflow-hidden rounded-2xl border transition ${
                  index === slideIndex
                    ? "border-[color:var(--sage)] ring-4 ring-[color:var(--ring)]"
                    : "border-[color:var(--border)] opacity-76 hover:opacity-100"
                }`}
                aria-label={`View ${slide.title}`}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-black text-[color:var(--muted)]">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => go(index + 1)}
                className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)]"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}