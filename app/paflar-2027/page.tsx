import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Plane, Thermometer, UserRound, Hotel, Sparkles, Handshake } from "lucide-react";
import { congress, programme, paflarThemes, travelFacts } from "@/lib/content";
import { DuoImage } from "@/components/DuoImage";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { Orbits } from "@/components/Orbits";
import { CircleText } from "@/components/CircleText";
import { Reveal, RevealMask, SplitHeading } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { Countdown } from "@/components/Countdown";
import { CongressSubNav } from "@/components/CongressSubNav";
import { CongressCta } from "@/components/CongressCta";
import { Pending } from "@/components/Pending";

export const metadata: Metadata = pageMeta({ title: "7th PAFLAR Congress · Mauritius 2027", description: "7–9 May 2027 at the Hilton Mauritius Resort & Spa, Flic-en-Flac. Join the 7th PAFLAR Congress, hosted by the Rheumatology Society, Mauritius.", path: "/paflar-2027", paflar: true });

export default function CongressPage() {
  return (
    <>
      {/* HERO */}
      <section className="grain relative isolate flex min-h-[100svh] items-center py-10 lg:h-[100svh] lg:min-h-[600px] lg:py-0 overflow-hidden bg-navy-deep pt-[112px] text-white">
          <HeroSlideshow
            className="-z-20"
            slides={[
              { image: "heroSea", label: "Mauritius 2027", position: "50% center" },
              { image: "heroPanel", label: "Scientific sessions", position: "60% center" },
              { image: "heroTeam", label: "Collaboration", position: "65% center" },
            ]}
            indicatorClassName="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 lg:flex"
          />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(11,32,52,.82),rgba(11,32,52,.55)_60%,rgba(11,32,52,.35)_100%),linear-gradient(0deg,rgba(11,32,52,.85),transparent_40%)]" />
        <Orbits className="absolute left-1/2 top-1/2 -z-10 w-[1300px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <CircleText text="7TH PAFLAR CONGRESS · MAURITIUS 2027 · " size={180} className="absolute right-[6%] top-[18%] hidden lg:block" color="#c7a65a" />
        <div className="wrap text-center">
          <Reveal><span className="inline-flex items-center gap-3 rounded-full border border-gold/50 px-4 py-1.5 font-cond text-[11px] uppercase tracking-[0.18em] text-gold sm:px-5 sm:py-2 sm:text-[13px] sm:tracking-[0.24em]">7th PAFLAR Congress<span className="hidden sm:inline">&nbsp;· Mauritius 2027</span></span></Reveal>
          <h1 className="mx-auto mt-4 max-w-5xl font-display text-[clamp(1.75rem,7.6vw,2.2rem)] font-light leading-[1.1] tracking-[-0.025em] sm:mt-[2.5vh] sm:text-[clamp(2.1rem,min(5vw,7vh),4.8rem)] sm:leading-[1.04] sm:tracking-[-0.03em]">
            <SplitHeading text="Where Global Expertise Meets" />{" "}
            <span className="font-serif italic text-gold"><SplitHeading text="the Future" delay={0.25} /></span>{" "}
            <SplitHeading text="of Paediatric Rheumatology." delay={0.35} />
          </h1>
          <Reveal delay={0.5}><p className="mx-auto mt-3.5 max-w-2xl text-[14.5px] leading-relaxed text-white/80 sm:mt-[2.5vh] sm:text-[clamp(.95rem,2.1vh,1.15rem)]">{congress.sub}</p></Reveal>
          <Reveal delay={0.6} className="mx-auto mt-5 grid w-full grid-cols-2 overflow-hidden rounded-2xl sm:mt-[3.5vh] sm:inline-grid sm:w-auto bg-white/[.07] text-left ring-1 ring-white/20 backdrop-blur-xl sm:grid-cols-3">
            {[
              { i: CalendarDays, k: "Dates", v: congress.dates },
              { i: Hotel, k: "Venue", v: congress.venue },
              { i: MapPin, k: "Location", v: congress.location },
            ].map((x, i) => (
              <div key={x.k} className={`flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-[1.6vh] ${i === 1 ? "col-span-2 order-last border-t border-white/15 sm:order-none sm:col-span-1 sm:border-l sm:border-t-0" : ""} ${i === 2 ? "border-l border-white/15" : ""}`}>
                <x.i className="h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5" />
                <div><div className="font-cond text-[11px] uppercase tracking-[0.2em] text-gold">{x.k}</div><div className="font-display text-[14.5px] font-medium leading-snug sm:text-base">{x.v}</div></div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.8} className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-[3.5vh] sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
            <a href="#overview" className="btn btn-gold !gap-1.5 !px-3 !py-3 !text-[13px] sm:!gap-2.5 sm:!px-7 sm:!py-3.5 sm:!text-[15px]"><span className="sm:hidden">The Congress</span><span className="hidden sm:inline">Explore the Congress</span> <ArrowRight className="h-4 w-4" /></a>
            <a href={congress.links.main} target="_blank" rel="noopener noreferrer" className="btn btn-red !gap-1.5 !px-3 !py-3 !text-[13px] sm:!gap-2.5 sm:!px-7 sm:!py-3.5 sm:!text-[15px]"><span className="sm:hidden">Register</span><span className="hidden sm:inline">Official Registration</span> <ArrowUpRight className="h-4 w-4" /></a>
            <Link href="/contact?type=sponsorship" className="btn btn-ghost col-span-2 !py-2.5 !text-[12.5px] sm:!py-3.5 sm:!text-[15px]">Sponsorship Enquiries</Link>
          </Reveal>
        </div>
      </section>

      <CongressSubNav />

      {/* INTRO + THEME */}
      <section id="overview" className="scroll-mt-40 py-28 md:py-36">
        <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHead eyebrow="Congress Introduction" title={<>Three days shaping <em>paediatric Rheumatology</em> in Africa.</>} />
            <Reveal delay={0.15}><p className="mt-8 text-[1.15rem] text-muted">{congress.intro}</p></Reveal>
            <Reveal delay={0.25} className="mt-10">
              <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-muted">Organising collaboration</div>
              <div className="mt-4 flex flex-wrap gap-2">{congress.organisers.map((o) => <span key={o} className="rounded-full bg-aqua px-4 py-2 text-[14.5px] font-medium text-navy">{o}</span>)}</div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-navy to-[#1b4a6b] p-10 text-white md:p-14">
            <span className="pointer-events-none absolute -right-2 -top-10 font-serif text-[240px] leading-none text-gold/15">&ldquo;</span>
            <span className="font-cond text-[13px] uppercase tracking-[0.24em] text-gold">Official Congress Theme</span>
            <h3 className="relative mt-6 font-serif text-[clamp(1.7rem,2.6vw,2.3rem)] font-light leading-[1.3]">
              Shaping the Future of Paediatric Rheumatology in Africa: <em className="text-sky">Precision Medicine, Innovation, and Collaborative Care.</em>
            </h3>
            <div className="mt-8 flex flex-wrap gap-2">{congress.themeParts.map((p) => <span key={p} className="rounded-full bg-white/10 px-4 py-2 font-cond text-[13px] uppercase tracking-[0.12em]">{p}</span>)}</div>
          </Reveal>
        </div>
      </section>

      {/* PAFLAR themes */}
      <section className="relative isolate overflow-hidden bg-ink py-28 text-white md:py-36">
        <Orbits className="absolute -left-60 top-0 -z-10 w-[800px] opacity-40" />
        <div className="wrap">
          <SectionHead light eyebrow="About PAFLAR" title={<>Advancing paediatric Rheumatology <em>across Africa.</em></>} lead="PAFLAR, the Paediatric Society of the African League Against Rheumatism, works for children living with rheumatic diseases through:" />
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paflarThemes.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.08} className="rounded-2xl bg-white/[.05] p-8 ring-1 ring-white/10 transition hover:bg-white/[.09]">
                <div className="font-serif text-3xl font-light text-gold">0{i + 1}</div>
                <h3 className="mt-4 text-xl font-medium">{t.title}</h3>
                <p className="mt-2 text-[15px] text-white/60">{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DATE & VENUE */}
      <section className="py-28 md:py-36">
        <div className="wrap grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="flex flex-col justify-between rounded-[32px] bg-mist p-10 md:p-14">
            <div>
              <span className="eyebrow">Date & Venue</span>
              <h2 className="h-section mt-5">{congress.venue}</h2>
              <p className="mt-5 text-muted">On Mauritius&apos; western coast at Flic-en-Flac, known for its sheltered lagoon and sunsets. Approximately 50–60 minutes by road from {travelFacts.airport}.</p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {programme.map((d) => (
                <div key={d.day} className="rounded-2xl bg-white p-5">
                  <div className="font-serif text-4xl font-light text-navy">{d.day}</div>
                  <div className="font-cond text-[11.5px] uppercase tracking-[0.16em] text-muted">May 2027</div>
                  <div className="mt-2 text-[13.5px] font-medium text-teal">{d.kind}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <RevealMask className="relative min-h-[460px] overflow-hidden rounded-[32px]">
            {process.env.NEXT_PUBLIC_PREVIEW === "1" ? (
              <div className="duo duo-ocean absolute inset-0 grid place-items-center text-center text-white">
                <div><MapPin className="mx-auto h-10 w-10 text-gold" /><div className="mt-3 font-display text-xl">Hilton Mauritius Resort & Spa</div><div className="mt-1 text-white/70">Flic-en-Flac · interactive map on the live site</div></div>
              </div>
            ) : (
            <iframe
              title="Map: Hilton Mauritius Resort & Spa, Flic-en-Flac"
              src="https://www.google.com/maps?q=Hilton+Mauritius+Resort+%26+Spa,+Flic+en+Flac&z=13&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[.4]"
              loading="lazy"
            />
            )}
          </RevealMask>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="bg-mist py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Programme at a Glance" title={<>Pre-congress workshop & <em>scientific sessions.</em></>} aside={<Link href="/paflar-2027/programme" className="btn btn-outline">Full programme <ArrowRight className="h-4 w-4" /></Link>} />
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {programme.map((d, i) => (
              <Reveal key={d.day} delay={i * 0.1} className={`relative overflow-hidden rounded-[28px] bg-white p-10 ${i === 0 ? "border-t-4 border-gold" : "border-t-4 border-teal"}`}>
                <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-muted">{d.weekday} · May 2027</div>
                <div className="mt-2 font-serif text-[88px] font-light leading-none text-navy">{d.day}</div>
                <h3 className="mt-6 text-2xl font-medium text-navy">{d.title}</h3>
                <p className="mt-3 text-muted">{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Speakers & Faculty" title={<>International <em>faculty.</em></>} aside={<Pending>Faculty to be announced</Pending>} />
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {["Keynote speaker", "Keynote speaker", "Faculty", "Faculty"].map((r, i) => (
              <Reveal key={i} delay={i * 0.08} className="text-center">
                <div className="duo duo-ocean relative mx-auto aspect-square max-w-[220px] rounded-full ring-8 ring-mist"><div className="absolute inset-0 grid place-items-center"><UserRound className="h-16 w-16 text-white/50" strokeWidth={1} /></div></div>
                <h3 className="mt-5 text-lg font-semibold text-navy">To be announced</h3>
                <p className="text-[14.5px] text-muted">{r}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION + SPONSORSHIP */}
      <section className="pb-28 md:pb-36">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="relative isolate overflow-hidden rounded-[32px] bg-crimson p-10 text-white md:p-14">
            <Orbits className="absolute -right-40 -top-40 -z-10 w-[500px] opacity-50" />
            <span className="font-cond text-[13px] uppercase tracking-[0.24em] text-white/70">Registration</span>
            <h3 className="mt-4 font-display text-4xl font-light">Register for the congress</h3>
            <p className="mt-4 max-w-md text-white/80">Registration and payment are handled by the official organisers. Delegate categories and fees are published by PAFLAR.</p>
            <a href={congress.links.main} target="_blank" rel="noopener noreferrer" className="btn btn-white mt-10">Official Registration <ArrowUpRight className="h-4 w-4" /></a>
            <div className="mt-6"><span className="pill-tag !border-white/40 !bg-white/10 !text-white">Final registration URL to be confirmed by organisers</span></div>
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[32px] bg-gold-soft p-10 ring-1 ring-[#eadbb4] md:p-14" >
            <Handshake className="absolute right-10 top-10 h-14 w-14 text-gold/40" strokeWidth={1} />
            <span className="font-cond text-[13px] uppercase tracking-[0.24em] text-[#8a6d22]">Sponsorship</span>
            <h3 className="mt-4 font-display text-4xl font-light text-navy">Sponsorship opportunities</h3>
            <p className="mt-4 max-w-md text-muted">Align your organisation with the advancement of paediatric rheumatology in Africa and engage an international audience of clinicians and researchers.</p>
            <Link href="/contact?type=sponsorship" className="btn btn-outline mt-10">Sponsorship Enquiries <ArrowRight className="h-4 w-4" /></Link>
            <div className="mt-6"><Pending>Sponsorship prospectus to be supplied</Pending></div>
          </Reveal>
        </div>
      </section>

      {/* DELEGATE GUIDES */}
      <section className="bg-navy-deep py-28 text-white md:py-36">
        <div className="wrap">
          <SectionHead light eyebrow="Delegate Guides" title={<>Plan your stay <em>in Mauritius.</em></>} />
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              { t: "Accommodation", d: "The host venue and nearby resorts along the west coast.", h: "/paflar-2027/accommodation", img: "infinityPool" as const, i: Hotel },
              { t: "Welcome to Mauritius", d: "Flic-en-Flac, island culture, cuisine and places to explore.", h: "/paflar-2027/mauritius", img: "palmBeach" as const, i: Sparkles },
              { t: "Travel & Logistics", d: `Arrive at MRU, ${travelFacts.transfer} to Flic-en-Flac. May days of ${travelFacts.weather[0].v}.`, h: "/paflar-2027/travel", img: "aerialBeach" as const, i: Plane },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <Link href={c.h} className="group relative block h-[480px] overflow-hidden rounded-[28px]">
                  <DuoImage name={c.img} tone="none" sizes="33vw" className="!absolute inset-0 transition duration-[1600ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <c.i className="h-7 w-7 text-gold" />
                    <h3 className="mt-4 text-2xl font-medium">{c.t}</h3>
                    <p className="mt-2 text-[15px] text-white/75">{c.d}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-cond text-[13px] uppercase tracking-[0.16em] text-sky">Open guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-6 text-[15px] text-white/60">
            <span className="flex items-center gap-2"><Thermometer className="h-4 w-4 text-gold" /> Early May: {travelFacts.weather.map((w) => `${w.k.toLowerCase()} ${w.v}`).join(" · ")}</span>
          </Reveal>
        </div>
      </section>

      <CongressCta />
    </>
  );
}
