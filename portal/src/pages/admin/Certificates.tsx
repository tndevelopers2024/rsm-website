import { Award, BadgeCheck, CalendarCheck, Download, Send, Users } from "lucide-react";
import { useStore } from "../../data/store";
import { flag } from "../../data/seed";
import { downloadXlsx, fmtDate, qrPayload } from "../../lib";
import { Empty, Pill, SectionHead, Stat } from "../../ui/ui";
import { CertificateArt } from "../delegate/Certificate";

export default function Certificates() {
  const { regs, settings, updateSettings, simulateEventDays, updateReg, send, notify, log } = useStore();
  const paid = regs.filter((r) => r.status === "paid");
  const eligible = paid.filter((r) => Object.keys(r.attendance).length >= settings.certificateMinDays);
  const issued = eligible.filter((r) => r.certificateIssued);
  const toIssue = eligible.filter((r) => !r.certificateIssued);
  const sample = eligible[0] ?? paid[0];

  const issueAll = () => {
    const at = new Date().toISOString();
    toIssue.forEach((r) => { updateReg(r.id, { certificateIssued: at }, "Issued certificate"); send({ regId: r.id, channel: "Email", template: "Your PAFLAR 2027 certificate", to: r.email }); send({ regId: r.id, channel: "WhatsApp", template: "Certificate available", to: r.phone }); });
    log("Generated certificates", `${toIssue.length} participants`);
    notify(`${toIssue.length} certificates issued and sent`);
  };

  return (
    <div className="space-y-6">
      <SectionHead title="e-Certificates" sub="Generated only for participants whose attendance was recorded by QR. Each certificate carries a verification code."
        actions={<button disabled={!toIssue.length} onClick={issueAll} className="btn btn-primary"><Send className="h-4 w-4" /> Generate &amp; send {toIssue.length || ""}</button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Users} label="Confirmed participants" value={paid.length} />
        <Stat icon={CalendarCheck} tone="gold" label="Eligible (attended)" value={eligible.length} sub={`At least ${settings.certificateMinDays} day${settings.certificateMinDays > 1 ? "s" : ""} checked in`} />
        <Stat icon={BadgeCheck} tone="navy" label="Issued" value={issued.length} />
        <Stat icon={Award} tone="violet" label="CPD points awarded" value={eligible.reduce((s, r) => s + Object.keys(r.attendance).length * 4, 0)} sub="4 per day attended" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section className="card p-6">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-navy">Certificate design</h2><Pill tone="gold">Preview</Pill></div>
          <div className="mt-5">{sample && <CertificateArt r={sample} days={Math.max(1, Object.keys(sample.attendance).length || sample.days.length)} />}</div>
        </section>
        <section className="card p-6">
          <h2 className="font-semibold text-navy">Rules</h2>
          <div className="mt-4 space-y-4 text-[13px]">
            <div>
              <label className="label">Minimum days attended</label>
              <select className="input" value={settings.certificateMinDays} onChange={(e) => updateSettings({ certificateMinDays: +e.target.value })}><option value={1}>1 day</option><option value={2}>2 days</option><option value={3}>All 3 days</option></select>
            </div>
            <ul className="space-y-2 text-muted">
              <li>• CPD points = days checked in × 4</li>
              <li>• Participants download from their portal; a link is also sent by email and WhatsApp</li>
              <li>• Anyone can verify a certificate by scanning its QR code</li>
            </ul>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="flex items-center justify-between border-b border-line p-4">
          <h2 className="font-semibold text-navy">Eligible participants</h2>
          {eligible.length > 0 && <button onClick={() => downloadXlsx("certificates.xlsx", { Certificates: eligible.map((r) => ({ "Registration ID": r.id, Name: `${r.title} ${r.first} ${r.last}`, Country: r.country, "Days attended": Object.keys(r.attendance).length, "CPD points": Object.keys(r.attendance).length * 4, "Verification code": qrPayload(r).split(":")[2], Issued: r.certificateIssued ? fmtDate(r.certificateIssued) : "No" })) })} className="btn btn-ghost btn-sm"><Download className="h-3.5 w-3.5" /> Excel</button>}
        </div>
        {eligible.length === 0 ? (
          <Empty icon={CalendarCheck} title="No attendance recorded yet" sub="Certificates unlock once participants are checked in at the congress. Load the event-day demo data to see how it works." action={<button onClick={() => { simulateEventDays(); notify("Event-day check-ins loaded"); }} className="btn btn-primary">Load event-day demo data</button>} />
        ) : (
          <div className="scroll-thin max-h-[420px] overflow-auto">
            <table className="w-full min-w-[640px] text-left text-[13px]">
              <thead className="sticky top-0 bg-mist text-[11.5px] uppercase tracking-wide text-muted"><tr><th className="px-4 py-3 font-semibold">Participant</th><th className="px-3 py-3 font-semibold">Days</th><th className="px-3 py-3 font-semibold">CPD</th><th className="px-3 py-3 font-semibold">Code</th><th className="px-3 py-3 font-semibold">Status</th></tr></thead>
              <tbody className="divide-y divide-line">
                {eligible.map((r) => (
                  <tr key={r.id}><td className="px-4 py-2.5"><div className="font-semibold text-navy">{r.title} {r.first} {r.last}</div><div className="text-[11.5px] text-muted">{r.id} · {flag(r.country)} {r.country}</div></td><td className="px-3 py-2.5">{Object.keys(r.attendance).length}</td><td className="px-3 py-2.5 font-semibold">{Object.keys(r.attendance).length * 4}</td><td className="px-3 py-2.5 font-mono text-[12px] text-muted">{qrPayload(r).split(":")[2]}</td><td className="px-3 py-2.5">{r.certificateIssued ? <Pill tone="ok">Issued</Pill> : <Pill>Ready</Pill>}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
