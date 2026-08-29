"use client";

import { ReactNode, useEffect, useRef } from "react";

/** Lightweight reveal without adding a motion-library bundle. */
export function ScrollReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const candidates = Array.from(root.querySelectorAll<HTMLElement>("section"));
    const targets = candidates.filter((element, index, all) => !all.some((parent) => parent !== element && parent.contains(element)) && element.getBoundingClientRect().top > window.innerHeight * 0.72);
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-scroll-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach((element, index) => {
      element.dataset.scrollReveal = "";
      element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 55}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
