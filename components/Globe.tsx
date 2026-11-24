"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import clsx from "clsx";

const MRU: [number, number] = [-20.3, 57.55];
// International engagement: PAFLAR (Nairobi), congress cities and conference regions
const LINKS: [number, number][] = [
  [-1.29, 36.82], // Nairobi
  [6.52, 3.38], // Lagos
  [-26.2, 28.05], // Johannesburg
  [48.86, 2.35], // Paris (SFR)
  [51.5, -0.12], // Europe (EULAR)
  [28.61, 77.21], // India (IRACON)
  [38.9, -77.03], // USA (ACR)
  [30.04, 31.24], // Cairo
];

export function Globe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let phi = 4.6;
    let width = canvas.offsetWidth;
    const onResize = () => (width = canvas.offsetWidth);
    window.addEventListener("resize", onResize);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.22,
      dark: 1,
      diffuse: 2.2,
      mapSamples: 22000,
      mapBrightness: 9,
      baseColor: [0.22, 0.52, 0.66],
      markerColor: [0.78, 0.65, 0.35],
      glowColor: [0.35, 0.7, 0.82],
      markers: [{ location: MRU, size: 0.09 }, ...LINKS.map((l) => ({ location: l, size: 0.035 }))],
      arcs: LINKS.map((l) => ({ from: MRU, to: l })),
      arcColor: [0.56, 0.83, 0.91],
      arcWidth: 0.6,
      arcHeight: 0.28,
    });
    // cobe v2 has no internal loop: drive rendering ourselves (also redraws once the map texture loads)
    let raf = 0;
    const tick = () => {
      if (!reduce) phi += 0.0028;
      globe.update({ phi, width: width * 2, height: width * 2 });
      raf = requestAnimationFrame(tick);
    };
    tick();
    requestAnimationFrame(() => (canvas.style.opacity = "1"));
    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className={clsx("aspect-square w-full opacity-0 transition-opacity duration-[1600ms]", className)}
      style={{ contain: "layout paint size" }}
      aria-label="Globe showing Mauritius connected to international partners"
    />
  );
}
