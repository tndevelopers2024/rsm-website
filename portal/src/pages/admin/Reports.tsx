import { BedDouble, CalendarCheck, CreditCard, FileSpreadsheet, Globe2, Medal, MessagesSquare, ScrollText, Users, Utensils, Download, type LucideIcon } from "lucide-react";
import { useStore } from "../../data/store";
import { DAY_LABEL } from "../../data/seed";
import { cpd, downloadXlsx, fmtDate, fmtDateTime, fmtTime, regRow } from "../../lib";
import { SectionHead } from "../../ui/ui";
import type { DayKey } from "../../data/types";

export default function Reports() {
  const { regs, abstracts, messages, notify, log } = useStore();
  const paid = regs.filter((r) => r.status === "paid");
  const name = (r: (typeof regs)[number]) => `${r.title} ${r.first} ${r.last}`;

  const reports: { key: string; title: string; desc: string; icon: LucideIcon; rows: () => Record<string, Record<string, unknown>[]> }[] = [
    { key: "all", title: "All registrations", desc: "Every field captured on the website, one row per participant.", icon: Users, rows: () => ({ Registrations: regs.map(regRow) }) },
    { key: "pay", title: "Payments & reconciliation", desc: "Amounts, references and status for Finance.", icon: CreditCard, rows: () => ({ Payments: regs.map((r) => ({ ID: r.id, Name: name(r), "Amount (MUR)": r.amount, "Amount (USD)": r.usd ?? "", Status: r.status, Method: r.method, Reference: r.txn ?? "", "Paid at": r.paidAt ? fmtDateTime(r.paidAt) : "" })) }) },
    { key: "att", title: "Day-wise attendance", desc: "Expected vs checked in, one sheet per day.", icon: CalendarCheck, rows: () => Object.fromEntries((["fri", "sat", "sun"] as DayKey[]).map((d) => [DAY_LABEL[d], paid.filter((r) => r.days.includes(d)).map((r) => ({ ID: r.id, Name: name(r), Country: r.country, Category: r.category, "Checked in": r.attendance[d] ? fmtTime(r.attendance[d]) : "No" }))])) },
    { key: "abs", title: "Abstracts", desc: "Submissions, tracks, scores and decisions.", icon: ScrollText, rows: () => ({ Abstracts: abstracts.map((a) => ({ ID: a.id, Title: a.title, Author: a.author, Country: a.country, Track: a.track, Presentation: a.presentation, Status: a.status, Score: a.score ?? "", Submitted: fmtDate(a.submittedAt) })) }) },
    { key: "diet", title: "Catering & dietary", desc: "Meal counts per day by dietary requirement.", icon: Utensils, rows: () => ({ Summary: (["fri", "sat", "sun"] as DayKey[]).map((d) => { const day = paid.filter((r) => r.days.includes(d)); const by = day.reduce<Record<string, number>>((m, r) => ((m[r.dietary] = (m[r.dietary] ?? 0) + 1), m), {}); return { Day: DAY_LABEL[d], Total: day.length, ...by }; }), Participants: paid.map((r) => ({ ID: r.id, Name: name(r), Dietary: r.dietary, Days: r.days.join(", ") })) }) },
    { key: "hotel", title: "Hotel rooms", desc: "Participants who asked to book at the Hilton.", icon: BedDouble, rows: () => ({ Hotel: paid.filter((r) => r.hotel).map((r) => ({ ID: r.id, Name: name(r), Country: r.country, Email: r.email, Phone: r.phone })) }) },
    { key: "country", title: "Country summary", desc: "Registrations and revenue by country.", icon: Globe2, rows: () => ({ Countries: Object.entries(regs.reduce<Record<string, { n: number; paid: number; mur: number }>>((m, r) => { const c = (m[r.country] ??= { n: 0, paid: 0, mur: 0 }); c.n++; if (r.status === "paid") { c.paid++; c.mur += r.amount; } return m; }, {})).sort((a, b) => b[1].n - a[1].n).map(([c, v]) => ({ Country: c, Registrations: v.n, Paid: v.paid, "Revenue (MUR)": v.mur })) }) },
    { key: "cpd", title: "CPD points", desc: "Points per participant for the Medical Council.", icon: Medal, rows: () => ({ CPD: paid.map((r) => ({ ID: r.id, Name: name(r), "Medical Council no.": r.mcr, "Days registered": r.days.length, "Days attended": Object.keys(r.attendance).length, "CPD points (attended)": Object.keys(r.attendance).length * 4, "CPD points (max)": cpd(r) })) }) },
    { key: "msg", title: "Message log", desc: "Every email and WhatsApp sent, with status.", icon: MessagesSquare, rows: () => ({ Messages: messages.map((m) => ({ Channel: m.channel, Message: m.template, To: m.to, Status: m.status, Sent: fmtDateTime(m.at), "Registration ID": m.regId ?? "" })) }) },
  ];

  const dl = (r: (typeof reports)[number]) => { downloadXlsx(`PAFLAR2027-${r.key}.xlsx`, r.rows()); log("Exported report", r.title); notify(`${r.title} downloaded`); };

  return (
    <div className="space-y-6">
      <SectionHead title="Excel reports" sub="Download up-to-the-minute reports. Each export is recorded in the audit log."
        actions={<button onClick={() => { downloadXlsx("PAFLAR2027-full-workbook.xlsx", Object.assign({}, ...reports.map((r) => r.rows()))); log("Exported report", "Full workbook"); notify("Full workbook downloaded"); }} className="btn btn-primary"><FileSpreadsheet className="h-4 w-4" /> Full workbook</button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => {
          const sheets = r.rows();
          const n = Object.values(sheets).reduce((s, x) => s + x.length, 0);
          return (
            <div key={r.key} className="card group flex flex-col p-5 transition hover:border-teal/40">
              <div className="flex items-start justify-between"><div className="grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal"><r.icon className="h-5 w-5" /></div><span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-muted">{n} rows · {Object.keys(sheets).length} sheet{Object.keys(sheets).length > 1 ? "s" : ""}</span></div>
              <div className="mt-4 font-semibold text-navy">{r.title}</div>
              <p className="mt-1 flex-1 text-[13px] text-muted">{r.desc}</p>
              <button onClick={() => dl(r)} className="btn btn-ghost btn-sm mt-4 self-start group-hover:border-teal group-hover:text-teal"><Download className="h-3.5 w-3.5" /> Download .xlsx</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
