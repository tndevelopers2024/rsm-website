import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowRight, Award, BedDouble, CalendarDays, Check, CreditCard, Download, LifeBuoy, Lock, Mail, MapPin, MessageCircle, QrCode, ScrollText, Ticket, Utensils, Medal } from "lucide-react";
import { useStore } from "../../data/store";
import { DAY_LONG } from "../../data/seed";
import { cpd, daysLabel, fmtDate, fmtDateTime, fmtTime, priceLabel, qrPayload } from "../../lib";
import { Pill, QR, StatusPill } from "../../ui/ui";
import { useMe } from "./Layout";
import type { DayKey } from "../../data/types";

const START = new Date("2027-05-07T08:00:00+04:00");

function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, START.getTime() - now);
  return { days: Math.floor(d / 864e5), hours: Math.floor((d / 36e5) % 24), mins: Math.floor((d / 6e4) % 60), secs: Math.floor((d / 1e3) % 60) };
}

export default function DelegateHome() {
  const me = useMe();
  const { abstracts, messages, settings } = useStore();
  const cd = useCountdown();
  const myAbs = abstracts.filter((a) => a.regId === me.id);
  const myMsgs = messages.filter((m) => m.regId === me.id).slice(0, 5);
  const attendedDays = Object.keys(me.attendance).length;
  const certReady = attendedDays >= settings.certificateMinDays;
  const paid = me.status === "paid";

  const steps = [
    { label: "Registered", sub: fmtDate(me.registeredAt), done: true, icon: Ticket },
    { label: "Payment confirmed", sub: paid ? fmtDate(me.paidAt) : "Awaiting payment", done: paid, icon: CreditCard },
    { label: "QR badge ready", sub: paid ? "Show it at check-in" : "After payment", done: paid, icon: QrCode },
    { label: "Attend the congress", sub: attendedDays ? `${attendedDays} of ${me.days.length} days checked in` : "7–9 May 2027", done: attendedDays > 0, icon: CalendarDays },
    { label: "e-Certificate", sub: certReady ? "Ready to download" : "Unlocks after attendance", done: certReady, icon: Award },
  ];
  const current = steps.findIndex((s) => !s.done);

  return (
    <div className="space-y-6">
      {/* hero */}
      <section className="grain relative isolate overflow-hidden rounded-[28px] bg-navy-deep p-6 text-white md:p-10">
        <img src="./a11.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(11,32,52,.97)_30%,rgba(11,32,52,.7))]" />
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-white/10" />
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="eyebrow text-gold">7th PAFLAR Congress · Mauritius 2027</div>
            <h1 className="mt-4 text-[30px] font-light leading-tight tracking-tight md:text-[42px]">Welcome, <span className="font-serif italic text-aqua">{me.title ? `${me.title} ${me.last}` : me.first}</span>.</h1>
            <p className="mt-3 max-w-xl text-[15px] text-white/70">{paid ? "You’re all set. Your place is confirmed and your QR badge is ready." : "Your registration is saved. Complete the payment to confirm your place."}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {paid ? (
                <>
                  <Link to="/me/badge" className="btn bg-white text-navy hover:bg-aqua"><QrCode className="h-4 w-4" /> Show my QR badge</Link>
                  <Link to="/me/receipt" className="btn border border-white/25 text-white hover:bg-white/10"><Download className="h-4 w-4" /> Receipt</Link>
                </>
              ) : (
                <button className="btn btn-red"><CreditCard className="h-4 w-4" /> Complete payment</button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {[[cd.days, "Days"], [cd.hours, "Hours"], [cd.mins, "Mins"], [cd.secs, "Secs"]].map(([v, l]) => (
              <div key={l as string} className="min-w-[64px] rounded-2xl border border-white/10 bg-white/[.07] px-3 py-3 text-center backdrop-blur sm:min-w-[76px]">
                <div className="text-2xl font-semibold tabular-nums sm:text-3xl">{String(v).padStart(2, "0")}</div>
                <div className="font-cond text-[10px] uppercase tracking-[0.2em] text-white/55">{l as string}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* journey */}
      <section className="card p-5 md:p-7">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-navy">Your congress journey</h2>
          <StatusPill status={me.status} />
        </div>
        <ol className="mt-6 grid gap-4 md:grid-cols-5 md:gap-0">
          {steps.map((s, i) => (
            <li key={s.label} className="relative flex gap-3 md:flex-col md:items-center md:text-center">
              {i < steps.length - 1 && <span className={clsx("absolute left-[19px] top-10 h-[calc(100%-8px)] w-0.5 md:left-[calc(50%+24px)] md:top-5 md:h-0.5 md:w-[calc(100%-48px)]", s.done ? "bg-teal" : "bg-line")} />}
              <span className={clsx("relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ring-4 ring-white transition", s.done ? "bg-teal text-white" : i === current ? "bg-white text-teal ring-teal/20 border-2 border-teal" : "bg-mist text-muted")}>
                {s.done ? <Check className="h-5 w-5" /> : <s.icon className="h-[18px] w-[18px]" />}
              </span>
              <div className="md:mt-3">
                <div className={clsx("text-sm font-semibold", s.done || i === current ? "text-navy" : "text-muted")}>{s.label}</div>
                <div className="text-xs text-muted">{s.sub}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* registration */}
        <section className="card p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="eyebrow text-teal">My registration</div>
              <h2 className="mt-2 text-xl font-semibold text-navy">{me.category} · {daysLabel(me)}</h2>
            </div>
            <span className="rounded-xl bg-mist px-3 py-1.5 font-mono text-[13px] font-semibold text-navy">{me.id}</span>
          </div>
          <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {[
              [CreditCard, "Amount paid", priceLabel(me)],
              [Medal, "CPD points", `${cpd(me)} points`],
              [BedDouble, "Hotel room", me.hotel ? "Requested at the Hilton" : "Not requested"],
              [Utensils, "Dietary", me.dietary],
              [MapPin, "Workplace", me.workplace],
              [Mail, "Email", me.email],
            ].map(([I, k, v]) => {
              const Icon = I as typeof Mail;
              return (
                <div key={k as string} className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mist text-teal"><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0"><dt className="text-xs text-muted">{k as string}</dt><dd className="truncate text-sm font-semibold text-navy">{v as string}</dd></div>
                </div>
              );
            })}
          </dl>
          <div className="mt-7 border-t border-line pt-5">
            <div className="text-sm font-semibold text-navy">Your days</div>
            <div className="mt-3 space-y-2">
              {(["fri", "sat", "sun"] as DayKey[]).filter((d) => me.days.includes(d)).map((d) => (
                <div key={d} className="flex items-center justify-between gap-3 rounded-xl bg-mist px-4 py-3">
                  <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-teal" /><span className="text-[13.5px] text-ink">{DAY_LONG[d]}</span></div>
                  {me.attendance[d] ? <Pill tone="ok"><Check className="h-3 w-3" /> In {fmtTime(me.attendance[d])}</Pill> : <Pill>4 CPD</Pill>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QR */}
        <section className="card flex flex-col items-center p-6 text-center">
          <div className="eyebrow self-start text-teal">Check-in badge</div>
          <div className="mt-5 rounded-3xl border border-line p-4 shadow-[0_20px_40px_-28px_rgba(15,42,68,.5)]">
            {paid ? <QR value={qrPayload(me)} size={168} /> : <div className="grid h-[168px] w-[168px] place-items-center rounded-xl bg-mist"><Lock className="h-8 w-8 text-muted" /></div>}
          </div>
          <div className="mt-4 font-semibold text-navy">{me.title} {me.first} {me.last}</div>
          <div className="text-xs text-muted">{me.category}</div>
          <Link to="/me/badge" className="btn btn-ghost btn-sm mt-5">Open full badge <ArrowRight className="h-3.5 w-3.5" /></Link>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* abstracts */}
        <section className="card p-6">
          <div className="flex items-center justify-between"><div className="eyebrow text-teal">Abstracts</div><ScrollText className="h-4 w-4 text-muted" /></div>
          {myAbs.length ? (
            <ul className="mt-4 space-y-3">
              {myAbs.map((a) => (
                <li key={a.id} className="rounded-xl bg-mist p-3.5">
                  <div className="line-clamp-2 text-sm font-semibold text-navy">{a.title}</div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted"><span>{a.id} · {a.track}</span><Pill tone={a.status === "Accepted" ? "ok" : a.status === "Rejected" ? "bad" : a.status === "Revisions requested" ? "warn" : "teal"}>{a.status}</Pill></div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">Share your research or a clinical case with the congress. Deadline {fmtDate(settings.abstractDeadline)}.</p>
          )}
          <Link to="/me/abstracts" className="btn btn-primary btn-sm mt-5">{myAbs.length ? "Manage abstracts" : "Submit an abstract"} <ArrowRight className="h-3.5 w-3.5" /></Link>
        </section>

        {/* certificate */}
        <section className="card relative overflow-hidden p-6">
          <div className="flex items-center justify-between"><div className="eyebrow text-teal">e-Certificate</div><Award className="h-4 w-4 text-muted" /></div>
          <div className={clsx("mt-4 rounded-2xl border p-5 text-center", certReady ? "border-gold/50 bg-gold-soft/40" : "border-dashed border-line bg-mist/60")}>
            {certReady ? <Award className="mx-auto h-9 w-9 text-gold" /> : <Lock className="mx-auto h-8 w-8 text-muted" />}
            <div className="mt-3 text-sm font-semibold text-navy">{certReady ? "Your certificate is ready" : "Unlocks after you attend"}</div>
            <div className="mt-1 text-xs text-muted">{certReady ? `${attendedDays * 4} CPD points recorded` : "Scan your QR badge at check-in on each day you attend."}</div>
          </div>
          <Link to="/me/certificate" className="btn btn-ghost btn-sm mt-5">View certificate <ArrowRight className="h-3.5 w-3.5" /></Link>
        </section>

        {/* messages */}
        <section className="card p-6">
          <div className="flex items-center justify-between"><div className="eyebrow text-teal">Messages sent to you</div><MessageCircle className="h-4 w-4 text-muted" /></div>
          <ul className="mt-4 space-y-3">
            {myMsgs.map((m) => (
              <li key={m.id} className="flex items-start gap-3">
                <span className={clsx("grid h-8 w-8 shrink-0 place-items-center rounded-full", m.channel === "WhatsApp" ? "bg-[#25D366]/12 text-[#128C7E]" : "bg-c2/10 text-c2")}>{m.channel === "WhatsApp" ? <MessageCircle className="h-4 w-4" /> : <Mail className="h-4 w-4" />}</span>
                <div className="min-w-0"><div className="truncate text-[13px] font-semibold text-navy">{m.template}</div><div className="text-[11.5px] text-muted">{m.channel} · {fmtDateTime(m.at)} · {m.status}</div></div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-mist p-3.5 text-[12.5px] text-muted">
            <LifeBuoy className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            <span>Need help? Write to the PAFLAR Secretariat at <a href="mailto:paflar2020@gmail.com" className="font-semibold text-teal">paflar2020@gmail.com</a></span>
          </div>
        </section>
      </div>
    </div>
  );
}
