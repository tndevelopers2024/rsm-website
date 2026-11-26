import QRCode from "qrcode";
import { Download, Lock, Printer, ShieldCheck, Smartphone, Sun, Wallet } from "lucide-react";
import { flag } from "../../data/seed";
import { daysLabel, qrPayload } from "../../lib";
import { QR, SectionHead } from "../../ui/ui";
import { useStore } from "../../data/store";
import { useMe } from "./Layout";
import type { Registration } from "../../data/types";

async function badgePng(r: Registration) {
  const W = 800, H = 1200;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
  g.fillStyle = "#0b2034"; g.fillRect(0, 0, W, 300);
  const stripe = ["#e42320", "#142d46", "#f6c400", "#5bb431"]; stripe.forEach((col, i) => { g.fillStyle = col; g.fillRect((W / 4) * i, 300, W / 4, 12); });
  g.fillStyle = "#c7a65a"; g.font = "600 26px Oswald, sans-serif"; g.fillText("7TH PAFLAR CONGRESS · MAURITIUS", 60, 110);
  g.fillStyle = "#ffffff"; g.font = "300 64px Manrope, sans-serif"; g.fillText("7–9 May 2027", 60, 195);
  g.fillStyle = "rgba(255,255,255,.65)"; g.font = "400 26px Manrope, sans-serif"; g.fillText("Hilton Mauritius · Artemis Cascavelle", 60, 245);
  g.fillStyle = "#0f2a44"; g.font = "600 64px Manrope, sans-serif"; g.fillText(`${r.title} ${r.first}`, 60, 420); g.fillText(r.last, 60, 495);
  g.fillStyle = "#607286"; g.font = "400 30px Manrope, sans-serif"; g.fillText(`${r.country} · ${r.category}`, 60, 555);
  const qr = await QRCode.toDataURL(qrPayload(r), { margin: 1, width: 440, color: { dark: "#0b2034", light: "#ffffff" } });
  const img = new Image(); img.src = qr; await img.decode();
  g.drawImage(img, (W - 440) / 2, 610, 440, 440);
  g.fillStyle = "#14868c"; g.font = "600 30px Manrope, sans-serif"; g.textAlign = "center"; g.fillText(`${r.id} · ${daysLabel(r)}`, W / 2, 1110);
  g.fillStyle = "#607286"; g.font = "400 22px Manrope, sans-serif"; g.fillText("Rheumatology Society, Mauritius", W / 2, 1155);
  const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = `PAFLAR2027-badge-${r.id}.png`; a.click();
}

export default function DelegateBadge() {
  const me = useMe();
  const { notify } = useStore();
  const paid = me.status === "paid";
  return (
    <div className="space-y-6">
      <SectionHead title="QR badge" sub="Show this at the registration desk. Each scan records your attendance and CPD points for that day." />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="mx-auto w-full max-w-[400px]">
          <div className="mx-auto h-8 w-24 rounded-b-xl bg-navy/90" />
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_-40px_rgba(11,32,52,.55)] ring-1 ring-line">
            <div className="grain relative bg-navy-deep px-7 pb-7 pt-8 text-white">
              <div className="eyebrow text-gold">7th PAFLAR Congress · Mauritius</div>
              <div className="mt-3 text-[30px] font-light">7–9 May 2027</div>
              <div className="text-[13px] text-white/60">Hilton Mauritius · Artemis Cascavelle</div>
            </div>
            <div className="flex h-1.5"><i className="flex-1 bg-[#e42320]" /><i className="flex-1 bg-[#142d46]" /><i className="flex-1 bg-[#f6c400]" /><i className="flex-1 bg-[#5bb431]" /></div>
            <div className="px-7 pb-7 pt-6 text-center">
              <div className="text-left">
                <div className="text-[28px] font-semibold leading-tight text-navy">{me.title} {me.first}<br />{me.last}</div>
                <div className="mt-1 text-sm text-muted">{flag(me.country)} {me.country} · {me.category}</div>
              </div>
              <div className="relative mx-auto mt-6 w-fit rounded-2xl border border-line p-3">
                {paid ? <QR value={qrPayload(me)} size={220} /> : <div className="grid h-[220px] w-[220px] place-items-center rounded-xl bg-mist text-sm text-muted"><Lock className="mb-2 h-7 w-7" />Available after payment</div>}
              </div>
              <div className="mt-4 font-mono text-[13px] font-semibold text-teal">{me.id} · {daysLabel(me)}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="font-semibold text-navy">Keep it handy</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button disabled={!paid} onClick={() => badgePng(me).then(() => notify("Badge downloaded"))} className="btn btn-primary"><Download className="h-4 w-4" /> Download badge (PNG)</button>
              <button disabled={!paid} onClick={() => window.print()} className="btn btn-ghost"><Printer className="h-4 w-4" /> Print</button>
              <button disabled className="btn btn-ghost" title="Planned"><Wallet className="h-4 w-4" /> Add to wallet · soon</button>
            </div>
          </div>
          <div className="card divide-y divide-line">
            {[
              [Smartphone, "Phone or paper both work", "Show the badge on your phone, or print it. We also send it by WhatsApp the evening before each day."],
              [Sun, "Turn up the brightness", "A brighter screen makes the scan instant at the desk."],
              [ShieldCheck, "Your QR is personal", "The code is signed and linked to your registration. Please don’t share it; a second scan on the same day is flagged."],
            ].map(([I, t, s]) => {
              const Icon = I as typeof Sun;
              return (
                <div key={t as string} className="flex gap-4 p-5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal"><Icon className="h-5 w-5" /></div>
                  <div><div className="text-sm font-semibold text-navy">{t as string}</div><p className="mt-0.5 text-[13px] text-muted">{s as string}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
