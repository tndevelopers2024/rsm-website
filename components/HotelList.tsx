"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import clsx from "clsx";
import { congress, hotels, hotelCats, type Hotel } from "@/lib/content";

const filters: ("all" | Hotel["cat"])[] = ["all", "lux", "mid", "bou", "apt"];

export function HotelList() {
  const [f, setF] = useState<(typeof filters)[number]>("all");
  const list = hotels.filter((h) => h.cat !== "host" && (f === "all" || h.cat === f));
  return (
    <div>
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2">
        {filters.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={clsx(
              "shrink-0 rounded-full px-5 py-2.5 font-cond text-[14px] uppercase tracking-[0.08em] ring-1 transition",
              f === x ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-line hover:ring-navy",
            )}
          >
            {x === "all" ? "All options" : hotelCats[x]}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((h, i) => (
            <motion.a
              layout
              key={h.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              href={congress.links.accommodation}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-6 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(20,45,70,.5)] hover:ring-teal"
            >
              <div>
                <div className="flex items-center gap-2 font-cond text-[12px] uppercase tracking-[0.16em] text-teal">
                  {h.cat === "lux" && <Star className="h-3 w-3 fill-gold text-gold" />}
                  {hotelCats[h.cat]}
                </div>
                <div className="mt-1.5 font-display text-[17.5px] font-semibold leading-snug text-navy">{h.name}</div>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-aqua text-teal transition group-hover:bg-teal group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
