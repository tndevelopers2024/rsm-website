import { Download, Lock, Printer } from "lucide-react";
import { DAY_LONG, flag } from "../../data/seed";
import { cpd, fmtDate, fmtDateTime, mur, qrPayload, usd } from "../../lib";
import { Empty, QR, SectionHead } from "../../ui/ui";
import { useMe } from "./Layout";

export default function DelegateReceipt() {
  const me = useMe();
  if (me.status !== "paid") return <div className="card"><Empty icon={Lock} title="Receipt available after payment" sub="Once your payment is confirmed, your official receipt appears here and is emailed to you." /></div>;
  const lines = me.type === "mu"
    ? me.days.map((d) => ({ item: DAY_LONG[d], sub: "Mauritian resident · day pass · 4 CPD points", amount: mur(4000) }))
    : [{ item: `${me.category} · 3-day pass (early-bird rate)`, sub: "Pre-congress workshops 7 May + main congress 8–9 May · 12 CPD points", amount: `${usd(me.usd!)} · ${mur(me.amount)}` }];
  return (
    <div className="space-y-6">
      <SectionHead title="Receipt" sub="Your official payment receipt for PAFLAR 2027." actions={<><button onClick={() => window.print()} className="btn btn-primary"><Download className="h-4 w-4" /> Download PDF</button><button onClick={() => window.print()} className="btn btn-ghost"><Printer className="h-4 w-4" /> Print</button></>} />
      <article className="card mx-auto max-w-3xl overflow-hidden print:shadow-none print:ring-0">
        <div className="flex h-1.5"><i className="flex-1 bg-[#e42320]" /><i className="flex-1 bg-[#142d46]" /><i className="flex-1 bg-[#f6c400]" /><i className="flex-1 bg-[#5bb431]" /></div>
        <div className="p-7 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <img src="./rsm-logo-full.png" alt="Rheumatology Society, Mauritius" className="h-12" />
            <div className="text-right">
              <div className="eyebrow text-teal">Payment receipt</div>
              <div className="mt-1 font-mono text-lg font-semibold text-navy">RCPT-{me.id.slice(6)}-27</div>
              <div className="text-xs text-muted">Issued {fmtDate(me.paidAt)}</div>
            </div>
          </div>
          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Billed to</div>
              <div className="mt-2 font-semibold text-navy">{me.title} {me.first} {me.last}</div>
              <div className="text-sm text-muted">{me.workplace}</div>
              <div className="text-sm text-muted">{flag(me.country)} {me.city}, {me.country}</div>
              <div className="text-sm text-muted">{me.email}</div>
            </div>
            <div className="sm:text-right">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Event</div>
              <div className="mt-2 font-semibold text-navy">7th PAFLAR Congress, Mauritius</div>
              <div className="text-sm text-muted">7–9 May 2027</div>
              <div className="text-sm text-muted">Registration ID {me.id}</div>
            </div>
          </div>
          <table className="mt-9 w-full text-sm">
            <thead><tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted"><th className="pb-3 font-semibold">Description</th><th className="pb-3 text-right font-semibold">Amount</th></tr></thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.item} className="border-b border-line align-top"><td className="py-4 pr-4"><div className="font-semibold text-navy">{l.item}</div><div className="text-xs text-muted">{l.sub}</div></td><td className="whitespace-nowrap py-4 text-right font-semibold text-navy">{l.amount}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <QR value={qrPayload(me)} size={86} />
              <div className="text-xs text-muted"><div>Paid by {me.method}</div><div>Reference {me.txn}</div><div>{fmtDateTime(me.paidAt)}</div><div>{cpd(me)} CPD points</div></div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted">Total paid to the Rheumatology Society, Mauritius</div>
              <div className="text-3xl font-semibold tracking-tight text-navy">{mur(me.amount)}</div>
              {me.usd && <div className="text-xs text-muted">equivalent to {usd(me.usd)}</div>}
            </div>
          </div>
          <p className="mt-10 border-t border-line pt-5 text-[11.5px] leading-relaxed text-muted">Payment received directly by the Rheumatology Society, Mauritius (SBM account). Registration fees are non-refundable and non-transferable. Questions: PAFLAR Secretariat, paflar2020@gmail.com. This receipt was generated electronically and is valid without signature.</p>
        </div>
      </article>
    </div>
  );
}
