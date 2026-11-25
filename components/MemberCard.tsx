import { MapPin, UserRound } from "lucide-react";
import type { Member } from "@/lib/content";

/** Team card: portrait on a soft tile, or a placeholder until a photograph is supplied. */
export function MemberCard({ m, compact }: { m: Member; i?: number; compact?: boolean }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-white ring-1 sm:rounded-[24px] ring-line transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(20,45,70,.5)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#eef6f7] via-[#e3f0f2] to-[#cfe5e8]">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-teal/15" />
        <div className="absolute -left-8 bottom-10 h-24 w-24 rounded-full bg-white/50" />
        {m.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={m.photo} alt={m.name} loading="lazy" className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-[50%_20%] mix-blend-multiply transition duration-700 group-hover:scale-[1.17]" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 text-teal/35">
              <UserRound className={compact ? "h-12 w-12 sm:h-16 sm:w-16" : "h-12 w-12 sm:h-20 sm:w-20"} strokeWidth={1} />
              <span className="font-cond text-[9.5px] uppercase tracking-[0.18em] text-navy/35 sm:text-[11px] sm:tracking-[0.22em]">Photo to follow</span>
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal via-sky to-gold opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className={compact ? "flex flex-1 flex-col p-3.5 sm:p-5" : "flex flex-1 flex-col p-3.5 sm:p-6"}>
        <div className="font-cond text-[10.5px] uppercase tracking-[0.14em] text-teal sm:text-[12px] sm:tracking-[0.2em]">{m.role}</div>
        <h3 className="mt-1 font-display text-[14.5px] font-semibold leading-snug text-navy sm:mt-1.5 sm:text-[17px]">{m.name}</h3>
        <p className="mt-1 text-[12.5px] leading-snug text-ink/75 sm:text-[14px]">{m.title}</p>
        <p className="mt-auto flex items-start gap-1.5 pt-2.5 text-[12px] leading-snug text-muted sm:pt-3 sm:text-[13px]"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />{m.place}</p>
      </div>
    </div>
  );
}
