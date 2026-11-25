import clsx from "clsx";

/**
 * Subtle rheumatology-themed background abstracts for light sections.
 * All are decorative (aria-hidden), low-opacity and pointer-events-none.
 */

/** Dotted flowing waves, echoing the particle waves in the hero artwork. */
export function ParticleWaves({ className, color = "#087f83", rows = 12, opacity = 0.35 }: { className?: string; color?: string; rows?: number; opacity?: number }) {
  return (
    <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className={clsx("pointer-events-none absolute [contain:strict] [transform:translateZ(0)]", className)} aria-hidden>
      {Array.from({ length: rows }).map((_, i) => {
        const y = 140 + i * 14;
        const a = 70 + i * 6;
        return (
          <path
            key={i}
            d={`M-20 ${y} C 260 ${y - a}, 520 ${y + a}, 780 ${y - a * 0.4} S 1240 ${y + a * 0.9}, 1460 ${y - a * 0.3}`}
            fill="none"
            stroke={color}
            strokeOpacity={opacity * (0.35 + (i / rows) * 0.65)}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeDasharray="0 11"
          />
        );
      })}
    </svg>
  );
}

/** Line-art hand skeleton with joint rings, inspired by the Society's logo. */
export function HandJoints({ className, stroke = "#087f83", ring = "#c7a65a" }: { className?: string; stroke?: string; ring?: string }) {
  // finger chains: [x, y] points from metacarpal base to fingertip
  const fingers: [number, number][][] = [
    [[150, 330], [95, 265], [62, 220], [40, 188]], // thumb
    [[190, 300], [178, 205], [172, 150], [168, 112], [166, 82]],
    [[222, 296], [224, 192], [226, 128], [227, 88], [228, 56]],
    [[252, 300], [268, 205], [276, 148], [281, 110], [284, 80]],
    [[278, 312], [308, 236], [324, 192], [334, 162], [340, 138]],
  ];
  const wrist = [[175, 330], [205, 322], [240, 322], [270, 330], [200, 352], [240, 352]];
  return (
    <svg viewBox="0 0 400 420" className={clsx("pointer-events-none absolute", className)} aria-hidden fill="none">
      <path d="M150 330 C 140 380, 160 410, 220 412 S 300 380, 280 312" stroke={stroke} strokeWidth="1.6" strokeOpacity=".5" />
      {fingers.map((f, i) => (
        <g key={i}>
          <polyline points={f.map((p) => p.join(",")).join(" ")} stroke={stroke} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".18" />
          <polyline points={f.map((p) => p.join(",")).join(" ")} stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeOpacity=".6" />
          {f.slice(1, -1).map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r={k === 0 ? 7 : 5.5} stroke={ring} strokeWidth="2.4" strokeOpacity=".75" fill={ring} fillOpacity=".12" />
          ))}
        </g>
      ))}
      {wrist.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" stroke={stroke} strokeWidth="1.2" strokeOpacity=".45" />)}
    </svg>
  );
}

/** Line-art knee joint (femur, tibia, patella, cartilage space). */
export function KneeJoint({ className, stroke = "#398fa8", accent = "#e52521" }: { className?: string; stroke?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 300 520" className={clsx("pointer-events-none absolute", className)} aria-hidden fill="none">
      <g stroke={stroke} strokeWidth="1.5" strokeOpacity=".6">
        <path d="M110 0 L112 170 C 80 190, 60 220, 70 250 C 80 275, 120 278, 150 262 C 180 278, 222 275, 232 250 C 242 220, 220 190, 190 170 L192 0" />
        <path d="M74 290 C 70 275, 100 268, 150 276 C 200 268, 232 275, 228 290 C 224 312, 196 322, 186 334 L184 520 M116 520 L114 334 C 104 322, 76 312, 74 290Z" />
        <ellipse cx="238" cy="222" rx="18" ry="30" />
        <path d="M200 340 L205 520" strokeOpacity=".35" />
      </g>
      <path d="M84 266 C 120 280, 180 280, 218 266" stroke={accent} strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
      <circle cx="150" cy="268" r="34" stroke={accent} strokeOpacity=".18" strokeWidth="1.2" />
      <circle cx="150" cy="268" r="58" stroke={stroke} strokeOpacity=".15" strokeWidth="1" strokeDasharray="2 6" />
    </svg>
  );
}

/** Fine dot grid that fades out. */
export function DotGrid({ className, color = "#142d46" }: { className?: string; color?: string }) {
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none absolute", className)}
      style={{
        backgroundImage: `radial-gradient(${color} 1.1px, transparent 1.2px)`,
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
        opacity: 0.12,
      }}
    />
  );
}

/** Soft blurred colour glows. */
export function Glow({ className, color = "rgba(57,143,168,.22)" }: { className?: string; color?: string }) {
  return <div aria-hidden className={clsx("pointer-events-none absolute rounded-full blur-3xl", className)} style={{ background: color }} />;
}
