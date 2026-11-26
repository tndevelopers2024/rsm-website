import { useState } from "react";
import clsx from "clsx";
import { CheckCircle2, FileText, Plus, Send, X } from "lucide-react";
import { useStore } from "../../data/store";
import { fmtDate } from "../../lib";
import { Empty, Pill, SectionHead } from "../../ui/ui";
import { useMe } from "./Layout";
import type { Abstract } from "../../data/types";

const TRACKS = ["Original research", "Clinical case", "Quality improvement", "Medical education", "Allied health practice"];
const LIMIT = 300;

export const absTone = (s: Abstract["status"]) => (s === "Accepted" ? "ok" : s === "Rejected" ? "bad" : s === "Revisions requested" ? "warn" : s === "Under review" ? "violet" : "teal") as "ok";

export default function DelegateAbstracts() {
  const me = useMe();
  const { abstracts, addAbstract, notify, settings } = useStore();
  const mine = abstracts.filter((a) => a.regId === me.id);
  const [open, setOpen] = useState(mine.length === 0);
  const [f, setF] = useState({ title: "", track: TRACKS[0], presentation: "Either" as Abstract["presentation"], coAuthors: "", affiliation: me.workplace, body: "", consent: false });
  const words = f.body.trim() ? f.body.trim().split(/\s+/).length : 0;
  const valid = f.title.trim().length > 8 && words >= 50 && words <= LIMIT && f.consent;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const id = `ABS-${Math.floor(300 + Math.random() * 600)}`;
    addAbstract({ id, regId: me.id, author: `${me.title} ${me.first} ${me.last}`, coAuthors: f.coAuthors, affiliation: f.affiliation, country: me.country, title: f.title.trim(), track: f.track, presentation: f.presentation, body: f.body.trim(), status: "Submitted", submittedAt: new Date().toISOString() });
    notify(`Abstract ${id} submitted · confirmation emailed`);
    setOpen(false);
    setF({ ...f, title: "", body: "", coAuthors: "", consent: false });
  };

  return (
    <div className="space-y-6">
      <SectionHead title="Abstracts" sub={`Submit original research, clinical cases or practice improvements. Deadline ${fmtDate(settings.abstractDeadline)} · up to ${LIMIT} words.`} actions={!open && <button onClick={() => setOpen(true)} className="btn btn-primary"><Plus className="h-4 w-4" /> New abstract</button>} />

      {open && (
        <form onSubmit={submit} className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <div className="font-semibold text-navy">New abstract</div>
            {mine.length > 0 && <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-mist"><X className="h-4 w-4" /></button>}
          </div>
          <div className="grid gap-5 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="label">Title</label>
              <input className="input" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="e.g. Delayed diagnosis of JIA in primary care: a two-year audit" />
            </div>
            <div>
              <label className="label">Track</label>
              <select className="input" value={f.track} onChange={(e) => setF({ ...f, track: e.target.value })}>{TRACKS.map((t) => <option key={t}>{t}</option>)}</select>
            </div>
            <div>
              <label className="label">Presentation preference</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Oral", "Poster", "Either"] as const).map((p) => (
                  <button type="button" key={p} onClick={() => setF({ ...f, presentation: p })} className={clsx("rounded-xl border py-2.5 text-sm font-semibold transition", f.presentation === p ? "border-teal bg-teal/5 text-teal" : "border-line text-muted hover:border-teal/50")}>{p}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Co-authors <span className="font-normal text-muted">(optional)</span></label>
              <input className="input" value={f.coAuthors} onChange={(e) => setF({ ...f, coAuthors: e.target.value })} placeholder="Names, separated by commas" />
            </div>
            <div>
              <label className="label">Affiliation</label>
              <input className="input" value={f.affiliation} onChange={(e) => setF({ ...f, affiliation: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center justify-between"><label className="label">Abstract</label><span className={clsx("mb-1.5 text-xs font-semibold", words > LIMIT ? "text-bad" : words >= 50 ? "text-ok" : "text-muted")}>{words} / {LIMIT} words</span></div>
              <textarea className="input min-h-[220px] leading-relaxed" value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} placeholder="Background · Objectives · Methods · Results · Conclusions" />
            </div>
            <label className="flex items-start gap-3 text-[13px] text-muted md:col-span-2">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-teal" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} />
              All authors agree to this submission, patient data are anonymised, and the abstract may be published in the congress book if accepted.
            </label>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-line bg-mist/60 px-6 py-4">
            <span className="text-xs text-muted">Minimum 50 words. You’ll receive an email confirmation.</span>
            <button className="btn btn-primary" disabled={!valid}><Send className="h-4 w-4" /> Submit abstract</button>
          </div>
        </form>
      )}

      <div className="card">
        {mine.length === 0 ? (
          <Empty icon={FileText} title="No abstracts yet" sub="Your submissions and the committee’s decisions will appear here." />
        ) : (
          <ul className="divide-y divide-line">
            {mine.map((a) => {
              const stages = ["Submitted", "Under review", "Decision"];
              const at = a.status === "Submitted" ? 0 : a.status === "Under review" ? 1 : 2;
              return (
                <li key={a.id} className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs text-muted">{a.id} · {a.track} · {a.presentation} · submitted {fmtDate(a.submittedAt)}</div>
                      <div className="mt-1 text-[17px] font-semibold text-navy">{a.title}</div>
                    </div>
                    <Pill tone={absTone(a.status)}>{a.status}</Pill>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    {stages.map((s, i) => (
                      <div key={s} className="flex flex-1 items-center gap-2">
                        <span className={clsx("flex items-center gap-1.5 text-xs font-semibold", i <= at ? "text-teal" : "text-muted")}>{i <= at ? <CheckCircle2 className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border-2 border-line" />}{s}</span>
                        {i < stages.length - 1 && <span className={clsx("h-0.5 flex-1 rounded", i < at ? "bg-teal" : "bg-line")} />}
                      </div>
                    ))}
                  </div>
                  {a.decisionNote && <p className="mt-4 rounded-xl bg-mist p-3 text-[13px] text-ink/80"><b>Committee note:</b> {a.decisionNote}</p>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
