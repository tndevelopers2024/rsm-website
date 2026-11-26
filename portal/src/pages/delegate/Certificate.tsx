import { useState } from "react";
import clsx from "clsx";
import { Award, Download, Eye, Lock, QrCode } from "lucide-react";
import { useStore } from "../../data/store";
import { qrPayload } from "../../lib";
import { DemoBanner, QR, SectionHead } from "../../ui/ui";
import { useMe } from "./Layout";
import type { Registration } from "../../data/types";

export function CertificateArt({ r, days }: { r: Registration; days: number }) {
  const code = qrPayload(r).split(":")[2];
  return (
    <div className="relative aspect-[1.414/1] w-full overflow-hidden rounded-2xl bg-white text-navy shadow-[0_40px_80px_-40px_rgba(11,32,52,.5)] ring-1 ring-line">
      <div className="absolute inset-3 rounded-xl border border-gold/50 sm:inset-5" />
      <div className="absolute inset-[18px] rounded-lg border border-gold/25 sm:inset-[26px]" />
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal/5" />
      <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold/10" />
      <div className="relative flex h-full flex-col items-center justify-between px-[7%] py-[6%] text-center">
        <img src="./rsm-logo-full.png" alt="" className="h-[9%] min-h-6" />
        <div>
          <div className="font-cond text-[clamp(8px,1.3vw,13px)] uppercase tracking-[0.3em] text-gold">Certificate of attendance</div>
          <div className="mt-[2%] text-[clamp(10px,1.5vw,15px)] text-muted">This is to certify that</div>
          <div className="mt-[1.5%] font-serif text-[clamp(20px,4.4vw,46px)] italic leading-tight text-navy">{r.title} {r.first} {r.last}</div>
          <div className="mx-auto mt-[1.5%] h-px w-1/2 bg-gold/50" />
          <p className="mx-auto mt-[2%] max-w-[78%] text-[clamp(9px,1.4vw,14px)] leading-relaxed text-ink/80">
            attended the <b>7th PAFLAR Congress</b>, hosted by the Rheumatology Society, Mauritius, at the Hilton Mauritius Resort &amp; Spa and Artemis Cascavelle Hospital, 7–9 May 2027, and is awarded <b>{days * 4} CPD points</b>.
          </p>
        </div>
        <div className="flex w-full items-end justify-between gap-4">
          <div className="text-left">
            <div className="h-px w-[clamp(70px,14vw,150px)] bg-navy/40" />
            <div className="mt-1 text-[clamp(8px,1.1vw,11px)] font-semibold">President</div>
            <div className="text-[clamp(7px,1vw,10px)] text-muted">Rheumatology Society, Mauritius</div>
          </div>
          <div className="flex flex-col items-center">
            <QR value={`https://rheumatologysociety.org/verify/${code}`} size={64} className="h-[clamp(36px,6.5vw,64px)] w-[clamp(36px,6.5vw,64px)]" />
            <div className="mt-1 font-mono text-[clamp(6px,0.9vw,9px)] text-muted">Verify · {code}</div>
          </div>
          <div className="text-right">
            <div className="h-px w-[clamp(70px,14vw,150px)] bg-navy/40" />
            <div className="mt-1 text-[clamp(8px,1.1vw,11px)] font-semibold">Congress Chair</div>
            <div className="text-[clamp(7px,1vw,10px)] text-muted">7th PAFLAR Congress</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DelegateCertificate() {
  const me = useMe();
  const { settings } = useStore();
  const attended = Object.keys(me.attendance).length;
  const ready = attended >= settings.certificateMinDays;
  const [preview, setPreview] = useState(false);
  const show = ready || preview;
  return (
    <div className="space-y-6">
      <SectionHead title="e-Certificate" sub="Issued automatically once your attendance is recorded by QR at check-in." actions={ready && <button onClick={() => window.print()} className="btn btn-primary"><Download className="h-4 w-4" /> Download PDF</button>} />
      {!ready && <DemoBanner>The congress hasn’t happened yet, so the certificate is locked. Use “Preview certificate” to see how it will look.</DemoBanner>}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="relative">
          <div className={clsx("transition", !show && "pointer-events-none select-none blur-[6px] grayscale-[40%]")}><CertificateArt r={me} days={ready ? attended : me.days.length} /></div>
          {!show && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="card max-w-xs p-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-mist"><Lock className="h-5 w-5 text-muted" /></div>
                <div className="mt-3 font-semibold text-navy">Unlocks after you attend</div>
                <p className="mt-1 text-[13px] text-muted">Scan your QR badge on each day. Your certificate and CPD points appear here right after the congress.</p>
                <button onClick={() => setPreview(true)} className="btn btn-ghost btn-sm mt-4"><Eye className="h-3.5 w-3.5" /> Preview certificate</button>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="card p-5">
            <div className="text-sm font-semibold text-navy">Attendance record</div>
            <ul className="mt-3 space-y-2 text-[13px]">
              {me.days.map((d) => (
                <li key={d} className="flex items-center justify-between rounded-lg bg-mist px-3 py-2"><span className="capitalize">{d === "fri" ? "Fri 7 May" : d === "sat" ? "Sat 8 May" : "Sun 9 May"}</span><span className={me.attendance[d] ? "font-semibold text-ok" : "text-muted"}>{me.attendance[d] ? "Checked in" : "Not yet"}</span></li>
              ))}
            </ul>
          </div>
          <div className="card p-5 text-[13px] text-muted">
            <div className="flex items-center gap-2 font-semibold text-navy"><QrCode className="h-4 w-4 text-teal" /> Verifiable</div>
            <p className="mt-2">Every certificate carries a QR code and a unique code that anyone can check on the Society’s verification page.</p>
            <div className="mt-4 flex items-center gap-2 font-semibold text-navy"><Award className="h-4 w-4 text-gold" /> CPD points</div>
            <p className="mt-2">4 CPD points per day attended, as recorded at check-in.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
