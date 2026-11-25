"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Expand } from "lucide-react";
import clsx from "clsx";
import { photos } from "@/lib/content";
import { Lightbox } from "./Lightbox";

/**
 * Scattered-prints collage: tiles placed on a 12-column grid with deliberate overlaps,
 * slight rotations and per-tile scroll parallax. Indices refer to `photos`.
 */
type Tile = { i: number; area: string; rot: number; speed: number; framed?: boolean; z?: number; pos?: string };
const tiles: Tile[] = [
  { i: 0, area: "col-span-2 row-span-2 lg:col-[1/8] lg:row-[1/7]", rot: -1, speed: 0.3, z: 1 },
  { i: 2, area: "lg:col-[8/13] lg:row-[1/5]", rot: 1.5, speed: -0.4, framed: true, z: 2 },
  { i: 1, area: "lg:col-[6/9] lg:row-[4/11]", rot: 3, speed: 0.9, framed: true, z: 4, pos: "50% 30%" },
  { i: 3, area: "lg:col-[9/13] lg:row-[5/9]", rot: -2, speed: 0.2, z: 2 },
  { i: 4, area: "lg:col-[1/4] lg:row-[7/11]", rot: -3, speed: 0.6, framed: true, z: 3 },
  { i: 5, area: "lg:col-[4/7] lg:row-[7/10]", rot: 1.5, speed: -0.2, z: 2 },
  { i: 7, area: "col-span-2 lg:col-[1/6] lg:row-[11/14]", rot: 0.8, speed: 0.4, z: 2 },
  { i: 6, area: "lg:col-[6/9] lg:row-[11/15]", rot: -1.5, speed: -0.5, framed: true, z: 3 },
  { i: 9, area: "lg:col-[9/13] lg:row-[9/13]", rot: 2.5, speed: 0.7, framed: true, z: 3 },
  { i: 10, area: "lg:col-[9/12] lg:row-[13/16]", rot: -2, speed: 0.1, z: 2 },
];

function TileView({ t, progress, onOpen, amp }: { t: Tile; progress: MotionValue<number>; onOpen: (i: number) => void; amp: number }) {
  const y = useTransform(progress, [0, 1], [amp * t.speed, -amp * t.speed]);
  const p = photos[t.i];
  return (
    <motion.button
      onClick={() => onOpen(t.i)}
      style={{ y, rotate: amp < 70 ? t.rot * 0.5 : t.rot, zIndex: t.z }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px 120px 0px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
      className={clsx(
        "group relative block h-full min-h-[180px] w-full overflow-hidden text-left shadow-[0_30px_60px_-25px_rgba(0,0,0,.65)]",
        t.framed ? "rounded-[6px] bg-white p-2 pb-9 lg:p-2.5 lg:pb-11" : "rounded-[18px]",
        t.area,
      )}
      aria-label={`Open photo: ${p.caption}`}
    >
      <span className={clsx("relative block h-full w-full overflow-hidden", t.framed ? "rounded-[3px]" : "")}>
        <Image src={p.src} alt={p.caption} fill sizes="(min-width:1024px) 40vw, 50vw" className="object-cover transition duration-[1200ms] group-hover:scale-[1.06]" style={{ objectPosition: t.pos ?? "center" }} />
        {!t.framed && <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />}
        <span className="absolute right-3 top-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition group-hover:scale-100 group-hover:opacity-100"><Expand className="h-4 w-4" /></span>
      </span>
      {t.framed ? (
        <span className="absolute inset-x-3 bottom-2 truncate font-serif text-[13px] italic text-navy/80 lg:bottom-3 lg:text-[14px]">{p.caption}</span>
      ) : (
        <span className="absolute inset-x-4 bottom-3 translate-y-2 truncate text-[13.5px] font-medium text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">{p.caption}</span>
      )}
    </motion.button>
  );
}

export function PhotoCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [open, setOpen] = useState<number | null>(null);
  const [amp, setAmp] = useState(70);
  useEffect(() => {
    const f = () => setAmp(window.innerWidth < 1024 ? 14 : 70);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return (
    <>
      <div ref={ref} className="relative grid grid-cols-2 gap-3 [grid-auto-rows:150px] sm:[grid-auto-rows:200px] lg:grid-cols-12 lg:gap-4 lg:[grid-auto-rows:58px]">
        {tiles.map((t) => (
          <TileView key={t.i} t={t} progress={scrollYProgress} onOpen={setOpen} amp={amp} />
        ))}
      </div>
      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
