import { useMemo, useState } from "react";
import clsx from "clsx";
import { CheckCheck, Mail, MailOpen, MessageCircle, Send, Workflow, Zap } from "lucide-react";
import { useStore } from "../../data/store";
import { fmtDateTime } from "../../lib";
import { Pill, Segmented, SectionHead, Stat, Toggle } from "../../ui/ui";

const AUDIENCES = {
  all: { label: "All confirmed participants", f: (s: string) => s === "paid" },
  pending: { label: "Unpaid registrations", f: (s: string) => s === "pending" },
  intl: { label: "International delegates (paid)", f: (s: string, t?: string) => s === "paid" && t === "intl" },
  mu: { label: "Mauritian residents (paid)", f: (s: string, t?: string) => s === "paid" && t === "mu" },
} as const;

export default function Communications() {
  const { automations, toggleAutomation, messages, regs, send, notify, log } = useStore();
  const [tab, setTab] = useState<"auto" | "compose" | "log">("auto");
  const [aud, setAud] = useState<keyof typeof AUDIENCES>("pending");
  const [channel, setChannel] = useState<"Email" | "WhatsApp">("Email");
  const [subject, setSubject] = useState("Your PAFLAR 2027 registration is waiting");
  const [body, setBody] = useState("Dear {first_name},\n\nThank you for registering for the 7th PAFLAR Congress in Mauritius (7–9 May 2027). Your payment is still pending. The early-bird rate ends on 31 January 2027.\n\nComplete your payment securely in your participant area. Payment goes directly to the Rheumatology Society, Mauritius.\n\nWarm regards,\nRheumatology Society, Mauritius\nOrganising committee, PAFLAR 2027");
  const recipients = regs.filter((r) => AUDIENCES[aud].f(r.status, r.type));

  const stats = useMemo(() => {
    const em = messages.filter((m) => m.channel === "Email"); const wa = messages.filter((m) => m.channel === "WhatsApp");
    return { total: messages.length, open: Math.round((em.filter((m) => m.status === "Opened").length / Math.max(1, em.length)) * 100), read: Math.round((wa.filter((m) => m.status === "Read").length / Math.max(1, wa.length)) * 100), failed: messages.filter((m) => m.status === "Failed").length };
  }, [messages]);

  const sendNow = () => {
    recipients.forEach((r) => send({ regId: r.id, channel, template: channel === "Email" ? subject : "Broadcast · " + subject, to: channel === "Email" ? r.email : r.phone }));
    log(`Broadcast ${channel}`, `${AUDIENCES[aud].label} · ${recipients.length} recipients`);
    notify(`${channel} sent to ${recipients.length} participants`);
    setTab("log");
  };
  const preview = body.replace("{first_name}", "Amara");

  return (
    <div className="space-y-6">
      <SectionHead title="Email & WhatsApp" sub="Automatic confirmations and reminders, plus one-off broadcasts. Everything sent is logged against the participant." actions={<Segmented value={tab} onChange={setTab} options={[{ value: "auto", label: "Automations" }, { value: "compose", label: "New broadcast" }, { value: "log", label: "Message log" }]} />} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Send} label="Messages sent" value={stats.total} sub="Email and WhatsApp" />
        <Stat icon={MailOpen} tone="gold" label="Email open rate" value={`${stats.open}%`} sub="Across all templates" />
        <Stat icon={CheckCheck} tone="navy" label="WhatsApp read rate" value={`${stats.read}%`} sub="Blue ticks" />
        <Stat icon={Zap} tone="crimson" label="Failed" value={stats.failed} sub="Retried automatically once" />
      </div>

      {tab === "auto" && (
        <div className="card divide-y divide-line">
          {automations.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center gap-4 p-5">
              <div className={clsx("grid h-11 w-11 place-items-center rounded-xl", a.enabled ? "bg-teal/10 text-teal" : "bg-mist text-muted")}><Workflow className="h-5 w-5" /></div>
              <div className="min-w-[220px] flex-1">
                <div className="font-semibold text-navy">{a.name}</div>
                <div className="text-[13px] text-muted">{a.trigger}</div>
              </div>
              <div className="flex gap-1.5">{a.channels.map((c) => <Pill key={c} tone={c === "WhatsApp" ? "ok" : "teal"}>{c === "WhatsApp" ? <MessageCircle className="h-3 w-3" /> : <Mail className="h-3 w-3" />}{c}</Pill>)}</div>
              <div className="w-20 text-right text-[13px]"><div className="font-semibold text-navy">{a.sent}</div><div className="text-[11px] text-muted">sent</div></div>
              <Toggle on={a.enabled} onChange={() => { toggleAutomation(a.id); notify(`${a.name} ${a.enabled ? "paused" : "switched on"}`); }} label={a.name} />
            </div>
          ))}
        </div>
      )}

      {tab === "compose" && (
        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <div className="card p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label className="label">Audience</label><select className="input" value={aud} onChange={(e) => setAud(e.target.value as keyof typeof AUDIENCES)}>{Object.entries(AUDIENCES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select><p className="mt-1.5 text-xs text-muted">{recipients.length} recipients · only participants who allow {channel === "Email" ? "email" : "WhatsApp"} messages</p></div>
              <div><label className="label">Channel</label><div className="grid grid-cols-2 gap-2">{(["Email", "WhatsApp"] as const).map((c) => <button key={c} onClick={() => setChannel(c)} className={clsx("flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold", channel === c ? "border-teal bg-teal/5 text-teal" : "border-line text-muted")}>{c === "Email" ? <Mail className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}{c}</button>)}</div></div>
              <div className="sm:col-span-2"><label className="label">{channel === "Email" ? "Subject" : "Title"}</label><input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
              <div className="sm:col-span-2"><label className="label">Message <span className="font-normal text-muted">· use {"{first_name}"} to personalise</span></label><textarea className="input min-h-[220px] leading-relaxed" value={body} onChange={(e) => setBody(e.target.value)} /></div>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button onClick={() => notify("Test sent to secretariat@rheumatologysociety.org")} className="btn btn-ghost">Send me a test</button>
              <button onClick={sendNow} disabled={!recipients.length} className="btn btn-primary"><Send className="h-4 w-4" /> Send to {recipients.length}</button>
            </div>
          </div>
          <div className="card p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">Preview</div>
            {channel === "Email" ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-line">
                <div className="bg-white px-5 py-4"><img src="./rsm-logo-full.png" alt="" className="h-9" /></div>
                <div className="flex h-1"><i className="flex-1 bg-[#e42320]" /><i className="flex-1 bg-[#142d46]" /><i className="flex-1 bg-[#f6c400]" /><i className="flex-1 bg-[#5bb431]" /></div>
                <div className="p-5"><div className="font-semibold text-navy">{subject}</div><p className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-ink/80">{preview}</p><div className="mt-4 inline-block rounded-full bg-teal px-4 py-2 text-xs font-semibold text-white">Open my participant area</div></div>
              </div>
            ) : (
              <div className="mx-auto mt-4 w-[260px] rounded-[34px] bg-navy-deep p-2.5 shadow-xl">
                <div className="overflow-hidden rounded-[26px] bg-[#e5ddd5]">
                  <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2.5 text-white"><div className="h-7 w-7 rounded-full bg-white p-0.5"><img src="./rsm-mark.png" alt="" className="h-full w-full rounded-full object-contain" /></div><div className="text-[12px] font-semibold leading-tight">Rheumatology Society<br /><span className="font-normal opacity-75">Mauritius · Business account</span></div></div>
                  <div className="min-h-[300px] p-3"><div className="ml-auto max-w-[92%] rounded-xl rounded-tr-sm bg-white p-2.5 text-[11.5px] leading-snug text-ink shadow-sm"><b>{subject}</b><p className="mt-1 whitespace-pre-line">{preview}</p><div className="mt-1 text-right text-[9.5px] text-muted">18:30 ✓✓</div></div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "log" && (
        <div className="card scroll-thin overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead className="bg-mist/70 text-[11.5px] uppercase tracking-wide text-muted"><tr><th className="px-4 py-3 font-semibold">Channel</th><th className="px-3 py-3 font-semibold">Message</th><th className="px-3 py-3 font-semibold">To</th><th className="px-3 py-3 font-semibold">Status</th><th className="px-3 py-3 font-semibold">Sent</th></tr></thead>
            <tbody className="divide-y divide-line">
              {messages.slice(0, 60).map((m) => (
                <tr key={m.id} className="hover:bg-mist/50">
                  <td className="px-4 py-3"><Pill tone={m.channel === "WhatsApp" ? "ok" : "teal"}>{m.channel === "WhatsApp" ? <MessageCircle className="h-3 w-3" /> : <Mail className="h-3 w-3" />}{m.channel}</Pill></td>
                  <td className="px-3 py-3 font-semibold text-navy">{m.template}</td><td className="px-3 py-3 text-muted">{m.to}</td>
                  <td className="px-3 py-3"><Pill tone={m.status === "Failed" ? "bad" : m.status === "Read" || m.status === "Opened" ? "ok" : "slate"}>{m.status}</Pill></td>
                  <td className="whitespace-nowrap px-3 py-3 text-muted">{fmtDateTime(m.at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
