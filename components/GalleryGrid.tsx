"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import clsx from "clsx";
import { photos } from "@/lib/content";
import { Lightbox } from "./Lightbox";

const cats = ["All", "Congress", "Speakers", "Delegates", "International", "Archive"] as const;

export function GalleryGrid() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = photos.filter((p) => cat === "All" || p.cat === cat);
  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={clsx("shrink-0 rounded-full px-5 py-2.5 font-cond text-[14px] uppercase tracking-[0.08em] ring-1 transition", cat === c ? "bg-white text-navy ring-white" : "text-white/80 ring-white/25 hover:ring-white")}>
            {c}
          </button>
        ))}
      </div>
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {list.map((p, k) => (
          <motion.button
            key={p.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 100px 0px" }}
            transition={{ duration: 0.6, delay: (k % 3) * 0.06 }}
            onClick={() => setOpen(photos.indexOf(p))}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl text-left"
          >
            <Image src={p.src} alt={p.caption} width={p.w} height={p.h} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-auto w-full transition duration-[1200ms] group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition group-hover:opacity-100"><Expand className="h-4 w-4" /></span>
            <span className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition group-hover:opacity-100">
              <span className="block font-cond text-[11.5px] uppercase tracking-[0.2em] text-gold">{p.cat}</span>
              <span className="mt-1 block font-display text-[15px] font-semibold text-white">{p.caption}</span>
            </span>
          </motion.button>
        ))}
      </div>
      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
