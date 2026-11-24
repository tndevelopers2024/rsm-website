import clsx from "clsx";

/** Concentric orbit rings with travelling satellites, echoing a scientific/global motif. */
export function Orbits({ className, stroke = "rgba(255,255,255,.22)" }: { className?: string; stroke?: string }) {
  const rings = [90, 150, 210, 270, 330];
  return (
    <svg viewBox="-360 -360 720 720" className={clsx("pointer-events-none", className)} aria-hidden>
      {rings.map((r, i) => (
        <g key={r} style={{ transformOrigin: "0 0", animation: `spin ${50 + i * 25}s linear infinite ${i % 2 ? "reverse" : ""}` }}>
          <circle r={r} fill="none" stroke={stroke} strokeWidth={1.4} strokeDasharray={i === 2 ? "2 7" : undefined} />
          <circle cx={r} cy={0} r={i === 1 ? 9 : 6} fill={stroke} />
          {i === 3 && <circle cx={-r * 0.7} cy={r * 0.71} r={5} fill={stroke} />}
        </g>
      ))}
      <circle r={34} fill="none" stroke={stroke} strokeWidth={1.4} />
    </svg>
  );
}
