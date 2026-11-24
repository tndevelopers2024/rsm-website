"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { milestones } from "@/lib/content";
import { Pending } from "./Pending";

export function Timeline({ dark }: { dark?: boolean }) {
  const [active, setActive] = useState(0);
  const m = milestones[active];
  return (
    <div>
      {/* desktop rail */}
      <div className="relative hidden lg:block">
        <div className={clsx("absolute left-0 right-0 top-[30px] h-px", dark ? "bg-white/15" : "bg-line")} />
        <motion.div
          className="absolute left-0 top-[30px] h-[2px] bg-gradient-to-r from-teal via-ocean to-gold"
          animate={{ width: `${(active / (milestones.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <div className="relative grid grid-cols-7 gap-4">
          {milestones.map((x, i) => (
            <button key={x.title} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className="group pt-[62px] text-left">
              <span
                className={clsx(
                  "absolute top-[19px] h-6 w-6 rounded-full border-2 transition-all duration-500",
                  i <= active ? "border-teal bg-teal shadow-[0_0_0_8px_rgba(8,127,131,.18)]" : dark ? "border-white/30 bg-navy-deep" : "border-line bg-white",
                  x.future && "!border-gold !bg-gold shadow-[0_0_0_8px_rgba(199,166,90,.25)]",
                )}
              />
              <span className={clsx("block font-cond text-[12px] uppercase tracking-[0.2em]", x.future ? "text-gold" : "text-teal", dark && !x.future && "text-sky")}>{x.label}</span>
              <span className={clsx("mt-1 block font-serif text-[30px] font-light leading-none transition-colors", dark ? "text-white" : "text-navy", i === active && "!text-teal", dark && i === active && "!text-sky")}>{x.year}</span>
              <span className={clsx("mt-3 block text-[14px] leading-snug", dark ? "text-white/60" : "text-muted")}>{x.title}</span>
            </button>
          ))}
        </div>
        <div className={clsx("mt-14 grid min-h-[190px] grid-cols-[260px_1fr] items-center gap-12 rounded-3xl p-12", dark ? "bg-white/[.06] ring-1 ring-white/10" : "bg-white shadow-[0_40px_80px_-50px_rgba(20,45,70,.45)]")}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="contents">
              <div>
                <div className={clsx("font-serif text-[72px] font-light leading-none", m.future ? "text-gold" : dark ? "text-sky" : "text-teal")}>{m.year}</div>
                <div className={clsx("mt-2 font-cond text-[13px] uppercase tracking-[0.18em]", dark ? "text-white/55" : "text-muted")}>{m.date}</div>
              </div>
              <div>
                <h3 className={clsx("text-2xl font-semibold", dark ? "text-white" : "text-navy")}>{m.title}</h3>
                <p className={clsx("mt-3 max-w-2xl text-[17px]", dark ? "text-white/70" : "text-muted")}>{m.text}</p>
                {m.pending && <div className="mt-4"><Pending>{m.pending}</Pending></div>}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* mobile list */}
      <ol className="space-y-0 lg:hidden">
        {milestones.map((x) => (
          <li key={x.title} className={clsx("relative border-l-2 pb-10 pl-8", dark ? "border-white/15" : "border-line")}>
            <span className={clsx("absolute -left-[9px] top-1 h-4 w-4 rounded-full", x.future ? "bg-gold" : "bg-teal")} />
            <div className={clsx("font-cond text-[12px] uppercase tracking-[0.2em]", x.future ? "text-gold" : "text-teal")}>{x.date}</div>
            <h3 className={clsx("mt-2 text-xl font-semibold", dark ? "text-white" : "text-navy")}>{x.title}</h3>
            <p className={clsx("mt-2 text-[15.5px]", dark ? "text-white/70" : "text-muted")}>{x.text}</p>
            {x.pending && <div className="mt-3"><Pending>{x.pending}</Pending></div>}
          </li>
        ))}
      </ol>
    </div>
  );
}
