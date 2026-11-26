import type { Registration } from "./types";
import { NOW } from "./seed";

/* Card payments settle into the Society's SBM account in daily batches (T+2 working days, indicative). */
export function settlements(regs: Registration[]) {
  const byDay = new Map<string, Registration[]>();
  for (const r of regs) if (r.status === "paid" && r.paidAt) {
    const k = r.paidAt.slice(0, 10);
    byDay.set(k, [...(byDay.get(k) ?? []), r]);
  }
  return [...byDay.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([day, rs]) => {
    const d = new Date(day + "T12:00:00+04:00");
    let add = 2; const s = new Date(d);
    while (add > 0) { s.setDate(s.getDate() + 1); if (s.getDay() !== 0 && s.getDay() !== 6) add--; }
    return { batch: `SBM-B${day.replace(/-/g, "")}`, day, settleOn: s.toISOString(), count: rs.length, amount: rs.reduce((t, r) => t + r.amount, 0), settled: s <= NOW };
  });
}
