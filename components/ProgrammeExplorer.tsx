"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Coffee, UtensilsCrossed, Camera, MapPin, Award, Search, X, Mic2, Users, ClipboardCheck, Printer } from "lucide-react";
import { days, flagOf, type Day, type Item } from "@/lib/paflar";

const metaIcon = { break: Coffee, meal: UtensilsCrossed, social: Camera } as const;

function Who({ who }: { who: string }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
      {who.split(" · ").map((p) => {
        const m = p.match(/^(.+),\s([^,]+)$/);
        const tbc = /to be|announced/i.test(p);
        return (
          <span key={p} className={clsx("inline-flex items-center gap-1.5 text-[14px]", tbc ? "italic text-muted/80" : "text-ink/80")}>
            {m && !tbc && <span className="text-[15px] leading-none" aria-hidden>{flagOf(m[2])}</span>}
            {m && !tbc ? <><span className="font-semibold text-navy">{m[1]}</span><span className="text-muted">· {m[2]}</span></> : p}
          </span>
        );
      })}
    </div>
  );
}

function Row({ it, hl }: { it: Item; hl: (s: string) => React.ReactNode }) {
  if (it.kind === "break" || it.kind === "meal" || it.kind === "social") {
    const Icon = metaIcon[it.kind];
    return (
      <li className="grid grid-cols-[64px_1fr] items-center gap-4 py-3 sm:grid-cols-[84px_1fr]">
        <span className="font-cond text-[15px] tracking-wide text-muted">{it.t}</span>
        <span className={clsx("flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14.5px] font-medium", it.kind === "break" ? "bg-gold-soft/70 text-[#7a6224]" : it.kind === "meal" ? "bg-aqua text-teal" : "bg-[#efeafc] text-[#5b4b9a]")}>
          <Icon className="h-4 w-4 shrink-0" /> {it.title}
        </span>
      </li>
    );
  }
  const talk = it.kind === "talk";
  return (
    <li className="group grid grid-cols-[64px_1fr] gap-4 border-t border-line/70 py-4 first:border-t-0 sm:grid-cols-[84px_1fr]">
      <span className="pt-0.5 font-cond text-[17px] tracking-wide text-navy">{it.t}</span>
      <div className="min-w-0">
        {talk && it.tag && <span className="mb-1.5 inline-flex rounded-full bg-teal/10 px-2.5 py-0.5 font-cond text-[11px] uppercase tracking-[0.14em] text-teal">{it.tag}</span>}
        <div className={clsx("leading-snug", talk ? "text-[16.5px] font-semibold text-navy" : "text-[15.5px] font-medium text-ink/70")}>{hl(it.title)}</div>
        {"who" in it && it.who && <Who who={it.who} />}
      </div>
    </li>
  );
}

function DayView({ d, query }: { d: Day; query: string }) {
  const q = query.trim().toLowerCase();
  const hl = (s: string) => {
    if (!q) return s;
    const i = s.toLowerCase().indexOf(q);
    if (i < 0) return s;
    return <>{s.slice(0, i)}<mark className="rounded bg-gold/35 px-0.5 text-inherit">{s.slice(i, i + q.length)}</mark>{s.slice(i + q.length)}</>;
  };
  const sessions = d.sessions
    .map((s) => ({ ...s, items: q ? s.items.filter((it) => it.kind === "talk" && (it.title + " " + (it.who ?? "") + " " + (s.title ?? "")).toLowerCase().includes(q)) : s.items }))
    .filter((s) => s.items.length);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-10">
      {/* Day card */}
      <aside className="lg:sticky lg:top-[250px] lg:self-start">
        <div className={clsx("relative overflow-hidden rounded-[28px] p-7 text-white md:p-8", d.id === "fri" ? "bg-gradient-to-br from-[#a8862f] to-[#6b5418]" : "bg-gradient-to-br from-navy to-navy-deep")}>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/15" />
          <div className="font-cond text-[13px] uppercase tracking-[0.24em] text-white/70">{d.weekday}</div>
          <div className="mt-1 font-serif text-[64px] font-light leading-none">{d.date.split(" ")[0]}<span className="ml-2 align-top font-display text-[17px] tracking-normal text-white/75">May 2027</span></div>
          <div className="mt-4 font-display text-[19px] font-medium">{d.label}</div>
          <p className="mt-2 text-[14.5px] leading-relaxed text-white/75">{d.summary}</p>
          <div className="mt-6 space-y-2.5 border-t border-white/15 pt-5 text-[14px]">
            <div className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span><b className="font-semibold">{d.venue}</b><br /><span className="text-white/65">{d.place}, Mauritius</span></span></div>
            <div className="flex items-center gap-2.5"><Award className="h-4 w-4 shrink-0 text-gold" /><span>{d.cpd} CPD points</span></div>
          </div>
        </div>
      </aside>

      {/* Timeline */}
      <div className="space-y-5">
        {sessions.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-line p-10 text-center text-muted">No sessions on {d.weekday} match &ldquo;{query}&rdquo;.</div>
        )}
        {sessions.map((s, i) => (
          <motion.section
            key={`${d.id}-${i}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}
            className="overflow-hidden rounded-[24px] bg-white ring-1 ring-line"
          >
            {s.title && (
              <header className="flex items-center gap-4 border-b border-line bg-mist/70 px-5 py-4 sm:px-7">
                {s.n ? (
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy font-cond text-[17px] text-white">{s.n}</span>
                ) : (
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold text-white"><ClipboardCheck className="h-5 w-5" /></span>
                )}
                <div className="min-w-0">
                  <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-teal">{s.n ? `Session ${s.n}` : "Workshops"} · {s.items[0].t}–{s.items[s.items.length - 1].t}</div>
                  <h3 className="mt-0.5 text-[18px] font-semibold leading-snug text-navy sm:text-[20px]">{hl(s.title)}</h3>
                </div>
              </header>
            )}
            <ul className="px-5 py-2 sm:px-7">{s.items.map((it, j) => <Row key={j} it={it} hl={hl} />)}</ul>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

export function ProgrammeExplorer() {
  const [active, setActive] = useState<Day["id"]>("fri");
  const [query, setQuery] = useState("");
  const counts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.fromEntries(days.map((d) => [d.id, q ? d.sessions.flatMap((s) => s.items.filter((it) => it.kind === "talk" && (it.title + " " + (it.who ?? "") + " " + (s.title ?? "")).toLowerCase().includes(q))).length : null]));
  }, [query]);
  const day = days.find((d) => d.id === active)!;

  return (
    <div>
      {/* Day selector + search */}
      <div className="sticky top-[123px] z-30 -mx-6 border-b border-line bg-white px-6 py-3 md:-mx-10 md:px-10 lg:top-[148px] lg:mx-0 lg:rounded-2xl lg:border lg:px-3 lg:shadow-[0_18px_40px_-30px_rgba(20,45,70,.5)] print:hidden">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div role="tablist" aria-label="Congress days" className="grid flex-1 grid-cols-3 gap-2">
            {days.map((d) => {
              const on = d.id === active;
              const c = counts[d.id];
              return (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(d.id)}
                  className={clsx("relative rounded-xl px-3 py-2.5 text-left transition sm:px-4", on ? "bg-navy text-white shadow-[0_12px_28px_-14px_rgba(20,45,70,.8)]" : "bg-mist text-navy hover:bg-aqua")}
                >
                  <span className={clsx("block font-cond text-[11px] uppercase tracking-[0.18em]", on ? "text-gold" : "text-muted")}>{d.weekday}</span>
                  <span className="block font-display text-[15px] font-semibold sm:text-[16px]">{d.date.replace(" 2027", "")}</span>
                  <span className={clsx("hidden truncate text-[12.5px] sm:block", on ? "text-white/70" : "text-muted")}>{d.id === "fri" ? "Workshops · Artemis" : "Congress · Hilton"}</span>
                  {c !== null && <span className={clsx("absolute right-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold", c ? "bg-gold text-navy-deep" : "bg-line text-muted")}>{c}</span>}
                </button>
              );
            })}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <label className="relative flex-1 lg:w-[300px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a topic or speaker"
                aria-label="Search the programme"
                className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-9 text-[15px] text-navy outline-none transition placeholder:text-muted/70 focus:border-teal focus:ring-4 focus:ring-teal/10"
              />
              {query && <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-mist"><X className="h-4 w-4" /></button>}
            </label>
            <button onClick={() => window.print()} className="hidden h-11 items-center gap-2 rounded-xl border border-line px-4 text-[14px] font-medium text-navy transition hover:border-navy md:inline-flex" aria-label="Print the programme"><Printer className="h-4 w-4" /> Print</button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 lg:hidden">
            <label className="relative flex-1 lg:w-[300px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a topic or speaker"
                aria-label="Search the programme"
                className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-9 text-[15px] text-navy outline-none transition placeholder:text-muted/70 focus:border-teal focus:ring-4 focus:ring-teal/10"
              />
              {query && <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-mist"><X className="h-4 w-4" /></button>}
            </label>
            <button onClick={() => window.print()} className="hidden h-11 items-center gap-2 rounded-xl border border-line px-4 text-[14px] font-medium text-navy transition hover:border-navy md:inline-flex" aria-label="Print the programme"><Printer className="h-4 w-4" /> Print</button>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <DayView d={day} query={query} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted print:hidden">
        <span className="inline-flex items-center gap-2"><Mic2 className="h-4 w-4 text-navy" /> Talk</span>
        <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-teal" /> Parallel workshop</span>
        <span className="inline-flex items-center gap-2"><Coffee className="h-4 w-4 text-[#a8862f]" /> Break</span>
        <span className="inline-flex items-center gap-2"><UtensilsCrossed className="h-4 w-4 text-teal" /> Meal / symposium</span>
      </div>
    </div>
  );
}
