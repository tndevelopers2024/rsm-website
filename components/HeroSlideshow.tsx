"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { img, type ImgKey } from "@/lib/images";

export type Slide = { image: ImgKey; label: string; position?: string };

/** Full-bleed cross-fading background with a slow push-in, plus labelled progress indicators. */
export function HeroSlideshow({ slides, interval = 7000, className, indicatorClassName }: { slides: Slide[]; interval?: number; className?: string; indicatorClassName?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setTimeout(() => setI((x) => (x + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [i, paused, interval, slides.length]);
  const s = slides[i];
  return (
    <>
      <div className={clsx("absolute inset-0 overflow-hidden", className)}>
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: interval / 1000 + 2, ease: "linear" } }}
          >
            <Image src={img[s.image]} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" style={{ objectPosition: s.position ?? "70% center" }} />
          </motion.div>
        </AnimatePresence>
      </div>
      {slides.length > 1 && (
        <div className={clsx("flex gap-2", indicatorClassName)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {slides.map((x, k) => (
            <button key={x.label} onClick={() => setI(k)} className="group w-20 text-left md:w-28" aria-label={`Show ${x.label}`}>
              <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/25">
                {k === i && (
                  <motion.span
                    key={`${i}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused ? 0 : interval / 1000, ease: "linear" }}
                  />
                )}
                {k < i && <span className="absolute inset-0 bg-white/60" />}
              </span>
              <span className={clsx("mt-2 hidden truncate font-cond text-[11px] uppercase tracking-[0.16em] transition md:block", k === i ? "text-white" : "text-white/45 group-hover:text-white/75")}>{x.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
