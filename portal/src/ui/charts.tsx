import type { ReactNode } from "react";

export const SERIES = ["#0e9aa0", "#2b5c9e", "#d29a2a", "#c8334f", "#7a5bc2"];
export const AXIS = { stroke: "#e3eaef", tick: { fill: "#607286", fontSize: 11.5 }, tickLine: false, axisLine: false } as const;

type TipProps = { active?: boolean; payload?: { name?: string; value?: number | string; color?: string; payload?: Record<string, unknown> }[]; label?: ReactNode; fmt?: (v: number) => string; labelFmt?: (l: ReactNode) => ReactNode };
export function ChartTip({ active, payload, label, fmt, labelFmt }: TipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-white px-3 py-2 text-[12.5px] shadow-lg">
      <div className="mb-1 font-semibold text-navy">{labelFmt ? labelFmt(label) : label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-ink/80">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span>{p.name}</span>
          <span className="ml-auto pl-4 font-semibold text-navy">{typeof p.value === "number" && fmt ? fmt(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* Horizontal bar list in plain HTML: label, value, thin bar with rounded end. */
export function BarList({ rows, fmt = (v) => String(v), color = SERIES[0] }: { rows: { label: ReactNode; value: number; key: string }[]; fmt?: (v: number) => string; color?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.key} className="group" title={`${r.key}: ${fmt(r.value)}`}>
          <div className="flex items-center justify-between text-[13px]"><span className="text-ink/85">{r.label}</span><span className="font-semibold tabular-nums text-navy">{fmt(r.value)}</span></div>
          <div className="mt-1.5 h-2 rounded-full bg-mist"><div className="h-2 rounded-full transition-all group-hover:opacity-80" style={{ width: `${(r.value / max) * 100}%`, background: color }} /></div>
        </li>
      ))}
    </ul>
  );
}
