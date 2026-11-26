import { useEffect, useState } from "react";
import clsx from "clsx";
import { Check, Download, FileQuestion, LayoutGrid, List, RotateCcw, Star, X } from "lucide-react";
import { useStore } from "../../data/store";
import { flag } from "../../data/seed";
import { downloadXlsx, fmtDate } from "../../lib";
import { Drawer, Pill, Segmented, SectionHead } from "../../ui/ui";
import { absTone } from "../delegate/Abstracts";
import type { Abstract, AbstractStatus } from "../../data/types";

const COLS: AbstractStatus[] = ["Submitted", "Under review", "Accepted", "Revisions requested", "Rejected"];
const DOT: Record<AbstractStatus, string> = { Submitted: "bg-c1", "Under review": "bg-c5", Accepted: "bg-ok", "Revisions requested": "bg-warn", Rejected: "bg-bad" };

export default function Abstracts() {
  const { abstracts, updateAbstract, notify } = useStore();
  const [mode, setMode] = useState<"board" | "list">("board");
  const [track, setTrack] = useState("All tracks");
  const [openId, setOpenId] = useState<string | null>(null);
  const tracks = ["All tracks", ...Array.from(new Set(abstracts.map((a) => a.track)))];
  const list = abstracts.filter((a) => track === "All tracks" || a.track === track);
  const open = abstracts.find((a) => a.id === openId) ?? null;

  return (
    <div className="space-y-6">
      <SectionHead title="Abstracts" sub="Every submission from the participant portal lands here for the scientific committee."
        actions={<>
          <select value={track} onChange={(e) => setTrack(e.target.value)} className="input !w-auto !py-2">{tracks.map((t) => <option key={t}>{t}</option>)}</select>
          <Segmented value={mode} onChange={setMode} options={[{ value: "board", label: <LayoutGrid className="h-4 w-4" /> }, { value: "list", label: <List className="h-4 w-4" /> }]} />
          <button onClick={() => { downloadXlsx("abstracts.xlsx", { Abstracts: list.map((a) => ({ ID: a.id, Title: a.title, Author: a.author, "Co-authors": a.coAuthors, Affiliation: a.affiliation, Country: a.country, Track: a.track, Presentation: a.presentation, Status: a.status, Score: a.score ?? "", Reviewer: a.reviewer ?? "", Submitted: fmtDate(a.submittedAt), Abstract: a.body })) }); notify("Abstracts exported"); }} className="btn btn-ghost"><Download className="h-4 w-4" /> Excel</button>
        </>} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {COLS.map((c) => (
          <div key={c} className="card px-4 py-3"><div className="flex items-center gap-2 text-xs text-muted"><span className={clsx("h-2 w-2 rounded-full", DOT[c])} />{c}</div><div className="mt-1 text-2xl font-semibold text-navy">{list.filter((a) => a.status === c).length}</div></div>
        ))}
      </div>

      {mode === "board" ? (
        <div className="scroll-thin -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {COLS.map((c) => (
            <div key={c} className="w-[290px] shrink-0 rounded-2xl bg-white/60 p-3 ring-1 ring-line">
              <div className="flex items-center gap-2 px-1 pb-3 text-[13px] font-semibold text-navy"><span className={clsx("h-2 w-2 rounded-full", DOT[c])} />{c}<span className="ml-auto rounded-full bg-mist px-2 text-[11px] text-muted">{list.filter((a) => a.status === c).length}</span></div>
              <div className="space-y-2.5">
                {list.filter((a) => a.status === c).map((a) => (
                  <button key={a.id} onClick={() => setOpenId(a.id)} className="card block w-full p-3.5 text-left transition hover:-translate-y-0.5 hover:border-teal/40">
                    <div className="flex items-center justify-between text-[11px] text-muted"><span>{a.id}</span>{a.score && <span className="flex items-center gap-0.5 font-semibold text-[#8a6a1f]"><Star className="h-3 w-3 fill-gold text-gold" />{a.score}</span>}</div>
                    <div className="mt-1.5 line-clamp-3 text-[13px] font-semibold leading-snug text-navy">{a.title}</div>
                    <div className="mt-2.5 flex items-center justify-between gap-2 text-[11.5px] text-muted"><span className="truncate">{flag(a.country)} {a.author}</span><Pill className="!px-2 !text-[10.5px]">{a.presentation}</Pill></div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card scroll-thin overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-[13px]">
            <thead className="bg-mist/70 text-[11.5px] uppercase tracking-wide text-muted"><tr><th className="px-4 py-3 font-semibold">Abstract</th><th className="px-3 py-3 font-semibold">Track</th><th className="px-3 py-3 font-semibold">Score</th><th className="px-3 py-3 font-semibold">Status</th><th className="px-3 py-3 font-semibold">Submitted</th></tr></thead>
            <tbody className="divide-y divide-line">
              {list.map((a) => (
                <tr key={a.id} onClick={() => setOpenId(a.id)} className="cursor-pointer hover:bg-teal/[.04]">
                  <td className="px-4 py-3"><div className="max-w-md truncate font-semibold text-navy">{a.title}</div><div className="text-[11.5px] text-muted">{a.id} · {flag(a.country)} {a.author}</div></td>
                  <td className="px-3 py-3 text-ink/80">{a.track}</td><td className="px-3 py-3 font-semibold text-navy">{a.score ?? "—"}</td>
                  <td className="px-3 py-3"><Pill tone={absTone(a.status)}>{a.status}</Pill></td><td className="px-3 py-3 text-muted">{fmtDate(a.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Drawer open={!!open} onClose={() => setOpenId(null)} title={open?.id} width="max-w-2xl">
        {open && <Review a={open} onDecide={(status, note, score) => { updateAbstract(open.id, { status, decisionNote: note || undefined, score, reviewer: "Secretariat (Super admin)" }, `Abstract ${status.toLowerCase()}`); notify(status === "Under review" ? "Moved to review" : `Decision saved · author notified by email`); }} />}
      </Drawer>
    </div>
  );
}

function Review({ a, onDecide }: { a: Abstract; onDecide: (s: AbstractStatus, note: string, score?: number) => void }) {
  const crit = ["Originality", "Methods", "Relevance to Africa", "Clarity"];
  const [scores, setScores] = useState<number[]>([7, 7, 7, 7]);
  const [note, setNote] = useState("");
  useEffect(() => { setScores([7, 7, 7, 7]); setNote(a.decisionNote ?? ""); }, [a.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const avg = Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 10) / 10;
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex flex-wrap items-center gap-2"><Pill tone={absTone(a.status)}>{a.status}</Pill><Pill>{a.track}</Pill><Pill>{a.presentation}</Pill></div>
        <h2 className="mt-3 text-xl font-semibold leading-snug text-navy">{a.title}</h2>
        <div className="mt-2 text-[13px] text-muted">{a.author}{a.coAuthors && `, ${a.coAuthors}`}</div>
        <div className="text-[13px] text-muted">{a.affiliation} · {flag(a.country)} {a.country} · submitted {fmtDate(a.submittedAt)}</div>
      </div>
      <div className="rounded-2xl bg-mist p-5 text-[14px] leading-relaxed text-ink/85">{a.body}</div>
      <div className="card p-5">
        <div className="flex items-center justify-between"><div className="font-semibold text-navy">Score</div><div className="flex items-center gap-1 text-2xl font-semibold text-navy"><Star className="h-5 w-5 fill-gold text-gold" />{avg}</div></div>
        <div className="mt-4 space-y-4">
          {crit.map((c, i) => (
            <div key={c}>
              <div className="flex justify-between text-[13px]"><span className="text-ink/80">{c}</span><span className="font-semibold text-navy">{scores[i]}/10</span></div>
              <input type="range" min={1} max={10} value={scores[i]} onChange={(e) => setScores(scores.map((s, j) => (j === i ? +e.target.value : s)))} className="mt-1.5 w-full accent-teal" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="label">Note to the author (included in the decision email)</label>
        <textarea className="input min-h-[90px]" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={() => onDecide("Under review", note)} className="btn btn-ghost"><FileQuestion className="h-4 w-4" /> To review</button>
        <button onClick={() => onDecide("Revisions requested", note, avg)} className="btn btn-ghost !text-warn"><RotateCcw className="h-4 w-4" /> Revisions</button>
        <button onClick={() => onDecide("Rejected", note, avg)} className="btn btn-ghost !text-bad"><X className="h-4 w-4" /> Reject</button>
        <button onClick={() => onDecide("Accepted", note, avg)} className="btn btn-primary"><Check className="h-4 w-4" /> Accept</button>
      </div>
    </div>
  );
}
