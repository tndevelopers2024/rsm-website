import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Banknote, CalendarClock, Clock3, Download, Landmark, QrCode, ScrollText, Send, ShieldCheck, Users } from "lucide-react";
import { settlements } from "../../data/settle";
import { useStore } from "../../data/store";
import { NOW, flag } from "../../data/seed";
import { ago, downloadXlsx, fmtDate, mur, regRow, toUsd, usd } from "../../lib";
import { Avatar, SectionHead, Stat, StatusPill } from "../../ui/ui";
import { AXIS, BarList, ChartTip, SERIES } from "../../ui/charts";
import type { DayKey } from "../../data/types";

export default function Overview() {
  const { regs, abstracts, audit, settings, notify } = useStore();
  const paid = regs.filter((r) => r.status === "paid");
  const pending = regs.filter((r) => r.status === "pending");
  const revenue = paid.reduce((s, r) => s + r.amount, 0);
  const week = regs.filter((r) => NOW.getTime() - new Date(r.registeredAt).getTime() < 7 * 864e5).length;

  const timeline = useMemo(() => {
    const days = 56;
    const out: { date: string; label: string; total: number; daily: number }[] = [];
    let total = regs.filter((r) => new Date(r.registeredAt) < new Date(NOW.getTime() - days * 864e5)).length;
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(NOW); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const daily = regs.filter((r) => r.registeredAt.slice(0, 10) === key).length;
      total += daily;
      out.push({ date: key, label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }), total, daily });
    }
    return out;
  }, [regs]);

  const byCat = ["Mauritian resident", "International delegate", "PAFLAR member", "Allied health professional"].map((c) => ({ name: c.replace(" professional", "").replace(" participant", ""), full: c, value: regs.filter((r) => r.category === c && r.status !== "failed").length }));
  const countries = Object.entries(regs.filter((r) => r.status !== "failed").reduce<Record<string, number>>((m, r) => ((m[r.country] = (m[r.country] ?? 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);
  const perDay = (["fri", "sat", "sun"] as DayKey[]).map((d) => ({ day: d === "fri" ? "Fri 7 May" : d === "sat" ? "Sat 8 May" : "Sun 9 May", value: paid.filter((r) => r.days.includes(d)).length }));
  const sett = settlements(regs);
  const settled = sett.filter((x) => x.settled).reduce((t, x) => t + x.amount, 0);
  const transit = revenue - settled;
  const outstanding = pending.reduce((s, r) => s + r.amount, 0);
  const ebDays = Math.ceil((new Date(settings.earlyBirdEnds).getTime() - NOW.getTime()) / 864e5);

  return (
    <div className="space-y-6">
      <SectionHead
        title={<>Good evening, <span className="font-serif font-normal italic text-teal">Secretariat</span></>}
        sub={`Here’s where PAFLAR 2027 stands today · ${NOW.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`}
        actions={<>
          <button onClick={() => { downloadXlsx("PAFLAR2027-registrations.xlsx", { Registrations: regs.map(regRow) }); notify("Excel downloaded"); }} className="btn btn-ghost"><Download className="h-4 w-4" /> Export all</button>
          <Link to="/admin/attendance" className="btn btn-primary"><QrCode className="h-4 w-4" /> Open check-in</Link>
        </>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Users} label="Registrations" value={regs.length} sub={`${paid.length} confirmed · ${week} this week`} trend={`+${week} wk`} />
        <Stat icon={Banknote} tone="gold" label="Collected" value={mur(revenue)} sub={`≈ ${usd(toUsd(revenue))} · paid to the Society`} />
        <Stat icon={Clock3} tone="crimson" label="Awaiting payment" value={pending.length} sub={mur(pending.reduce((s, r) => s + r.amount, 0)) + " outstanding"} />
        <Stat icon={ScrollText} tone="violet" label="Abstracts" value={abstracts.length} sub={`${abstracts.filter((a) => a.status === "Submitted").length} new · ${abstracts.filter((a) => a.status === "Accepted").length} accepted`} />
      </div>

      <section className="card overflow-hidden">
        <div className="grid lg:grid-cols-[300px_1fr]">
          <div className="flex flex-col justify-between gap-4 bg-gradient-to-br from-gold-soft to-white p-6">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#7a5d18]"><Landmark className="h-4 w-4" /> Society’s SBM account</div>
            <div><div className="text-[30px] font-semibold tracking-tight text-navy">{mur(settled)}</div><div className="text-xs text-muted">already received in the account</div></div>
            <div className="flex items-start gap-2 text-[11.5px] text-muted"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" /> Registration fees go directly to the Society. No partner holds the money.</div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="font-semibold text-navy">Registration income</h2><span className="text-xs text-muted">{mur(revenue + outstanding)} expected from current registrations</span></div>
            <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-mist">
              <div className="h-full bg-ok" style={{ width: `${(settled / (revenue + outstanding)) * 100}%` }} title="In the SBM account" />
              <div className="h-full border-l-2 border-white bg-gold" style={{ width: `${(transit / (revenue + outstanding)) * 100}%` }} title="On the way" />
              <div className="h-full border-l-2 border-white bg-[repeating-linear-gradient(135deg,#e3eaef_0_6px,#f3f7f9_6px_12px)]" style={{ width: `${(outstanding / (revenue + outstanding)) * 100}%` }} title="Awaiting payment" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[["bg-ok", "In the SBM account", settled], ["bg-gold", "Paid, on the way (≈2 working days)", transit], ["bg-[repeating-linear-gradient(135deg,#cfd9e1_0_3px,#f3f7f9_3px_6px)] ring-1 ring-line", "Awaiting payment", outstanding]].map(([c, l, v]) => (
                <div key={l as string}><div className="flex items-center gap-2 text-xs text-muted"><span className={"h-2.5 w-2.5 rounded-sm " + c} />{l as string}</div><div className="mt-1 text-lg font-semibold text-navy">{mur(v as number)}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="card p-6 xl:col-span-2">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div><h2 className="font-semibold text-navy">Registrations over time</h2><p className="text-xs text-muted">Cumulative total, last 8 weeks</p></div>
            <div className="text-right"><div className="text-2xl font-semibold text-navy">{regs.length}</div><div className="text-xs text-muted">target 150 participants · reached</div></div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline} margin={{ left: -18, right: 8, top: 8 }}>
                <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SERIES[0]} stopOpacity={0.22} /><stop offset="100%" stopColor={SERIES[0]} stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid vertical={false} stroke="#eef2f5" />
                <XAxis dataKey="label" {...AXIS} interval={7} />
                <YAxis {...AXIS} width={44} />
                <Tooltip content={<ChartTip />} cursor={{ stroke: "#9fb2c2", strokeDasharray: "3 3" }} />
                <Area type="monotone" dataKey="total" name="Total registrations" stroke={SERIES[0]} strokeWidth={2} fill="url(#g1)" activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="daily" name="New that day" stroke="transparent" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grain relative isolate overflow-hidden rounded-2xl bg-navy-deep p-6 text-white">
          <div className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full border border-white/10" />
          <div className="eyebrow text-gold">Early-bird rate</div>
          <div className="mt-4 flex items-end gap-2"><span className="text-6xl font-light tabular-nums">{ebDays}</span><span className="pb-2 text-white/60">days left</span></div>
          <p className="mt-2 text-sm text-white/65">Closes {fmtDate(settings.earlyBirdEnds)}. An automatic reminder goes to unpaid registrations 7 days before.</p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {perDay.map((d, i) => (
              <div key={d.day} className="rounded-xl border border-white/10 bg-white/[.06] p-3">
                <div className="text-[11px] text-white/55">{d.day}</div>
                <div className="mt-1 text-xl font-semibold" style={{ color: ["#8fd3e0", "#ffffff", "#f5ecd6"][i] }}>{d.value}</div>
                <div className="text-[10.5px] text-white/45">expected</div>
              </div>
            ))}
          </div>
          <Link to="/admin/communications" className="btn mt-6 w-full bg-white text-navy hover:bg-aqua"><Send className="h-4 w-4" /> Send a reminder</Link>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="card p-6">
          <h2 className="font-semibold text-navy">By category</h2>
          <p className="text-xs text-muted">Excluding failed payments</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCat} layout="vertical" margin={{ left: 0, right: 24 }} barCategoryGap={10}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" {...AXIS} width={118} />
                <Tooltip content={<ChartTip labelFmt={(l) => byCat.find((b) => b.name === l)?.full ?? l} />} cursor={{ fill: "#f3f7f9" }} />
                <Bar dataKey="value" name="Participants" radius={[0, 4, 4, 0]} barSize={16} label={{ position: "right", fill: "#0f2a44", fontSize: 12, fontWeight: 600 }}>
                  {byCat.map((_, i) => <Cell key={i} fill={SERIES[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card p-6">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-navy">Top countries</h2><span className="text-xs text-muted">{countries.length} countries</span></div>
          <div className="mt-5"><BarList rows={countries.slice(0, 7).map(([c, v]) => ({ key: c, label: <>{flag(c)} {c}</>, value: v }))} color={SERIES[1]} /></div>
        </section>

        <section className="card p-6">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-navy">Latest registrations</h2><Link to="/admin/registrations" className="text-xs font-semibold text-teal hover:underline">View all</Link></div>
          <ul className="mt-4 space-y-3">
            {regs.slice(0, 6).map((r, i) => (
              <li key={r.id} className="flex items-center gap-3">
                <Avatar first={r.first} last={r.last} size={34} tone={i} />
                <div className="min-w-0 flex-1"><div className="truncate text-[13px] font-semibold text-navy">{r.title} {r.first} {r.last}</div><div className="truncate text-[11.5px] text-muted">{flag(r.country)} {r.country} · {ago(r.registeredAt)}</div></div>
                <StatusPill status={r.status} small />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card p-6">
        <div className="flex items-center justify-between"><h2 className="font-semibold text-navy">Team activity</h2><Link to="/admin/activity" className="flex items-center gap-1 text-xs font-semibold text-teal hover:underline">Full audit log <ArrowRight className="h-3 w-3" /></Link></div>
        <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {audit.slice(0, 8).map((a) => (
            <li key={a.id} className="flex items-start gap-3 text-[13px]">
              <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
              <div className="min-w-0"><span className="font-semibold text-navy">{a.actor}</span> <span className="text-ink/75">{a.action.toLowerCase()}</span> <span className="text-muted">· {a.target}</span><div className="text-[11.5px] text-muted">{ago(a.at)}</div></div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
