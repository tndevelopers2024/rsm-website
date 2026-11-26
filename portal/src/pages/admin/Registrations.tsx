import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { BedDouble, Check, ChevronLeft, ChevronRight, Download, Mail, MessageCircle, Pencil, Save, Search, SlidersHorizontal, Utensils, X } from "lucide-react";
import { useStore } from "../../data/store";
import { DAY_LABEL, flag } from "../../data/seed";
import { cpd, daysLabel, downloadXlsx, fmtDateTime, fmtTime, mur, priceLabel, qrPayload, regRow } from "../../lib";
import { Avatar, Drawer, Empty, Pill, QR, SectionHead, StatusPill } from "../../ui/ui";
import type { Category, DayKey, RegStatus, Registration } from "../../data/types";

const PAGE = 15;
const STATUSES: (RegStatus | "all")[] = ["all", "paid", "pending", "failed", "refunded", "cancelled"];

export default function Registrations() {
  const { regs, messages, updateReg, send, notify, log } = useStore();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [status, setStatus] = useState<RegStatus | "all">("all");
  const [type, setType] = useState<"all" | "mu" | "intl">("all");
  const [day, setDay] = useState<"all" | DayKey>("all");
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => setQ(params.get("q") ?? ""), [params]);
  useEffect(() => setPage(0), [q, status, type, day]);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return regs.filter((r) =>
      (status === "all" || r.status === status) && (type === "all" || r.type === type) && (day === "all" || r.days.includes(day)) &&
      (!s || `${r.first} ${r.last} ${r.email} ${r.id} ${r.country} ${r.workplace}`.toLowerCase().includes(s)));
  }, [regs, q, status, type, day]);
  const view = rows.slice(page * PAGE, page * PAGE + PAGE);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const open = regs.find((r) => r.id === openId) ?? null;
  const allOnPage = view.length > 0 && view.every((r) => sel.has(r.id));

  const toggle = (id: string) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const bulkSend = (channel: "Email" | "WhatsApp") => {
    regs.filter((r) => sel.has(r.id)).forEach((r) => send({ regId: r.id, channel, template: channel === "Email" ? "Registration confirmation (resent)" : "Reminder · PAFLAR 2027", to: channel === "Email" ? r.email : r.phone }));
    log(`Bulk ${channel} sent`, `${sel.size} participants`);
    notify(`${channel} queued for ${sel.size} participants`);
    setSel(new Set());
  };

  return (
    <div className="space-y-6">
      <SectionHead title="Registrations" sub={`${regs.length} total · every registration made on the website appears here instantly`}
        actions={<button onClick={() => { downloadXlsx(`registrations-${status}.xlsx`, { Registrations: rows.map(regRow) }); notify(`${rows.length} rows exported to Excel`); }} className="btn btn-ghost"><Download className="h-4 w-4" /> Export {rows.length} to Excel</button>} />

      <div className="card">
        <div className="flex flex-wrap items-center gap-3 border-b border-line p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, email, ID, country, hospital…" className="input pl-10" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted" />
            <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="input !w-auto !py-2"><option value="all">All participants</option><option value="mu">Mauritian residents</option><option value="intl">International</option></select>
            <select value={day} onChange={(e) => setDay(e.target.value as typeof day)} className="input !w-auto !py-2"><option value="all">Any day</option>{(["fri", "sat", "sun"] as DayKey[]).map((d) => <option key={d} value={d}>{DAY_LABEL[d]}</option>)}</select>
          </div>
        </div>
        <div className="scroll-thin flex gap-1 overflow-x-auto border-b border-line px-4">
          {STATUSES.map((s) => {
            const n = s === "all" ? regs.length : regs.filter((r) => r.status === s).length;
            return <button key={s} onClick={() => setStatus(s)} className={clsx("relative whitespace-nowrap px-3 py-3 text-[13px] font-semibold capitalize transition", status === s ? "text-navy" : "text-muted hover:text-navy")}>{s === "all" ? "All" : s} <span className="ml-1 rounded-full bg-mist px-1.5 py-0.5 text-[11px]">{n}</span>{status === s && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-teal" />}</button>;
          })}
        </div>

        {sel.size > 0 && (
          <div className="flex flex-wrap items-center gap-3 bg-navy px-4 py-2.5 text-sm text-white">
            <span className="font-semibold">{sel.size} selected</span>
            <button onClick={() => bulkSend("Email")} className="btn btn-sm bg-white/10 hover:bg-white/20"><Mail className="h-3.5 w-3.5" /> Resend confirmation</button>
            <button onClick={() => bulkSend("WhatsApp")} className="btn btn-sm bg-white/10 hover:bg-white/20"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp reminder</button>
            <button onClick={() => downloadXlsx("selected-registrations.xlsx", { Selected: regs.filter((r) => sel.has(r.id)).map(regRow) })} className="btn btn-sm bg-white/10 hover:bg-white/20"><Download className="h-3.5 w-3.5" /> Export</button>
            <button onClick={() => setSel(new Set())} className="ml-auto text-white/70 hover:text-white"><X className="h-4 w-4" /></button>
          </div>
        )}

        {view.length === 0 ? <Empty icon={Search} title="No registrations match" sub="Try clearing a filter or searching by registration ID." /> : (
          <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-[13px]">
              <thead className="bg-mist/70 text-[11.5px] uppercase tracking-wide text-muted">
                <tr>
                  <th className="w-10 px-4 py-3"><input type="checkbox" className="h-4 w-4 accent-teal" checked={allOnPage} onChange={() => setSel((s) => { const n = new Set(s); view.forEach((r) => (allOnPage ? n.delete(r.id) : n.add(r.id))); return n; })} aria-label="Select page" /></th>
                  <th className="px-2 py-3 font-semibold">Participant</th><th className="px-3 py-3 font-semibold">Category</th><th className="px-3 py-3 font-semibold">Days</th><th className="px-3 py-3 font-semibold">Amount</th><th className="px-3 py-3 font-semibold">Status</th><th className="px-3 py-3 font-semibold">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {view.map((r, i) => (
                  <tr key={r.id} onClick={() => setOpenId(r.id)} className={clsx("cursor-pointer transition hover:bg-teal/[.04]", sel.has(r.id) && "bg-teal/[.05]")}>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="h-4 w-4 accent-teal" checked={sel.has(r.id)} onChange={() => toggle(r.id)} aria-label={`Select ${r.id}`} /></td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar first={r.first} last={r.last} size={34} tone={i} />
                        <div className="min-w-0"><div className="font-semibold text-navy">{r.title} {r.first} {r.last}</div><div className="text-[11.5px] text-muted">{r.id} · {flag(r.country)} {r.country}</div></div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-ink/80">{r.category}</td>
                    <td className="px-3 py-3"><div className="flex gap-1">{(["fri", "sat", "sun"] as DayKey[]).map((d) => <span key={d} className={clsx("grid h-6 w-8 place-items-center rounded-md text-[10.5px] font-bold uppercase", r.days.includes(d) ? (r.attendance[d] ? "bg-ok text-white" : "bg-teal/12 text-teal") : "bg-mist text-muted/50")}>{d.slice(0, 2)}</span>)}</div></td>
                    <td className="whitespace-nowrap px-3 py-3 font-semibold text-navy">{r.usd ? `USD ${r.usd}` : mur(r.amount)}</td>
                    <td className="px-3 py-3"><StatusPill status={r.status} small /></td>
                    <td className="whitespace-nowrap px-3 py-3 text-muted">{fmtDateTime(r.registeredAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-line px-4 py-3 text-[13px] text-muted">
          <span>{rows.length ? `${page * PAGE + 1}–${Math.min(rows.length, page * PAGE + PAGE)} of ${rows.length}` : "0 results"}</span>
          <div className="flex items-center gap-1">
            <button disabled={page === 0} onClick={() => setPage(page - 1)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-mist disabled:opacity-40" aria-label="Previous"><ChevronLeft className="h-4 w-4" /></button>
            <span className="px-2">{page + 1} / {pages}</span>
            <button disabled={page >= pages - 1} onClick={() => setPage(page + 1)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-mist disabled:opacity-40" aria-label="Next"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <Drawer open={!!open} onClose={() => setOpenId(null)} title={open && <span className="flex items-center gap-2">{open.id} <StatusPill status={open.status} small /></span>}>
        {open && <RegDetail r={open} msgs={messages.filter((m) => m.regId === open.id)} onSave={(p, why) => { updateReg(open.id, p, why); notify("Saved · change recorded in the audit log"); }} onSend={(ch) => { send({ regId: open.id, channel: ch, template: ch === "Email" ? "Receipt + QR badge (resent)" : "Registration confirmed", to: ch === "Email" ? open.email : open.phone }); notify(`${ch} sent to ${open.first}`); }} />}
      </Drawer>
    </div>
  );
}

function RegDetail({ r, msgs, onSave, onSend }: { r: Registration; msgs: { id: string; channel: string; template: string; at: string; status: string }[]; onSave: (p: Partial<Registration>, why: string) => void; onSend: (c: "Email" | "WhatsApp") => void }) {
  const [edit, setEdit] = useState(false);
  const [f, setF] = useState({ category: r.category, days: r.days, status: r.status, dietary: r.dietary, notes: r.notes, phone: r.phone });
  useEffect(() => { setF({ category: r.category, days: r.days, status: r.status, dietary: r.dietary, notes: r.notes, phone: r.phone }); setEdit(false); }, [r.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const timeline = [
    { t: r.registeredAt, l: "Registered on the website", s: `Source: ${r.source}` },
    ...(r.paidAt ? [{ t: r.paidAt, l: r.status === "refunded" ? "Paid, later refunded" : "Payment received", s: `${r.method} · ${r.txn}` }] : []),
    ...msgs.map((m) => ({ t: m.at, l: `${m.channel}: ${m.template}`, s: m.status })),
    ...(Object.entries(r.attendance) as [DayKey, string][]).map(([d, t]) => ({ t, l: `Checked in · ${DAY_LABEL[d]}`, s: "QR scan at the registration desk" })),
  ].sort((a, b) => b.t.localeCompare(a.t));

  return (
    <div>
      <div className="flex items-center gap-4 bg-mist/60 px-6 py-5">
        <Avatar first={r.first} last={r.last} size={56} />
        <div className="min-w-0 flex-1">
          <div className="text-lg font-semibold text-navy">{r.title} {r.first} {r.last}</div>
          <div className="text-[13px] text-muted">{r.speciality} · {r.workplace}</div>
          <div className="mt-1 text-[13px] text-muted">{flag(r.country)} {r.city}, {r.country}</div>
        </div>
        {r.status === "paid" && <QR value={qrPayload(r)} size={64} />}
      </div>

      <div className="flex flex-wrap gap-2 border-b border-line px-6 py-3">
        <button onClick={() => onSend("Email")} className="btn btn-ghost btn-sm"><Mail className="h-3.5 w-3.5" /> Resend receipt</button>
        <button onClick={() => onSend("WhatsApp")} className="btn btn-ghost btn-sm"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</button>
        {!edit ? <button onClick={() => setEdit(true)} className="btn btn-navy btn-sm ml-auto"><Pencil className="h-3.5 w-3.5" /> Edit</button> : <button onClick={() => { onSave(f, "Edited registration"); setEdit(false); }} className="btn btn-primary btn-sm ml-auto"><Save className="h-3.5 w-3.5" /> Save</button>}
      </div>

      <div className="space-y-6 px-6 py-6">
        {edit ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label">Category</label><select className="input" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value as Category })}>{["Mauritian resident", "International delegate", "PAFLAR member", "Allied health professional"].map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="label">Payment status</label><select className="input" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as RegStatus })}>{["paid", "pending", "failed", "refunded", "cancelled"].map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}</select></div>
            <div className="sm:col-span-2"><label className="label">Days</label><div className="flex gap-2">{(["fri", "sat", "sun"] as DayKey[]).map((d) => <button key={d} type="button" onClick={() => setF({ ...f, days: f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d].sort((a, b) => ["fri", "sat", "sun"].indexOf(a) - ["fri", "sat", "sun"].indexOf(b)) as DayKey[] })} className={clsx("flex-1 rounded-xl border py-2 text-sm font-semibold", f.days.includes(d) ? "border-teal bg-teal/5 text-teal" : "border-line text-muted")}>{DAY_LABEL[d]}</button>)}</div></div>
            <div><label className="label">Mobile</label><input className="input" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
            <div><label className="label">Dietary</label><input className="input" value={f.dietary} onChange={(e) => setF({ ...f, dietary: e.target.value })} /></div>
            <div className="sm:col-span-2"><label className="label">Internal notes</label><textarea className="input min-h-[90px]" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="Visible to the organising team only" /></div>
          </div>
        ) : (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-[13px]">
            {[
              ["Category", r.category], ["Days", daysLabel(r)], ["Amount", priceLabel(r)], ["CPD points", `${cpd(r)}`],
              ["Email", r.email], ["Mobile", r.phone], ["Medical Council no.", r.mcr || "—"], ["Payment ref", r.txn ?? "—"],
            ].map(([k, v]) => <div key={k}><dt className="text-[11.5px] text-muted">{k}</dt><dd className="mt-0.5 break-words font-semibold text-navy">{v}</dd></div>)}
          </dl>
        )}
        {!edit && (
          <div className="flex flex-wrap gap-2">
            <Pill><Utensils className="h-3 w-3" /> {r.dietary}</Pill>
            <Pill tone={r.hotel ? "teal" : "slate"}><BedDouble className="h-3 w-3" /> {r.hotel ? "Hotel room requested" : "No hotel"}</Pill>
            {(["fri", "sat", "sun"] as DayKey[]).filter((d) => r.attendance[d]).map((d) => <Pill key={d} tone="ok"><Check className="h-3 w-3" /> {DAY_LABEL[d]} · {fmtTime(r.attendance[d])}</Pill>)}
          </div>
        )}
        {!edit && r.notes && <p className="rounded-xl bg-gold-soft/50 p-3 text-[13px] text-ink/80"><b>Note:</b> {r.notes}</p>}

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">Timeline</div>
          <ol className="relative mt-3 space-y-4 border-l-2 border-line pl-5">
            {timeline.map((t, i) => (
              <li key={i} className="relative"><span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-teal" /><div className="text-[13px] font-semibold text-navy">{t.l}</div><div className="text-[11.5px] text-muted">{fmtDateTime(t.t)} · {t.s}</div></li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
