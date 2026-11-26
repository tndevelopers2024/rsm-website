import { useState } from "react";
import clsx from "clsx";
import { Check, DatabaseBackup, Fingerprint, Globe, KeyRound, Lock, RefreshCcw, Save, ScrollText, ServerCog, ShieldCheck, Timer, UserPlus, X } from "lucide-react";
import { useStore } from "../../data/store";
import { Pill, Segmented, SectionHead, Toggle } from "../../ui/ui";

const TEAM = [
  { name: "Secretariat", email: "secretariat@rheumatologysociety.org", role: "Super admin", last: "Now", twofa: true },
  { name: "Finance office", email: "finance@rheumatologysociety.org", role: "Finance", last: "2 h ago", twofa: true },
  { name: "Scientific committee · Reviewer A", email: "reviewer.a@rheumatologysociety.org", role: "Reviewer", last: "Yesterday", twofa: true },
  { name: "Front desk volunteer", email: "desk1@rheumatologysociety.org", role: "Check-in only", last: "Invited", twofa: false },
];
const PERMS = ["View registrations", "Edit registrations", "Payments & refunds", "Review abstracts", "QR check-in", "Send messages", "Export reports", "Settings & users"];
const MATRIX: Record<string, boolean[]> = {
  "Super admin": [true, true, true, true, true, true, true, true],
  Finance: [true, false, true, false, false, false, true, false],
  Reviewer: [false, false, false, true, false, false, false, false],
  "Check-in only": [false, false, false, false, true, false, false, false],
};

export default function SettingsPage() {
  const { settings, updateSettings, notify, reset } = useStore();
  const [tab, setTab] = useState<"event" | "team" | "security">("event");
  const [f, setF] = useState(settings);
  const dirty = JSON.stringify(f) !== JSON.stringify(settings);

  return (
    <div className="space-y-6">
      <SectionHead title="Settings & security" sub="Change fees, dates and access from here. The website updates automatically." actions={<Segmented value={tab} onChange={setTab} options={[{ value: "event", label: "Event & fees" }, { value: "team", label: "Team & roles" }, { value: "security", label: "Security" }]} />} />

      {tab === "event" && (
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="card">
            <div className="border-b border-line px-6 py-4 font-semibold text-navy">Registration & fees</div>
            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div><label className="label">Early-bird ends</label><input type="date" className="input" value={f.earlyBirdEnds} onChange={(e) => setF({ ...f, earlyBirdEnds: e.target.value })} /></div>
              <div><label className="label">Mauritian residents · per day (MUR)</label><input type="number" className="input" value={f.localDayFee} onChange={(e) => setF({ ...f, localDayFee: +e.target.value })} /></div>
              <div><label className="label">International delegate · early bird (USD)</label><input type="number" className="input" value={f.intlFee} onChange={(e) => setF({ ...f, intlFee: +e.target.value })} /></div>
              <div><label className="label">PAFLAR member / allied · early bird (USD)</label><input type="number" className="input" value={f.memberFee} onChange={(e) => setF({ ...f, memberFee: +e.target.value })} /></div>
              <div><label className="label">Abstract deadline</label><input type="date" className="input" value={f.abstractDeadline} onChange={(e) => setF({ ...f, abstractDeadline: e.target.value })} /></div>
              <div className="space-y-3 sm:pt-6">
                <div className="flex items-center justify-between"><span className="text-sm font-semibold text-navy">Registration open</span><Toggle on={f.registrationOpen} onChange={() => setF({ ...f, registrationOpen: !f.registrationOpen })} label="Registration open" /></div>
                <div className="flex items-center justify-between"><span className="text-sm font-semibold text-navy">Abstract submission open</span><Toggle on={f.abstractsOpen} onChange={() => setF({ ...f, abstractsOpen: !f.abstractsOpen })} label="Abstracts open" /></div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-line bg-mist/60 px-6 py-4">
              <span className="text-xs text-muted">Changes apply to new registrations only. Existing receipts are never altered.</span>
              <button disabled={!dirty} onClick={() => { updateSettings(f); notify("Settings saved · website updated"); }} className="btn btn-primary"><Save className="h-4 w-4" /> Save</button>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2 font-semibold text-navy"><DatabaseBackup className="h-4 w-4 text-teal" /> Demo data</div>
            <p className="mt-2 text-[13px] text-muted">This prototype keeps changes in your browser. Reset to start the walkthrough again.</p>
            <button onClick={() => { reset(); setF(settings); }} className="btn btn-ghost btn-sm mt-4"><RefreshCcw className="h-3.5 w-3.5" /> Reset demo data</button>
          </div>
        </div>
      )}

      {tab === "team" && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between border-b border-line px-6 py-4"><div className="font-semibold text-navy">Team members</div><button onClick={() => notify("Invitation sent · the new user must set up 2-step verification")} className="btn btn-primary btn-sm"><UserPlus className="h-3.5 w-3.5" /> Invite</button></div>
            <ul className="divide-y divide-line">
              {TEAM.map((u) => (
                <li key={u.email} className="flex flex-wrap items-center gap-4 px-6 py-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-navy text-[13px] font-bold text-white">{u.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                  <div className="min-w-[200px] flex-1"><div className="font-semibold text-navy">{u.name}</div><div className="text-[12.5px] text-muted">{u.email}</div></div>
                  <Pill tone={u.role === "Super admin" ? "navy" : "slate"}>{u.role}</Pill>
                  <Pill tone={u.twofa ? "ok" : "warn"}>{u.twofa ? "2FA on" : "2FA pending"}</Pill>
                  <span className="w-20 text-right text-xs text-muted">{u.last}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card scroll-thin overflow-x-auto">
            <div className="border-b border-line px-6 py-4 font-semibold text-navy">What each role can do</div>
            <table className="w-full min-w-[720px] text-[13px]">
              <thead><tr className="text-left text-[11.5px] uppercase tracking-wide text-muted"><th className="px-6 py-3 font-semibold">Permission</th>{Object.keys(MATRIX).map((r) => <th key={r} className="px-3 py-3 text-center font-semibold">{r}</th>)}</tr></thead>
              <tbody className="divide-y divide-line">
                {PERMS.map((p, i) => (
                  <tr key={p}><td className="px-6 py-3 text-ink/85">{p}</td>{Object.values(MATRIX).map((m, j) => <td key={j} className="px-3 py-3 text-center">{m[i] ? <Check className="mx-auto h-4 w-4 text-ok" /> : <X className="mx-auto h-4 w-4 text-muted/40" />}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            [Fingerprint, "Two-step verification", "Required for every staff account; optional for participants.", true],
            [Lock, "Encryption", "HTTPS everywhere (TLS 1.2+). Data encrypted at rest; passwords hashed, never stored.", true],
            [KeyRound, "Role-based access", "Each person sees only what their role needs. Card numbers never reach our servers.", true],
            [ScrollText, "Append-only audit log", "Every sign-in, edit, export and message is recorded with time, user and IP.", true],
            [Timer, "Session protection", "Staff sessions end after 15 minutes idle; 5 failed sign-ins lock the account.", true],
            [ShieldCheck, "Signed QR badges", "Badge codes are signed, so a copied or edited code is rejected at the desk.", true],
            [Globe, "Bot & abuse protection", "Rate limits and invisible bot checks on registration, login and abstract forms.", true],
            [DatabaseBackup, "Daily backups", "Encrypted backups kept for 30 days, with a tested restore.", true],
            [ServerCog, "Data protection", "Consent recorded at registration; aligned with the Mauritius Data Protection Act 2017.", true],
          ].map(([I, t, s]) => {
            const Icon = I as typeof Lock;
            return (
              <div key={t as string} className="card p-5">
                <div className="flex items-start justify-between"><div className="grid h-10 w-10 place-items-center rounded-xl bg-teal/10 text-teal"><Icon className="h-5 w-5" /></div><span className={clsx("rounded-full px-2 py-0.5 text-[11px] font-semibold", "bg-gold-soft text-[#8a6a1f]")}>Phase 2 build</span></div>
                <div className="mt-4 font-semibold text-navy">{t as string}</div>
                <p className="mt-1 text-[13px] text-muted">{s as string}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
