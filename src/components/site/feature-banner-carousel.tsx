"use client";

import { useMemo, useState } from "react";
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
        className="relative min-h-[420px] bg-cover bg-center sm:min-h-[520px]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(2,9,24,0.78) 0%, rgba(2,9,24,0.48) 50%, rgba(2,9,24,0.72) 100%), url('${active.imageUrl}')`,
        }}
      >
        <div className="grid min-h-[420px] gap-8 px-6 py-8 sm:min-h-[520px] sm:px-10 sm:py-10 lg:grid-cols-[0.92fr_0.08fr] lg:items-end">
          <div className="max-w-3xl self-end rounded-[1.8rem] border border-white/12 bg-slate-950/46 p-6 text-white backdrop-blur">
            {active.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                {active.eyebrow}
              </p>
            ) : null}
            <h3 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">
              {active.title}
            </h3>
            {active.subtitle ? (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50/88 sm:text-base">
                {active.subtitle}
              </p>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {active.eventDate ? (
                <span className="rounded-full border border-cyan-300/28 bg-cyan-300/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                  {active.eventDate}
                </span>
              ) : null}
              {active.href ? (
                <Link
                  href={active.href}
                  className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
                >
                  {active.buttonLabel || "Xem chi tiết"}
                </Link>
              ) : null}
            </div>
          </div>

          {banners.length > 1 ? (
            <div className="hidden items-center justify-end gap-3 lg:flex">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/16"
                aria-label="Banner trước"
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
      </div>

      {banners.length > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#04101F] px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
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
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/90">
            {current + 1} / {banners.length}
          </div>
        </div>
      ) : null}
    </section>
  );
}
