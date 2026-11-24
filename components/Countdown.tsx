"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function Countdown({ target, className, light = true }: { target: string; className?: string; light?: boolean }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = now === null ? 0 : Math.max(0, new Date(target).getTime() - now);
  const units = [
    { k: "Days", v: Math.floor(diff / 864e5) },
    { k: "Hours", v: Math.floor(diff / 36e5) % 24 },
    { k: "Mins", v: Math.floor(diff / 6e4) % 60 },
    { k: "Secs", v: Math.floor(diff / 1e3) % 60 },
  ];
  return (
    <div className={clsx("grid grid-cols-4 gap-2", className)}>
      {units.map((u) => (
        <div key={u.k} className={clsx("rounded-xl px-2 py-3 text-center", light ? "bg-white/8 ring-1 ring-white/12" : "bg-navy/5 ring-1 ring-navy/10")}>
          <div className={clsx("font-display text-2xl font-semibold tabular-nums md:text-[28px]", light ? "text-white" : "text-navy")}>
            {now === null ? "––" : String(u.v).padStart(2, "0")}
          </div>
          <div className={clsx("font-cond text-[10.5px] uppercase tracking-[0.2em]", light ? "text-white/55" : "text-muted")}>{u.k}</div>
        </div>
      ))}
    </div>
  );
}
