"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/content";

export function Lightbox({ photos, index, onClose, onIndex }: { photos: Photo[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, photos.length, onClose, onIndex]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const p = index === null ? null : photos[index];
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {p && index !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur" onClick={onClose}>
          <div className="flex items-center justify-between px-6 py-5 text-white/80">
            <span className="font-cond text-[13px] uppercase tracking-[0.2em]">{index + 1} / {photos.length}</span>
            <button className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close" onClick={onClose}><X className="h-5 w-5" /></button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
            <button className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6" aria-label="Previous" onClick={() => onIndex((index - 1 + photos.length) % photos.length)}><ChevronLeft /></button>
            <AnimatePresence mode="wait">
              <motion.img key={p.src} src={p.src} alt={p.caption} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="max-h-full max-w-full rounded-xl object-contain shadow-2xl" />
            </AnimatePresence>
            <button className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6" aria-label="Next" onClick={() => onIndex((index + 1) % photos.length)}><ChevronRight /></button>
          </div>
          <p className="px-6 py-6 text-center font-display text-[15px] text-white/85">{p.caption}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
