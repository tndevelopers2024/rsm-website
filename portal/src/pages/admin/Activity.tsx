import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, Eye, MousePointerClick, Radio, ShieldCheck, Users } from "lucide-react";
import { useStore } from "../../data/store";
import { seedTraffic } from "../../data/seed";
import { downloadXlsx, fmtDateTime } from "../../lib";
import { Segmented, SectionHead, Stat } from "../../ui/ui";
import { AXIS, BarList, ChartTip, SERIES } from "../../ui/charts";

export default function Activity() {
  const { audit } = useStore();
  const t = useMemo(seedTraffic, []);
  const [tab, setTab] = useState<"web" | "audit">("web");
  const [live, setLive] = useState(0);
  const [who, setWho] = useState("All");
  useEffect(() => { const i = setInterval(() => setLive((x) => x + 1), 2600); return () => clearInterval(i); }, []);
  const visitors = t.days.reduce((s, d) => s + d.visitors, 0);
  const views = t.days.reduce((s, d) => s + d.views, 0);
  const conv = Math.round((t.funnel[4].count / t.funnel[0].count) * 1000) / 10;
  const roles = ["All", ...Array.from(new Set(audit.map((a) => a.role)))];
  const rows = audit.filter((a) => who === "All" || a.role === who);

  return (
    <div className="space-y-6">
      <SectionHead title="Website & audit log" sub="What visitors do on the website, and every change made by the team." actions={<Segmented value={tab} onChange={setTab} options={[{ value: "web", label: "Website activity" }, { value: "audit", label: "Audit log" }]} />} />

      {tab === "web" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat icon={Users} label="Visitors · 30 days" value={visitors.toLocaleString("en-GB")} trend="+18%" />
            <Stat icon={Eye} tone="navy" label="Page views" value={views.toLocaleString("en-GB")} />
            <Stat icon={MousePointerClick} tone="gold" label="Registration conversion" value={`${conv}%`} sub="Opened registration → paid" />
            <div className="card p-5">
              <div className="flex items-center gap-2 text-[13px] font-medium text-muted"><span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" /></span> On the site now</div>
              <div className="mt-3 text-[26px] font-semibold text-navy">{14 + (live % 5)}</div>
              <div className="mt-1 truncate text-xs text-muted"><Radio className="mr-1 inline h-3 w-3" />{t.live[live % t.live.length]}</div>
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            <section className="card p-6 xl:col-span-2">
              <h2 className="font-semibold text-navy">Daily visitors</h2>
              <p className="text-xs text-muted">Unique visitors per day, last 30 days</p>
              <div className="mt-4 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={t.days} margin={{ left: -14, right: 8, top: 8 }}>
                    <CartesianGrid vertical={false} stroke="#eef2f5" />
                    <XAxis dataKey="date" {...AXIS} interval={6} tickFormatter={(d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} />
                    <YAxis {...AXIS} width={44} />
                    <Tooltip content={<ChartTip labelFmt={(l) => new Date(String(l)).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} />} cursor={{ stroke: "#9fb2c2", strokeDasharray: "3 3" }} />
                    <Line type="monotone" dataKey="visitors" name="Visitors" stroke={SERIES[0]} strokeWidth={2} dot={false} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
            <section className="card p-6">
              <h2 className="font-semibold text-navy">Registration funnel</h2>
              <p className="text-xs text-muted">Where visitors drop off</p>
              <ol className="mt-5 space-y-3">
                {t.funnel.map((f, i) => (
                  <li key={f.step}>
                    <div className="flex justify-between text-[13px]"><span className="text-ink/85">{i + 1}. {f.step}</span><span className="font-semibold tabular-nums text-navy">{f.count.toLocaleString("en-GB")}</span></div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-mist"><div className="h-2.5 rounded-full" style={{ width: `${(f.count / t.funnel[0].count) * 100}%`, background: i === t.funnel.length - 1 ? SERIES[3] : SERIES[0] }} /></div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <section className="card p-6"><h2 className="font-semibold text-navy">Top pages</h2><div className="mt-5"><BarList rows={t.pages.map((p) => ({ key: p.path, label: <span>{p.page} <span className="text-muted">{p.path}</span></span>, value: p.views }))} fmt={(v) => v.toLocaleString("en-GB")} color={SERIES[1]} /></div></section>
            <section className="card p-6"><h2 className="font-semibold text-navy">Where visitors come from</h2><div className="mt-5"><BarList rows={t.sourcesTraffic.map((s) => ({ key: s.name, label: s.name, value: s.value }))} fmt={(v) => `${v}%`} color={SERIES[0]} /></div>
              <p className="mt-6 flex items-start gap-2 rounded-xl bg-mist p-3 text-[12px] text-muted"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> Analytics are privacy-friendly: no advertising cookies, and visitors are counted anonymously unless they sign in.</p>
            </section>
          </div>
        </>
      ) : (
        <section className="card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
            <select value={who} onChange={(e) => setWho(e.target.value)} className="input !w-auto !py-2">{roles.map((r) => <option key={r}>{r}</option>)}</select>
            <button onClick={() => downloadXlsx("audit-log.xlsx", { "Audit log": rows.map((a) => ({ When: fmtDateTime(a.at), Who: a.actor, Role: a.role, Action: a.action, Target: a.target, IP: a.ip })) })} className="btn btn-ghost btn-sm"><Download className="h-3.5 w-3.5" /> Excel</button>
          </div>
          <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[13px]">
              <thead className="bg-mist/70 text-[11.5px] uppercase tracking-wide text-muted"><tr><th className="px-4 py-3 font-semibold">When</th><th className="px-3 py-3 font-semibold">Who</th><th className="px-3 py-3 font-semibold">Action</th><th className="px-3 py-3 font-semibold">Target</th><th className="px-3 py-3 font-semibold">IP</th></tr></thead>
              <tbody className="divide-y divide-line">
                {rows.map((a) => (
                  <tr key={a.id} className="hover:bg-mist/50"><td className="whitespace-nowrap px-4 py-3 text-muted">{fmtDateTime(a.at)}</td><td className="px-3 py-3"><div className="font-semibold text-navy">{a.actor}</div><div className="text-[11.5px] text-muted">{a.role}</div></td><td className="px-3 py-3 text-ink/85">{a.action}</td><td className="px-3 py-3 text-muted">{a.target}</td><td className="px-3 py-3 font-mono text-[12px] text-muted">{a.ip}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-line px-4 py-3 text-xs text-muted">The audit log is append-only: entries can’t be edited or deleted, including by Super admins.</div>
        </section>
      )}
    </div>
  );
}
