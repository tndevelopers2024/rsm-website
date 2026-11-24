"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";
import { Pending } from "./Pending";

export function Accordion({ items }: { items: { q: string; a: string; verify?: boolean }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl bg-white">
      {items.map((it, i) => (
        <div key={it.q}>
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left md:px-10" aria-expanded={open === i}>
            <span className="font-display text-lg font-semibold text-navy md:text-xl">{it.q}</span>
            <span className={clsx("grid h-9 w-9 shrink-0 place-items-center rounded-full bg-aqua text-teal transition-transform duration-500", open === i && "rotate-45 bg-teal text-white")}>
              <Plus className="h-4 w-4" />
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }} className="overflow-hidden">
                <div className="max-w-3xl px-7 pb-7 text-[16px] text-muted md:px-10">
                  {it.a}
                  {it.verify && <div className="mt-4"><Pending>Verify with official Mauritius government sources before publication</Pending></div>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
