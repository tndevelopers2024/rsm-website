"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { speakers, speakerCountries, flagOf } from "@/lib/paflar";

const tones = ["from-[#087f83] to-[#142d46]", "from-[#398fa8] to-[#0b2034]", "from-[#c7a65a] to-[#5a4a24]", "from-[#1b4a6b] to-[#0b2034]", "from-[#b5123a] to-[#4a0a1b]"];
const initials = (n: string) => n.replace(/^(Prof|Dr)\s+/, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export function SpeakerGrid({ light = false, limit }: { light?: boolean; limit?: number }) {
  const [country, setCountry] = useState<string | null>(null);
  const list = speakers.filter((s) => !country || s.country === country);
  const shown = limit ? list.slice(0, limit) : list;
  const count = (c: string) => speakers.filter((s) => s.country === c).length;

  return (
    <div>
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:px-0">
        <button onClick={() => setCountry(null)} className={clsx("shrink-0 rounded-full px-4 py-2 text-[14px] font-medium ring-1 transition", !country ? "bg-gold text-navy-deep ring-gold" : light ? "text-white/80 ring-white/25 hover:bg-white/10" : "text-navy ring-line hover:bg-mist")}>
          All · {speakers.length}
        </button>
        {speakerCountries.map((c) => (
          <button key={c} onClick={() => setCountry(c === country ? null : c)} className={clsx("shrink-0 rounded-full px-3.5 py-2 text-[14px] ring-1 transition", c === country ? "bg-gold text-navy-deep ring-gold" : light ? "text-white/80 ring-white/25 hover:bg-white/10" : "text-navy ring-line hover:bg-mist")}>
            <span className="mr-1.5" aria-hidden>{flagOf(c)}</span>{c} <span className="opacity-60">{count(c)}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((s, i) => (
            <motion.article
              layout
              key={s.name}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className={clsx("group flex gap-4 rounded-[20px] p-5 transition", light ? "bg-white/[.06] ring-1 ring-white/10 hover:bg-white/[.1]" : "bg-white ring-1 ring-line hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-36px_rgba(20,45,70,.6)]")}
            >
              <span className={clsx("grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-display text-[17px] font-semibold text-white", tones[i % tones.length])}>{initials(s.name)}</span>
              <div className="min-w-0">
                <h3 className={clsx("text-[16.5px] font-semibold leading-snug", light ? "text-white" : "text-navy")}>{s.name}</h3>
                <div className={clsx("mt-0.5 flex items-center gap-1.5 text-[13px]", light ? "text-white/65" : "text-muted")}><span className="text-[15px] leading-none" aria-hidden>{flagOf(s.country)}</span>{s.country}</div>
                {s.talks.map((t) => (
                  <p key={t.title} className={clsx("mt-2 line-clamp-2 text-[13.5px] leading-snug", light ? "text-white/80" : "text-ink/75")}>
                    <span className={clsx("font-cond text-[11.5px] uppercase tracking-[0.12em]", light ? "text-gold" : "text-teal")}>{t.day.split(" ")[0].slice(0, 3)} {t.t} · </span>{t.title}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
