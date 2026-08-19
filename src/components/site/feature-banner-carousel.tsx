"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FeatureBannerItem } from "@/types/cms";

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function FeatureBannerCarousel({ items }: { items: FeatureBannerItem[] }) {
  const banners = useMemo(() => items.filter((item) => item.imageUrl && item.title), [items]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (!banners.length) return null;

  const active = banners[current] ?? banners[0];

  function goTo(index: number) {
    if (!banners.length) return;
    const nextIndex = (index + banners.length) % banners.length;
    setCurrent(nextIndex);
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#04162E] shadow-[0_28px_90px_rgba(2,12,27,0.2)]">
      <div
        className="relative min-h-[360px] bg-cover bg-center sm:min-h-[500px] lg:min-h-[600px]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2,9,24,0.12) 0%, rgba(2,9,24,0.08) 62%, rgba(2,9,24,0.34) 100%), url('${active.imageUrl}')`,
        }}
      >
        <div className="grid min-h-[360px] gap-8 px-6 py-8 sm:min-h-[500px] sm:px-10 sm:py-10 lg:min-h-[600px] lg:grid-cols-[1fr_auto] lg:items-end">
          <div />

          {banners.length > 1 ? (
            <div className="hidden items-center justify-end gap-3 lg:flex">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/16"
                aria-label={"Banner tr\u01b0\u1edbc"}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/16"
                aria-label="Banner sau"
              >
                <ChevronRightIcon />
              </button>
            </div>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/12 bg-[linear-gradient(180deg,rgba(3,15,34,0.18),rgba(3,15,34,0.94))] px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex flex-col gap-4 text-white lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {banners.length > 1 ? (
                <div className="flex shrink-0 items-center gap-2">
                  {banners.map((item, index) => (
                    <button
                      key={`${item.title}-${index}`}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`h-2.5 rounded-full transition ${
                        index === current ? "w-10 bg-cyan-300" : "w-2.5 bg-white/30 hover:bg-white/45"
                      }`}
                      aria-label={`Xem banner ${index + 1}`}
                    />
                  ))}
                </div>
              ) : null}

              <p className="truncate text-sm font-bold sm:text-base lg:text-lg">
                {active.title}
                {active.eventDate ? ` ${active.eventDate}` : ""}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {banners.length > 1 ? (
                <div className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/90">
                  {current + 1} / {banners.length}
                </div>
              ) : null}

              {active.href ? (
                <Link
                  href={active.href}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
                >
                  {active.buttonLabel || "Xem ch\u01b0\u01a1ng tr\u00ecnh"}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
