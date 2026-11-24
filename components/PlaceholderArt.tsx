import type { ImgKey } from "@/lib/images";

/**
 * Preview-only artwork shown in place of photographs when the site is built for the
 * hosted preview (NEXT_PUBLIC_PREVIEW=1), where remote images cannot load.
 */
type Motif = "waves" | "resort" | "cells" | "audience" | "clinic" | "mountains" | "sunset";

const motifOf: Partial<Record<ImgKey, Motif>> = {
  heroTeam: "clinic", heroJoint: "clinic", heroPanel: "audience", heroSea: "audience",
  ocean: "waves", aerialBeach: "waves", diver: "waves", jetty: "waves", palmBeach: "sunset", palmsTall: "sunset", palmsBeach2: "sunset", parasol: "sunset", beachSunset: "sunset",
  resortMountains: "resort", infinityPool: "resort", resortPoolEvening: "resort", resortPool: "resort", resortNight: "resort", poolDeck: "resort", hotelRoom: "resort", spa: "resort", dining: "resort", dinner: "resort",
  lagoonMountains: "mountains", greenMountains: "mountains", hike: "mountains",
  audience: "audience", microphone: "audience", audience2: "audience", audience3: "audience", presentation: "audience", talk: "audience", classroom: "audience",
  cells: "cells", pipette: "cells", dna: "cells", microscope: "cells", labWoman: "cells", labGlass: "cells",
  xrayHand: "clinic", holdingHands: "clinic", doctorLaptop: "clinic", doctorCoat: "clinic", doctorPatient: "clinic", doctorElderly: "clinic", doctorCare: "clinic", doctorMonitor: "clinic", doctorReading: "clinic", doctorXray: "clinic", doctorMale: "clinic", surgeons: "clinic", stethoscope: "clinic", anatomy: "clinic", childPlay: "clinic", hospital: "clinic", portrait: "clinic",
};

const labelOf: Partial<Record<ImgKey, string>> = {
  ocean: "Ocean aerial", aerialBeach: "Lagoon aerial", resortMountains: "Resort & mountains", beachSunset: "Beach sunset", palmBeach: "Palm beach", cells: "Microscopy", xrayHand: "Hand X-ray", holdingHands: "Patient care", audience: "Congress audience", microphone: "Speaker", talk: "CPD session", classroom: "Workshop", doctorPatient: "Consultation", doctorMonitor: "Imaging review", infinityPool: "Resort pool", childPlay: "Paediatrics", hospital: "Institution", dna: "Research", microscope: "Laboratory",
};

function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

export function PlaceholderArt({ name, label = true }: { name: ImgKey; label?: boolean }) {
  const m = motifOf[name] ?? "clinic";
  const seed = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = rand(seed);
  const id = `p${seed}`;
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
            {m === "sunset" ? (<><stop offset="0" stopColor="#f3c98b" /><stop offset=".45" stopColor="#d98a63" /><stop offset="1" stopColor="#21486a" /></>)
              : m === "resort" ? (<><stop offset="0" stopColor="#8fd3e8" /><stop offset=".55" stopColor="#398fa8" /><stop offset="1" stopColor="#0b2a44" /></>)
              : m === "mountains" ? (<><stop offset="0" stopColor="#bfe3d6" /><stop offset=".6" stopColor="#3f7f6a" /><stop offset="1" stopColor="#123a3a" /></>)
              : m === "cells" ? (<><stop offset="0" stopColor="#123a5c" /><stop offset="1" stopColor="#0b1d30" /></>)
              : m === "audience" ? (<><stop offset="0" stopColor="#1d4f72" /><stop offset="1" stopColor="#0a1a2b" /></>)
              : m === "clinic" ? (<><stop offset="0" stopColor="#d8eef2" /><stop offset=".5" stopColor="#7fbccc" /><stop offset="1" stopColor="#1b4a6b" /></>)
              : (<><stop offset="0" stopColor="#9fe0ef" /><stop offset=".5" stopColor="#2b8fb0" /><stop offset="1" stopColor="#0b3a5a" /></>)}
          </linearGradient>
          <radialGradient id={`${id}g`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#fff" stopOpacity=".9" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="800" height="600" fill={`url(#${id}s)`} />
        {m === "waves" && Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M0 ${120 + i * 36} C 200 ${90 + i * 36 + r() * 40}, 420 ${150 + i * 36 - r() * 40}, 800 ${110 + i * 36}`} fill="none" stroke="#fff" strokeOpacity={0.08 + (i % 4) * 0.05} strokeWidth={2 + (i % 3)} />
        ))}
        {m === "waves" && <path d="M0 0 H330 C 300 160 420 300 360 600 H0Z" fill="#e9f7f3" fillOpacity=".18" />}
        {m === "sunset" && (<>
          <circle cx="560" cy="300" r="90" fill="#fff4d6" fillOpacity=".85" />
          <rect y="360" width="800" height="240" fill="#173d5c" fillOpacity=".75" />
          {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={480 + r() * 120} y={380 + i * 22} width={60 + r() * 80} height="3" rx="2" fill="#ffe2b0" fillOpacity=".5" />)}
          <path d="M130 600 C 150 470 165 380 210 300" stroke="#0b2034" strokeWidth="10" fill="none" />
          {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M210 300 q ${-80 + k * 40} ${-30 - (k % 2) * 25} ${-130 + k * 65} ${10 + (k % 3) * 20}`} stroke="#0b2034" strokeWidth="9" fill="none" strokeLinecap="round" />)}
        </>)}
        {m === "resort" && (<>
          <path d="M0 330 L120 250 L220 300 L340 190 L470 290 L560 240 L800 320 V600 H0Z" fill="#123a5c" fillOpacity=".55" />
          <rect y="380" width="800" height="220" fill="#5fc6d8" fillOpacity=".55" />
          {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={r() * 700} y={400 + i * 18} width={40 + r() * 120} height="3" rx="2" fill="#fff" fillOpacity=".45" />)}
          <rect x="70" y="300" width="230" height="80" rx="6" fill="#f4efe6" fillOpacity=".9" />
          <path d="M60 300 L185 250 L310 300Z" fill="#8a6a4a" fillOpacity=".9" />
        </>)}
        {m === "mountains" && (<>
          <path d="M0 360 L160 200 L270 300 L420 150 L560 290 L680 210 L800 300 V600 H0Z" fill="#2c6a58" fillOpacity=".7" />
          <path d="M0 440 L180 330 L330 410 L500 320 L660 420 L800 370 V600 H0Z" fill="#183f3a" fillOpacity=".85" />
          <circle cx="640" cy="120" r="44" fill="#fff" fillOpacity=".55" />
        </>)}
        {m === "cells" && Array.from({ length: 34 }).map((_, i) => {
          const x = r() * 800, y = r() * 600, rr = 14 + r() * 46;
          return (<g key={i}><circle cx={x} cy={y} r={rr} fill={i % 3 ? "#398fa8" : "#c55ac8"} fillOpacity={0.18 + r() * 0.3} /><circle cx={x + rr * 0.15} cy={y - rr * 0.1} r={rr * 0.42} fill={i % 2 ? "#8fd3e8" : "#e7a3ff"} fillOpacity={0.35 + r() * 0.3} /></g>);
        })}
        {m === "audience" && (<>
          <ellipse cx="400" cy="120" rx="320" ry="140" fill={`url(#${id}g)`} opacity=".35" />
          <rect x="250" y="70" width="300" height="160" rx="6" fill="#bfe6ef" fillOpacity=".55" />
          {Array.from({ length: 6 }).map((_, row) => Array.from({ length: 13 }).map((_, c) => (
            <g key={`${row}-${c}`} fillOpacity={0.55 + row * 0.07} fill="#06121e">
              <circle cx={30 + c * 62 + (row % 2) * 30} cy={330 + row * 48} r={14 + row * 1.5} />
              <rect x={12 + c * 62 + (row % 2) * 30} y={344 + row * 48} width={36 + row * 3} height="40" rx="14" />
            </g>
          )))}
        </>)}
        {m === "clinic" && (<>
          <circle cx="560" cy="250" r="190" fill="#fff" fillOpacity=".18" />
          <circle cx="560" cy="250" r="120" fill="#fff" fillOpacity=".18" />
          <path d="M520 160 h80 v60 h60 v80 h-60 v60 h-80 v-60 h-60 v-80 h60z" fill="#fff" fillOpacity=".55" />
          <path d="M60 480 C 200 380 300 520 420 430 S 640 420 800 380 V600 H0Z" fill="#0b2a44" fillOpacity=".35" />
          <path d="M0 520 L140 520 L170 470 L200 570 L230 500 L800 500" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="4" />
        </>)}
      </svg>
      {label && labelOf[name] && (
        <span className="absolute bottom-3 left-3 z-[1] rounded-full bg-black/35 px-2.5 py-1 font-cond text-[10.5px] uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
          Photo · {labelOf[name]}
        </span>
      )}
    </div>
  );
}
