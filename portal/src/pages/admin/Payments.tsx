import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Banknote, CheckCircle2, CircleDollarSign, Clock3, CreditCard, Download, Landmark, RotateCcw, ShieldCheck, Truck, XCircle } from "lucide-react";
import { settlements } from "../../data/settle";
import { fmtDate } from "../../lib";
import { useStore } from "../../data/store";
import { NOW, flag } from "../../data/seed";
import { downloadXlsx, fmtDateTime, mur, toUsd, usd } from "../../lib";
import { DemoBanner, Segmented, SectionHead, Stat, StatusPill } from "../../ui/ui";
import { AXIS, ChartTip, SERIES } from "../../ui/charts";

export default function Payments() {
  const { regs, updateReg, notify } = useStore();
  const [tab, setTab] = useState<"all" | "paid" | "pending" | "failed" | "refunded">("all");
  const sum = (s: string) => regs.filter((r) => r.status === s).reduce((a, r) => a + r.amount, 0);
  const tx = regs.filter((r) => tab === "all" || r.status === tab);
  const sett = useMemo(() => settlements(regs), [regs]);
  const transit = sett.filter((x) => !x.settled);

  const weekly = useMemo(() => Array.from({ length: 8 }, (_, i) => {
    const end = new Date(NOW.getTime() - (7 - i) * 7 * 864e5 + 864e5);
    const start = new Date(end.getTime() - 7 * 864e5);
    const inWeek = regs.filter((r) => r.paidAt && r.status === "paid" && new Date(r.paidAt) >= start && new Date(r.paidAt) < end);
    return { week: start.toLocaleDateString("en-GB", { day: "numeric", month: "short" }), Residents: inWeek.filter((r) => r.type === "mu").reduce((a, r) => a + r.amount, 0), International: inWeek.filter((r) => r.type === "intl").reduce((a, r) => a + r.amount, 0) };
  }), [regs]);

  return (
    <div className="space-y-6">
      <SectionHead title="Payments" sub="Card payments, outstanding balances and refunds, reconciled against each registration."
        actions={<button onClick={() => { downloadXlsx("payments-reconciliation.xlsx", { Payments: regs.filter((r) => r.txn || r.status === "pending").map((r) => ({ "Registration ID": r.id, Name: `${r.title} ${r.first} ${r.last}`, Country: r.country, Category: r.category, "Amount (MUR)": r.amount, "Amount (USD)": r.usd ?? "", Status: r.status, Method: r.method, Reference: r.txn ?? "", "Paid at": r.paidAt ? fmtDateTime(r.paidAt) : "" })) }); notify("Reconciliation exported"); }} className="btn btn-ghost"><Download className="h-4 w-4" /> Reconciliation (Excel)</button>} />

      <section className="grain relative isolate overflow-hidden rounded-3xl bg-navy-deep p-6 text-white md:p-8">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-white/10" />
        <div className="eyebrow text-gold">Where the money goes</div>
        <h2 className="mt-3 max-w-2xl text-2xl font-light md:text-[28px]">Every registration fee is paid straight into the <span className="font-serif italic text-aqua">Society’s own SBM account</span>, with no partner account in between.</h2>
        <div className="mt-7 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {[[CreditCard, "Participant pays by card", "On the Society’s registration page"], [ShieldCheck, "SBM secure checkout", "Card details never touch our servers"], [Landmark, "Rheumatology Society, Mauritius", "SBM account · settled in daily batches"]].map(([I, t, s], i) => {
            const Icon = I as typeof Landmark;
            return [
              <div key={t as string} className={"flex items-center gap-3 rounded-2xl border px-4 py-3.5 " + (i === 2 ? "border-gold/40 bg-gold/10" : "border-white/10 bg-white/[.06]")}>
                <span className={"grid h-10 w-10 shrink-0 place-items-center rounded-xl " + (i === 2 ? "bg-gold/20 text-gold" : "bg-white/10 text-aqua")}><Icon className="h-5 w-5" /></span>
                <span><span className="block text-sm font-semibold">{t as string}</span><span className="block text-xs text-white/55">{s as string}</span></span>
              </div>,
              i < 2 && <ArrowRight key={"a" + i} className="mx-auto hidden h-5 w-5 text-white/40 md:block" />,
            ];
          })}
        </div>
      </section>

      <DemoBanner>Prototype: SBM’s payment gateway is connected in phase 2, using the merchant account opened for the Society. Each payment and settlement will then update here automatically.</DemoBanner>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Banknote} tone="teal" label="Collected" value={mur(sum("paid"))} sub={`≈ ${usd(toUsd(sum("paid")))} · ${mur(sett.filter((x) => x.settled).reduce((t, x) => t + x.amount, 0))} already in the SBM account`} />
        <Stat icon={Clock3} tone="gold" label="Outstanding" value={mur(sum("pending"))} sub={`${regs.filter((r) => r.status === "pending").length} unpaid registrations`} />
        <Stat icon={XCircle} tone="crimson" label="Failed attempts" value={regs.filter((r) => r.status === "failed").length} sub="Card declined or abandoned" />
        <Stat icon={RotateCcw} tone="violet" label="Refunded" value={mur(sum("refunded"))} sub={`${regs.filter((r) => r.status === "refunded").length} refunds`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="card p-6 xl:col-span-2">
          <h2 className="font-semibold text-navy">Collected per week</h2>
          <p className="text-xs text-muted">MUR, by participant type</p>
          <div className="mt-2 flex gap-4 text-xs text-muted"><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: SERIES[0] }} />Mauritian residents</span><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: SERIES[1] }} />International</span></div>
          <div className="mt-3 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly} margin={{ left: 6, right: 8 }} barGap={2}>
                <CartesianGrid vertical={false} stroke="#eef2f5" />
                <XAxis dataKey="week" {...AXIS} />
                <YAxis {...AXIS} width={52} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip content={<ChartTip fmt={mur} labelFmt={(l) => `Week of ${l}`} />} cursor={{ fill: "#f3f7f9" }} />
                <Bar dataKey="Residents" fill={SERIES[0]} radius={[4, 4, 0, 0]} barSize={14} />
                <Bar dataKey="International" fill={SERIES[1]} radius={[4, 4, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="card flex flex-col p-6">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-navy">Settlements to SBM</h2><Landmark className="h-4 w-4 text-gold" /></div>
          <div className="mt-4 rounded-2xl bg-gold-soft/60 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7a5d18]"><Truck className="h-4 w-4" /> On the way to the account</div>
            <div className="mt-1 text-2xl font-semibold text-navy">{mur(transit.reduce((t, x) => t + x.amount, 0))}</div>
            <div className="text-xs text-muted">{transit.length} batch{transit.length === 1 ? "" : "es"} · usually 2 working days</div>
          </div>
          <ul className="scroll-thin mt-4 max-h-[200px] flex-1 space-y-1 overflow-y-auto pr-1">
            {sett.slice(0, 12).map((x) => (
              <li key={x.batch} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-[13px] hover:bg-mist">
                {x.settled ? <CheckCircle2 className="h-4 w-4 shrink-0 text-ok" /> : <Clock3 className="h-4 w-4 shrink-0 text-warn" />}
                <div className="min-w-0 flex-1"><div className="font-semibold text-navy">{mur(x.amount)}</div><div className="text-[11px] text-muted">{x.count} payment{x.count > 1 ? "s" : ""} of {fmtDate(x.day)} · {x.settled ? "settled" : "due"} {fmtDate(x.settleOn)}</div></div>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2 border-t border-line pt-3 text-[11.5px] text-muted"><CircleDollarSign className="h-4 w-4 shrink-0 text-teal" /> Bank fees as per the Society’s SBM merchant agreement. Bank transfers can be marked as received by Finance.</div>
        </section>
      </div>

      <section className="card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
          <h2 className="font-semibold text-navy">Transactions</h2>
          <Segmented value={tab} onChange={setTab} options={[{ value: "all", label: "All" }, { value: "paid", label: "Paid" }, { value: "pending", label: "Pending" }, { value: "failed", label: "Failed" }, { value: "refunded", label: "Refunded" }]} />
        </div>
        <div className="scroll-thin overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-[13px]">
            <thead className="bg-mist/70 text-[11.5px] uppercase tracking-wide text-muted"><tr><th className="px-4 py-3 font-semibold">Reference</th><th className="px-3 py-3 font-semibold">Participant</th><th className="px-3 py-3 font-semibold">Amount</th><th className="px-3 py-3 font-semibold">Status</th><th className="px-3 py-3 font-semibold">Date</th><th className="px-3 py-3" /></tr></thead>
            <tbody className="divide-y divide-line">
              {tx.slice(0, 40).map((r) => (
                <tr key={r.id} className="hover:bg-mist/50">
                  <td className="px-4 py-3 font-mono text-[12px] text-ink/80">{r.txn ?? "—"}</td>
                  <td className="px-3 py-3"><div className="font-semibold text-navy">{r.title} {r.first} {r.last}</div><div className="text-[11.5px] text-muted">{r.id} · {flag(r.country)} {r.country}</div></td>
                  <td className="whitespace-nowrap px-3 py-3"><div className="font-semibold text-navy">{mur(r.amount)}</div>{r.usd && <div className="text-[11.5px] text-muted">USD {r.usd}</div>}</td>
                  <td className="px-3 py-3"><StatusPill status={r.status} small /></td>
                  <td className="whitespace-nowrap px-3 py-3 text-muted">{fmtDateTime(r.paidAt ?? r.registeredAt)}</td>
                  <td className="px-3 py-3 text-right">{r.status === "pending" && <button onClick={() => { updateReg(r.id, { status: "paid", paidAt: new Date().toISOString(), method: "Bank transfer", txn: `BT-${Date.now().toString().slice(-7)}` }, "Marked payment as received (bank transfer)"); notify(`${r.id} marked as paid · receipt emailed`); }} className="btn btn-ghost btn-sm">Mark as received</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {tx.length > 40 && <div className="border-t border-line px-4 py-3 text-xs text-muted">Showing 40 of {tx.length}. Export to Excel for the full list.</div>}
      </section>
    </div>
  );
}
