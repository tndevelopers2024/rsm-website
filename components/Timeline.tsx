"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { milestones } from "@/lib/content";
import Image from "next/image";
import { Pending } from "./Pending";

const HL = milestones.findIndex((m) => m.highlight);
const HL_PHOTOS = ["/images/aflar2019/a03.jpg", "/images/aflar2019/a01.jpg", "/images/aflar2019/a11.jpg"];

export function Timeline({ dark }: { dark?: boolean }) {
  const [active, setActive] = useState(HL >= 0 ? HL : 0);
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
        <div className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}>
          {milestones.map((x, i) => (
            <button key={x.title} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className="group pt-[62px] text-left">
              <span
                className={clsx(
                  "absolute top-[19px] h-6 w-6 rounded-full border-2 transition-all duration-500",
                  i <= active ? "border-teal bg-teal shadow-[0_0_0_8px_rgba(8,127,131,.18)]" : dark ? "border-white/30 bg-navy-deep" : "border-line bg-white",
                  x.future && "!border-gold !bg-gold shadow-[0_0_0_8px_rgba(199,166,90,.25)]",
                  x.highlight && "!top-[12px] !h-9 !w-9 !border-[3px] !border-crimson !bg-crimson shadow-[0_0_0_10px_rgba(200,16,46,.16)]",
                )}
              />
              <span className={clsx("block font-cond text-[12px] uppercase tracking-[0.2em]", x.future ? "text-gold" : x.highlight ? "text-crimson" : "text-teal", dark && !x.future && !x.highlight && "text-sky")}>{x.label}</span>
              <span className={clsx("mt-1 block font-serif font-light leading-none transition-colors", x.highlight ? "text-[42px]" : "text-[30px]", dark ? "text-white" : "text-navy", i === active && "!text-teal", dark && i === active && "!text-sky")}>{x.year}</span>
              <span className={clsx("mt-3 block text-[14px] leading-snug", dark ? "text-white/60" : "text-muted")}>{x.title}</span>
            </button>
          ))}
        </div>
        <div className={clsx("mt-14 grid min-h-[190px] grid-cols-[260px_1fr] items-center gap-12 rounded-3xl p-12 transition-shadow", dark ? "bg-white/[.06] ring-1 ring-white/10" : "bg-white shadow-[0_40px_80px_-50px_rgba(20,45,70,.45)]", m.highlight && !dark && "ring-2 ring-crimson/25")}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="contents">
              <div>
                <div className={clsx("font-serif text-[72px] font-light leading-none", m.future ? "text-gold" : m.highlight ? "text-crimson" : dark ? "text-sky" : "text-teal")}>{m.year}</div>
                <div className={clsx("mt-2 font-cond text-[13px] uppercase tracking-[0.18em]", dark ? "text-white/55" : "text-muted")}>{m.date}</div>
              </div>
              <div>
                <h3 className={clsx("text-2xl font-semibold", dark ? "text-white" : "text-navy")}>{m.title}</h3>
                <p className={clsx("mt-3 max-w-2xl text-[17px]", dark ? "text-white/70" : "text-muted")}>{m.text}</p>
                {m.text2 && <p className={clsx("mt-3 max-w-2xl text-[17px]", dark ? "text-white/70" : "text-muted")}>{m.text2}</p>}
                {m.highlight && (
                  <div className="mt-6 grid max-w-2xl grid-cols-3 gap-3">
                    {HL_PHOTOS.map((src) => (
                      <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={src} alt="9th AFLAR Conference, Mauritius 2019" fill sizes="220px" className="object-cover" /></div>
                    ))}
                  </div>
                )}
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
            <span className={clsx("absolute rounded-full", x.highlight ? "-left-[13px] top-0 h-6 w-6 bg-crimson ring-4 ring-crimson/15" : "-left-[9px] top-1 h-4 w-4", x.future ? "bg-gold" : !x.highlight && "bg-teal")} />
            <div className={x.highlight ? clsx("rounded-2xl p-5 ring-1", dark ? "bg-white/[.06] ring-white/10" : "bg-white ring-crimson/20 shadow-[0_24px_50px_-36px_rgba(20,45,70,.45)]") : ""}>
              <div className={clsx("font-cond text-[12px] uppercase tracking-[0.2em]", x.future ? "text-gold" : x.highlight ? "text-crimson" : "text-teal")}>{x.date}{x.highlight && " · Defining moment"}</div>
              <h3 className={clsx("mt-2 font-semibold", x.highlight ? "text-2xl" : "text-xl", dark ? "text-white" : "text-navy")}>{x.title}</h3>
              <p className={clsx("mt-2 text-[15.5px]", dark ? "text-white/70" : "text-muted")}>{x.text}</p>
              {x.text2 && <p className={clsx("mt-2 text-[15.5px]", dark ? "text-white/70" : "text-muted")}>{x.text2}</p>}
              {x.highlight && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {HL_PHOTOS.map((src) => <div key={src} className="relative aspect-square overflow-hidden rounded-lg"><Image src={src} alt="9th AFLAR Conference, Mauritius 2019" fill sizes="120px" className="object-cover" /></div>)}
                </div>
              )}
            </div>
            {x.pending && <div className="mt-3"><Pending>{x.pending}</Pending></div>}
          </li>
        ))}
      </ol>
    </div>
  );
}
