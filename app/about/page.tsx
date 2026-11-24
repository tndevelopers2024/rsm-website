import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { about, initiatives } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal, RevealMask } from "@/components/Reveal";
import { DuoImage } from "@/components/DuoImage";
import { Timeline } from "@/components/Timeline";
import { Pending } from "@/components/Pending";
import { Orbits } from "@/components/Orbits";
import { CircleText } from "@/components/CircleText";

export const metadata: Metadata = { title: "About the Society", description: about.whoWeAre[0] };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Society"
        title="Advancing Rheumatology in Mauritius since 2015."
        lead="A professional medical society dedicated to medical education, scientific research, public awareness and professional collaboration."
        image="heroTeam" tone="none"
        crumbs={[{ label: "About" }]}
      />

      {/* Who we are */}
      <section className="py-28 md:py-36">
        <div className="wrap grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          <div>
            <SectionHead eyebrow="Who We Are" title={<>Bringing together the people who <em>advance care.</em></>} />
            {about.whoWeAre.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <p className={i === 0 ? "mt-8 text-[1.25rem] leading-relaxed text-ink" : "mt-5 text-[1.05rem] text-muted"}>{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="relative min-h-[560px]">
            <RevealMask className="absolute inset-0 bottom-[22%] overflow-hidden rounded-[28px]">
              <DuoImage name="doctorMonitor" tone="none" sizes="45vw" className="h-full w-full" alt="Clinician reviewing imaging with a patient" />
            </RevealMask>
            <RevealMask delay={0.15} className="absolute bottom-0 left-[12%] h-[38%] w-[56%] overflow-hidden rounded-[28px] border-[10px] border-white">
              <DuoImage name="audience" tone="navy" sizes="30vw" className="h-full w-full" alt="Scientific conference" />
            </RevealMask>
            <CircleText text="ESTABLISHED JULY 2015 · MAURITIUS · " color="#087f83" size={160} className="absolute -right-4 bottom-10 hidden md:block" />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="grain relative isolate overflow-hidden bg-navy py-28 text-white md:py-36">
        <Orbits className="absolute -right-60 -top-60 -z-10 w-[860px] opacity-50" />
        <div className="wrap grid gap-6 lg:grid-cols-2">
          {[
            { k: "Our Vision", t: about.vision },
            { k: "Our Mission", t: about.mission, note: "Proposed wording" },
          ].map((x, i) => (
            <Reveal key={x.k} delay={i * 0.12} className="rounded-[28px] bg-white/[.05] p-10 ring-1 ring-white/10 md:p-14">
              <div className="flex items-center gap-4"><span className="font-cond text-[14px] uppercase tracking-[0.25em] text-gold">{x.k}</span>{x.note && <Pending>{x.note}</Pending>}</div>
              <p className="mt-7 font-display text-[clamp(1.35rem,2.2vw,1.8rem)] font-light leading-[1.45]">{x.t}</p>
            </Reveal>
          ))}
          <Reveal className="rounded-[28px] bg-gold/10 p-10 ring-1 ring-gold/30 md:p-12 lg:col-span-2">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-cond text-[14px] uppercase tracking-[0.25em] text-gold">Aims & Objectives</span>
                <p className="mt-3 max-w-2xl text-white/75">The formal aims and objectives will be incorporated from the Society&apos;s approved constitution once supplied for website use.</p>
              </div>
              <Pending>Awaiting approved constitution</Pending>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="scroll-mt-24 bg-mist py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Our Institutional Journey" title={<>Milestones that shaped <em>the Society.</em></>} lead="Hover or tap a milestone to read more." />
          <div className="mt-20"><Timeline /></div>
        </div>
      </section>

      {/* Initiatives */}
      <section id="initiatives" className="scroll-mt-24 py-28 md:py-36">
        <div className="wrap">
          <SectionHead
            eyebrow="Future Direction"
            title={<>Initiatives for the <em>decade ahead.</em></>}
            lead="Our forward agenda, published transparently. Each initiative is subject to governance, feasibility and the necessary approvals."
            aside={<Pending>Descriptions & status to be confirmed</Pending>}
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((x, i) => (
              <Reveal key={x.key} delay={(i % 3) * 0.08} className={x.key === "coe" ? "group relative overflow-hidden rounded-[28px] bg-navy text-white md:col-span-2 lg:col-span-1" : "group overflow-hidden rounded-[28px] bg-white ring-1 ring-line"}>
                <div className="relative h-56 overflow-hidden">
                  <DuoImage name={x.image} tone={x.key === "coe" ? "gold" : "navy"} sizes="33vw" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" />
                  <span className="absolute left-6 top-6 font-cond text-[13px] uppercase tracking-[0.2em] text-white">0{i + 1}</span>
                </div>
                <div className="p-8">
                  <h3 className={x.key === "coe" ? "flex items-center gap-3 text-2xl font-medium" : "text-2xl font-medium text-navy"}>{x.key === "coe" && <Building2 className="h-6 w-6 text-gold" />}{x.title}</h3>
                  <p className={x.key === "coe" ? "mt-3 text-white/75" : "mt-3 text-muted"}>{x.text}</p>
                  <div className={x.key === "coe" ? "mt-6 font-cond text-[12px] uppercase tracking-[0.2em] text-gold" : "mt-6 font-cond text-[12px] uppercase tracking-[0.2em] text-teal"}>{x.key === "coe" ? "Long-term vision" : "Proposed initiative"}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 flex flex-wrap gap-4">
            <Link href="/committee" className="btn btn-teal">Meet the committee <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/partnerships" className="btn btn-outline">Support our initiatives</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
