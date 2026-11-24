"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import clsx from "clsx";
import { gallery } from "@/lib/content";
import { img } from "@/lib/images";
import { PlaceholderArt } from "./PlaceholderArt";

const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

const cats = ["All", "Congresses", "Awareness", "CPD", "Media"];

export function GalleryGrid() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = gallery.map((g, i) => ({ ...g, i })).filter((g) => cat === "All" || g.cat === cat);
  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={clsx("shrink-0 rounded-full px-5 py-2.5 font-cond text-[14px] uppercase tracking-[0.08em] ring-1 transition", cat === c ? "bg-white text-navy ring-white" : "text-white/80 ring-white/25 hover:ring-white")}>
            {c}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map((g, k) => (
            <motion.button
              layout
              key={g.caption}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(g.i)}
              className={clsx("group relative overflow-hidden rounded-2xl text-left", k % 5 === 0 && "md:col-span-2 md:row-span-2")}
            >
              {PREVIEW ? <PlaceholderArt name={g.image} label={false} /> : <Image src={img[g.image]} alt={g.caption} fill sizes="(min-width:768px) 50vw, 50vw" className="object-cover transition duration-[1400ms] group-hover:scale-110" />}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-cond text-[11.5px] uppercase tracking-[0.2em] text-gold">{g.cat}</div>
                <div className="mt-1 font-display text-[16px] font-semibold text-white">{g.caption}</div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {open !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-ink/95 p-6" onClick={() => setOpen(null)}>
            <button className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white" aria-label="Close"><X /></button>
            <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} className="relative aspect-[3/2] w-full max-w-5xl overflow-hidden rounded-2xl">
              {PREVIEW ? <PlaceholderArt name={gallery[open].image} /> : <Image src={img[gallery[open].image]} alt={gallery[open].caption} fill sizes="90vw" className="object-cover" />}
            </motion.div>
            <p className="absolute bottom-8 font-display text-white">{gallery[open].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
