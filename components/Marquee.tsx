export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee items-center gap-14 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-14 font-cond text-[clamp(1.6rem,3vw,2.6rem)] uppercase tracking-[0.04em]">
            {t}
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
