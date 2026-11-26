"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Milestone, Sparkles, Users, GraduationCap, Microscope, HeartHandshake, CalendarDays, ListChecks, Hotel, TreePalm, Plane, Handshake, Ticket, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import type { NavItem } from "@/lib/content";
import { img } from "@/lib/images";

const icons: Record<string, LucideIcon> = { Building2, Milestone, Sparkles, Users, GraduationCap, Microscope, HeartHandshake, CalendarDays, ListChecks, Hotel, TreePalm, Plane, Handshake, Ticket };

/** Two-column mega menu: icon links with descriptions + a featured image card. */
export function MegaPanel({ item, align = "center", dark }: { item: NavItem; align?: "center" | "right"; dark?: boolean }) {
  const f = item.feature;
  const wide = (item.children?.length ?? 0) > 4;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
      className={clsx("absolute top-full z-50 pt-[18px]", align === "center" ? "left-1/2 -translate-x-1/2" : "right-0")}
    >
      <div className={clsx("absolute top-[11px] h-4 w-4 rotate-45 rounded-[3px] bg-white ring-1 ring-line", align === "center" ? "left-1/2 -translate-x-1/2" : "right-14")} />
      <div className={clsx("relative grid overflow-hidden rounded-[22px] bg-white shadow-[0_40px_80px_-30px_rgba(11,32,52,.45)] ring-1 ring-line", wide ? "w-[760px] grid-cols-[1.25fr_1fr]" : "w-[680px] grid-cols-[1.2fr_1fr]")}>
        <div className="p-3">
          <div className="px-4 pb-2 pt-3 font-cond text-[11.5px] uppercase tracking-[0.22em] text-muted">{item.label}</div>
          {item.children!.map((c) => {
            const Icon = icons[c.icon] ?? ArrowRight;
            return (
              <Link key={c.href} href={c.href} className="group/m flex items-center gap-4 rounded-2xl px-4 py-3 transition hover:bg-aqua/70">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-aqua text-teal ring-1 ring-teal/10 transition group-hover/m:bg-teal group-hover/m:text-white">
                  <Icon className="h-[19px] w-[19px]" strokeWidth={1.7} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-semibold text-navy">{c.label}</span>
                  <span className="block truncate text-[13px] text-muted">{c.desc}</span>
                </span>
                <ArrowRight className="h-4 w-4 -translate-x-1 text-teal opacity-0 transition group-hover/m:translate-x-0 group-hover/m:opacity-100" />
              </Link>
            );
          })}
        </div>
        {f && (
          <Link href={f.href} className={clsx("group/f relative m-2 ml-0 flex flex-col justify-end overflow-hidden rounded-[18px] p-6 text-white", dark ? "bg-navy-deep" : "bg-navy")}>
            <Image src={img[f.image]} alt="" fill sizes="320px" className="object-cover transition duration-[1400ms] group-hover/f:scale-105" style={{ objectPosition: "65% center" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/5" />
            <div className="relative">
              <div className="font-cond text-[11.5px] uppercase tracking-[0.2em] text-gold">{f.kicker}</div>
              <div className="mt-2 font-display text-[19px] font-medium leading-snug">{f.title}</div>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[13px] font-semibold ring-1 ring-white/25 backdrop-blur transition group-hover/f:bg-white group-hover/f:text-navy">
                {f.cta} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
