import clsx from "clsx";

/** Rotating circular type, as used on international society sites. */
export function CircleText({
  text,
  className,
  color = "white",
  size = 220,
}: {
  text: string;
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={clsx("animate-spin-slow", className)} aria-hidden>
      <defs>
        <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text fill={color} style={{ fontFamily: "var(--font-display)", fontSize: 15.5, fontWeight: 500, letterSpacing: "0.18em" }}>
        <textPath href="#circ" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
