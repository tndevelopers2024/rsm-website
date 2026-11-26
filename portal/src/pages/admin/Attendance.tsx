import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Camera, CheckCircle2, Download, Keyboard, ScanLine, Sparkles, Utensils, XCircle } from "lucide-react";
import { useStore } from "../../data/store";
import { DAY_LABEL, DEMO_DELEGATE_ID, flag } from "../../data/seed";
import { downloadXlsx, fmtTime } from "../../lib";
import { Avatar, DemoBanner, Segmented, SectionHead } from "../../ui/ui";
import type { DayKey, Registration } from "../../data/types";

type Result = { ok: boolean; msg: string; reg?: Registration; at: number };

export default function Attendance() {
  const { regs, checkIn, simulateEventDays, notify } = useStore();
  const [day, setDay] = useState<DayKey>("sat");
  const [code, setCode] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const expected = regs.filter((r) => r.status === "paid" && r.days.includes(day));
  const inn = expected.filter((r) => r.attendance[day]).sort((a, b) => (b.attendance[day] ?? "").localeCompare(a.attendance[day] ?? ""));
  const pct = expected.length ? Math.round((inn.length / expected.length) * 100) : 0;

  const scan = (raw: string) => {
    const id = raw.includes(":") ? raw.split(":")[1] : raw; // accepts the signed QR payload or a plain ID
    const r = checkIn(id, day);
    setRes({ ...r, at: Date.now() });
    setCode("");
    inputRef.current?.focus();
  };
  const simulate = () => {
    const pool = expected.filter((r) => !r.attendance[day] && r.id !== DEMO_DELEGATE_ID);
    if (!pool.length) { notify("Everyone expected today is checked in"); return; }
    scan(pool[Math.floor(Math.random() * pool.length)].id);
  };

  const R = 54, C = 2 * Math.PI * R;
  return (
    <div className="space-y-6">
      <SectionHead title="QR attendance" sub="Scan each participant’s badge at the desk. Attendance drives CPD points and certificates."
        actions={<>
          <Segmented value={day} onChange={(d) => { setDay(d); setRes(null); }} options={(["fri", "sat", "sun"] as DayKey[]).map((d) => ({ value: d, label: DAY_LABEL[d] }))} />
          <button onClick={() => { downloadXlsx(`attendance-${day}.xlsx`, { [DAY_LABEL[day]]: expected.map((r) => ({ "Registration ID": r.id, Name: `${r.title} ${r.first} ${r.last}`, Country: r.country, Category: r.category, "Checked in": r.attendance[day] ? fmtTime(r.attendance[day]) : "No", Dietary: r.dietary })) }); notify("Attendance exported"); }} className="btn btn-ghost"><Download className="h-4 w-4" /> Excel</button>
        </>} />
      <DemoBanner>No on-spot registration: only paid participants registered for the selected day can be checked in. Try “Simulate a scan”, or type <b>RSM27-1000</b> (the demo participant).</DemoBanner>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <section className="grain relative isolate overflow-hidden rounded-3xl bg-navy-deep p-6 text-white md:p-8">
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
            <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_50%_40%,#1d4a6e,#0b2034)]">
              {["left-4 top-4 border-l-4 border-t-4 rounded-tl-2xl", "right-4 top-4 border-r-4 border-t-4 rounded-tr-2xl", "left-4 bottom-4 border-l-4 border-b-4 rounded-bl-2xl", "right-4 bottom-4 border-r-4 border-b-4 rounded-br-2xl"].map((c) => <span key={c} className={clsx("absolute h-12 w-12 border-aqua", c)} />)}
              <motion.span className="absolute inset-x-8 h-0.5 rounded-full bg-aqua shadow-[0_0_24px_4px_rgba(143,211,224,.6)]" animate={{ top: ["18%", "82%", "18%"] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
              <div className="absolute inset-0 grid place-items-center"><ScanLine className="h-14 w-14 text-white/20" /></div>
            </div>
            <div>
              <div className="eyebrow text-gold">Check-in · {DAY_LABEL[day]}</div>
              <h2 className="mt-3 text-2xl font-light">Point the camera at the badge, or use a handheld scanner.</h2>
              <form onSubmit={(e) => { e.preventDefault(); if (code.trim()) scan(code); }} className="mt-6 flex gap-2">
                <div className="relative flex-1">
                  <Keyboard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input ref={inputRef} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Scan or type an ID" className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-aqua" />
                </div>
                <button className="btn bg-white text-navy hover:bg-aqua">Check in</button>
              </form>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={simulate} className="btn btn-sm border border-white/20 text-white hover:bg-white/10"><Sparkles className="h-3.5 w-3.5" /> Simulate a scan</button>
                <button onClick={() => notify("Camera scanning is enabled on the venue tablets in phase 2")} className="btn btn-sm border border-white/20 text-white hover:bg-white/10"><Camera className="h-3.5 w-3.5" /> Use camera</button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {res && (
              <motion.div key={res.at} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className={clsx("mt-7 flex items-center gap-4 rounded-2xl p-4", res.ok ? "bg-ok text-white" : "bg-white text-navy")}>
                {res.ok ? <CheckCircle2 className="h-10 w-10 shrink-0" /> : <XCircle className="h-10 w-10 shrink-0 text-bad" />}
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-semibold">{res.reg ? `${res.reg.title} ${res.reg.first} ${res.reg.last}` : "Unknown badge"}</div>
                  <div className={clsx("text-sm", res.ok ? "text-white/85" : "text-bad")}>{res.ok ? `Welcome! ${res.reg?.category} · ${flag(res.reg?.country ?? "")} ${res.reg?.country}` : res.msg}</div>
                </div>
                {res.ok && res.reg && res.reg.dietary !== "None" && <span className="hidden items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold sm:flex"><Utensils className="h-3.5 w-3.5" /> {res.reg.dietary}</span>}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 128 128" className="h-32 w-32 shrink-0 -rotate-90">
              <circle cx="64" cy="64" r={R} fill="none" stroke="#eef2f5" strokeWidth="12" />
              <circle cx="64" cy="64" r={R} fill="none" stroke="#0e9aa0" strokeWidth="12" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (C * pct) / 100} className="transition-all duration-700" />
            </svg>
            <div>
              <div className="text-4xl font-semibold tracking-tight text-navy">{inn.length}<span className="text-xl font-normal text-muted"> / {expected.length}</span></div>
              <div className="text-sm text-muted">checked in · {pct}%</div>
              <div className="mt-3 text-xs text-muted">{expected.length - inn.length} still to arrive</div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between"><div className="text-sm font-semibold text-navy">Latest check-ins</div>{inn.length === 0 && <button onClick={() => { simulateEventDays(); notify("Event-day check-ins loaded for Fri–Sun"); }} className="text-xs font-semibold text-teal hover:underline">Load event-day demo data</button>}</div>
          <ul className="scroll-thin mt-3 max-h-[300px] space-y-2 overflow-y-auto pr-1">
            {inn.length === 0 && <li className="rounded-xl bg-mist p-4 text-center text-[13px] text-muted">No one checked in yet for {DAY_LABEL[day]}.</li>}
            {inn.slice(0, 30).map((r, i) => (
              <li key={r.id} className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-mist">
                <Avatar first={r.first} last={r.last} size={32} tone={i} />
                <div className="min-w-0 flex-1"><div className="truncate text-[13px] font-semibold text-navy">{r.title} {r.first} {r.last}</div><div className="text-[11.5px] text-muted">{flag(r.country)} {r.category}</div></div>
                <span className="text-xs font-semibold tabular-nums text-ok">{fmtTime(r.attendance[day])}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
