import clsx from "clsx";
import { MapPin } from "lucide-react";
import { initialsOf, type Member } from "@/lib/content";

const tones = [
  "from-[#0b8a8a] to-[#142d46]",
  "from-[#398fa8] to-[#0b2034]",
  "from-[#c7a65a] to-[#5a4a24]",
  "from-[#1b4a6b] to-[#0b2034]",
];

/** Team card with an initials monogram (portraits can replace it later). */
export function MemberCard({ m, i, compact }: { m: Member; i: number; compact?: boolean }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white p-6 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(20,45,70,.5)] md:p-7">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-aqua transition group-hover:scale-125" />
      <div className={clsx("relative grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-display font-semibold text-white shadow-[0_14px_30px_-14px_rgba(11,32,52,.7)]", tones[i % tones.length], compact ? "h-14 w-14 text-lg" : "h-16 w-16 text-xl")}>
        {initialsOf(m.name)}
      </div>
      <div className="relative mt-5 font-cond text-[12px] uppercase tracking-[0.2em] text-teal">{m.role}</div>
      <h3 className="relative mt-1.5 font-display text-[18px] font-semibold leading-snug text-navy">{m.name}</h3>
      <p className="relative mt-1 text-[14.5px] text-ink/75">{m.title}</p>
      <p className="relative mt-auto flex items-start gap-1.5 pt-4 text-[13.5px] text-muted"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />{m.place}</p>
    </div>
  );
}
