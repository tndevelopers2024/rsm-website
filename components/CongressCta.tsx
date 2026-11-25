import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { congress } from "@/lib/content";
import { DuoImage } from "./DuoImage";
import { Orbits } from "./Orbits";
import { Reveal } from "./Reveal";
import { Countdown } from "./Countdown";

export function CongressCta() {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy-deep py-28 text-white md:py-36">
      <DuoImage name="beachSunset" tone="ocean" className="!absolute inset-0 -z-10 opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/30" />
      <Orbits className="absolute left-1/2 top-1/2 -z-10 w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="wrap text-center">
        <Reveal><span className="eyebrow-plain text-gold">{congress.dates} · {congress.location}</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[1.05]">
            We look forward to welcoming you to <em className="font-serif italic text-sky">Mauritius.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-12 max-w-md"><Countdown target={congress.startISO} /></Reveal>
        <Reveal delay={0.3} className="mt-12 flex flex-wrap justify-center gap-4">
          <a href={congress.links.main} target="_blank" rel="noopener noreferrer" className="btn btn-red">Official Registration <ArrowUpRight className="h-4 w-4" /></a>
          <Link href="/paflar-2027/sponsorship" className="btn btn-ghost">Sponsorship Enquiries</Link>
        </Reveal>
      </div>
    </section>
  );
}
