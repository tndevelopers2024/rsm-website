import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import QRCode from "qrcode";
import clsx from "clsx";
import { CheckCircle2, Clock3, X, XCircle, RotateCcw, Ban, type LucideIcon } from "lucide-react";
import { useStore } from "../data/store";
import type { RegStatus } from "../data/types";

export function Logo({ light = false, tag, size = "md", tagClass = "sm:block" }: { light?: boolean; tag?: string; size?: "sm" | "md" | "lg"; tagClass?: string }) {
  const h = size === "lg" ? "h-14" : size === "sm" ? "h-8" : "h-10";
  return (
    <div className="flex items-center gap-3">
      <div className={clsx("shrink-0", light && "rounded-2xl bg-white px-3 py-2 shadow-[0_10px_30px_-18px_rgba(0,0,0,.6)]")}>
        <img src="./rsm-logo-full.png" alt="Rheumatology Society, Mauritius" className={clsx(h, "w-auto")} />
      </div>
      {tag && (
        <div className={clsx("hidden border-l pl-3 leading-tight", tagClass, light ? "border-white/20" : "border-line")}>
          <div className={clsx("font-cond text-[10.5px] uppercase tracking-[0.2em]", light ? "text-gold" : "text-teal")}>{tag}</div>
          <div className={clsx("text-[11.5px]", light ? "text-white/60" : "text-muted")}>PAFLAR 2027 · Mauritius</div>
        </div>
      )}
    </div>
  );
}

const statusMap: Record<RegStatus, { label: string; cls: string; icon: LucideIcon }> = {
  paid: { label: "Paid", cls: "bg-ok/10 text-ok ring-ok/20", icon: CheckCircle2 },
  pending: { label: "Payment pending", cls: "bg-warn/10 text-warn ring-warn/25", icon: Clock3 },
  failed: { label: "Payment failed", cls: "bg-bad/10 text-bad ring-bad/20", icon: XCircle },
  refunded: { label: "Refunded", cls: "bg-c5/10 text-c5 ring-c5/20", icon: RotateCcw },
  cancelled: { label: "Cancelled", cls: "bg-muted/10 text-muted ring-muted/20", icon: Ban },
};
export function StatusPill({ status, small }: { status: RegStatus; small?: boolean }) {
  const s = statusMap[status];
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full font-semibold ring-1 ring-inset", s.cls, small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs")}>
      <s.icon className={small ? "h-3 w-3" : "h-3.5 w-3.5"} /> {s.label}
    </span>
  );
}

export function Pill({ children, tone = "slate", className }: { children: ReactNode; tone?: "slate" | "teal" | "gold" | "ok" | "warn" | "bad" | "navy" | "violet"; className?: string }) {
  const t = {
    slate: "bg-mist text-ink/75 ring-line", teal: "bg-teal/10 text-teal ring-teal/20", gold: "bg-gold-soft text-[#8a6a1f] ring-gold/30",
    ok: "bg-ok/10 text-ok ring-ok/20", warn: "bg-warn/10 text-warn ring-warn/25", bad: "bg-bad/10 text-bad ring-bad/20", navy: "bg-navy text-white ring-navy", violet: "bg-c5/10 text-c5 ring-c5/20",
  }[tone];
  return <span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ring-1 ring-inset", t, className)}>{children}</span>;
}

export function Stat({ label, value, sub, icon: Icon, tone = "teal", trend }: { label: string; value: ReactNode; sub?: ReactNode; icon: LucideIcon; tone?: "teal" | "gold" | "navy" | "crimson" | "violet"; trend?: string }) {
  const t = { teal: "bg-teal/10 text-teal", gold: "bg-gold-soft text-[#8a6a1f]", navy: "bg-navy/10 text-navy", crimson: "bg-crimson/10 text-crimson", violet: "bg-c5/10 text-c5" }[tone];
  return (
    <div className="card p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(15,42,68,.35)]">
      <div className="flex items-start justify-between">
        <div className={clsx("grid h-10 w-10 place-items-center rounded-xl", t)}><Icon className="h-5 w-5" /></div>
        {trend && <span className="rounded-full bg-ok/10 px-2 py-0.5 text-[11px] font-semibold text-ok">{trend}</span>}
      </div>
      <div className="mt-4 text-[13px] font-medium text-muted">{label}</div>
      <div className="mt-1 text-[26px] font-semibold tracking-tight text-navy">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
    </div>
  );
}

export function SectionHead({ title, sub, actions }: { title: ReactNode; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-[26px] font-semibold tracking-tight text-navy md:text-[30px]">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Drawer({ open, onClose, title, children, width = "max-w-xl" }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; width?: string }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div className="absolute inset-0 bg-navy-deep/40 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside className={clsx("absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-2xl", width)} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 32, stiffness: 320 }}>
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div className="min-w-0 font-semibold text-navy">{title}</div>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-mist" aria-label="Close"><X className="h-4 w-4" /></button>
            </div>
            <div className="scroll-thin flex-1 overflow-y-auto">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Modal({ open, onClose, children, className }: { open: boolean; onClose: () => void; children: ReactNode; className?: string }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <motion.div className="absolute inset-0 bg-navy-deep/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className={clsx("relative w-full max-w-lg rounded-3xl bg-white shadow-2xl", className)} initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}>
            <button onClick={onClose} className="no-print absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 hover:bg-mist" aria-label="Close"><X className="h-4 w-4" /></button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Toast() {
  const { toast } = useStore();
  return (
    <div className="no-print pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-medium text-white shadow-xl">
            <CheckCircle2 className="h-4 w-4 text-aqua" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function QR({ value, size = 180, className, dark = "#0b2034" }: { value: string; size?: number; className?: string; dark?: string }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(value, { margin: 1, width: size * 2, errorCorrectionLevel: "M", color: { dark, light: "#ffffff" } }).then(setSrc).catch(() => setSrc(""));
  }, [value, size, dark]);
  return src ? <img src={src} width={size} height={size} alt={`QR code ${value}`} className={className} /> : <div style={{ width: size, height: size }} className={clsx("animate-pulse rounded-lg bg-mist", className)} />;
}

export function Avatar({ first, last, size = 36, tone = 0 }: { first: string; last: string; size?: number; tone?: number }) {
  const tones = ["bg-teal/12 text-teal", "bg-c2/12 text-c2", "bg-gold-soft text-[#8a6a1f]", "bg-crimson/10 text-crimson", "bg-c5/12 text-c5"];
  return (
    <div style={{ width: size, height: size, fontSize: size * 0.36 }} className={clsx("grid shrink-0 place-items-center rounded-full font-bold", tones[tone % tones.length])}>
      {first[0]}{last[0]}
    </div>
  );
}

export function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: ReactNode }[] }) {
  return (
    <div className="inline-flex rounded-full border border-line bg-white p-1">
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} className={clsx("rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition", value === o.value ? "bg-navy text-white shadow" : "text-muted hover:text-navy")}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label?: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={onChange} className={clsx("relative h-6 w-11 shrink-0 rounded-full transition", on ? "bg-teal" : "bg-line")}>
      <span className={clsx("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", on ? "left-[22px]" : "left-0.5")} />
    </button>
  );
}

export function Empty({ icon: Icon, title, sub, action }: { icon: LucideIcon; title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="grid place-items-center px-6 py-14 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-mist text-muted"><Icon className="h-6 w-6" /></div>
      <div className="mt-4 font-semibold text-navy">{title}</div>
      {sub && <p className="mt-1 max-w-sm text-sm text-muted">{sub}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function DemoBanner({ children }: { children: ReactNode }) {
  return <div className="no-print flex items-start gap-2 rounded-xl border border-dashed border-gold/60 bg-gold-soft/60 px-3.5 py-2.5 text-[12.5px] text-[#7a5d18]"><span className="font-cond mt-0.5 text-[10px] uppercase tracking-[0.18em]">Demo</span><span>{children}</span></div>;
}
