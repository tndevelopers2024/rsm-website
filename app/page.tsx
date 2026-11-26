import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Users, GraduationCap, Microscope, HeartHandshake, Globe2, Building2, Quote } from "lucide-react";
import { about, congress, conferences, news, site, committee, registerHref, registerLabel } from "@/lib/content";
import { MemberCard } from "@/components/MemberCard";
import { DuoImage } from "@/components/DuoImage";
import { Orbits } from "@/components/Orbits";
import { CircleText } from "@/components/CircleText";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ParticleWaves, DotGrid, Glow } from "@/components/Abstracts";
import { Reveal, RevealMask, SplitHeading } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { Countdown } from "@/components/Countdown";
import { Timeline } from "@/components/Timeline";
import { Marquee } from "@/components/Marquee";
import { Pending } from "@/components/Pending";
import { ContactForm } from "@/components/ContactForm";
import { PhotoCollage } from "@/components/PhotoCollage";

const pillarIcons = [GraduationCap, Microscope, HeartHandshake, Globe2];

export default function Home() {
  return (
    <>
      {/* ============================== 1. HERO (fits one screen) ============================== */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-deep pt-[118px] text-white sm:pt-[112px] lg:h-[100svh] lg:min-h-[620px]">
        <HeroSlideshow
            className="-z-20"
            slides={[
              { image: "aflarGroup", label: "Collaboration", position: "60% center" },
              { image: "heroJoint", label: "Science", position: "70% center" },
              { image: "aflarBallroom", label: "Education", position: "60% center" },
              { image: "aflarOpening", label: "Expertise", position: "75% center" },
            ]}
            indicatorClassName="absolute bottom-[calc(3vh+150px)] right-[max(24px,calc((100vw-1320px)/2+40px))] z-20 hidden lg:flex"
          />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-navy-deep/55 lg:hidden" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,32,52,.95)_0%,rgba(11,32,52,.82)_32%,rgba(11,32,52,.35)_58%,rgba(11,32,52,.05)_80%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-deep/60 to-transparent" />
        </div>

        <div className="wrap grid min-h-0 flex-1 items-center py-6 sm:py-0">
          <div className="relative z-10 max-w-[680px]">
            <Reveal>
              <span className="eyebrow-plain text-[11px] text-white/75 sm:text-[12px]">Established 2015 &nbsp;|&nbsp; Mauritius</span>
            </Reveal>
            <h1 className="mt-4 font-display text-[clamp(1.85rem,8.2vw,2.3rem)] font-light leading-[1.1] tracking-[-0.025em] sm:mt-[2.2vh] sm:text-[clamp(2.1rem,min(4.3vw,7.4vh),4.4rem)] sm:leading-[1.04] sm:tracking-[-0.03em]">
              <span className="block sm:whitespace-nowrap"><SplitHeading text="Advancing Rheumatology." /></span>
              <span className="block sm:whitespace-nowrap font-serif italic text-sky"><SplitHeading text="Strengthening Care." delay={0.15} /></span>
              <span className="block sm:whitespace-nowrap"><SplitHeading text="Shaping the Future." delay={0.3} /></span>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-4 max-w-xl text-[14.5px] leading-[1.65] text-white/80 sm:mt-[2.4vh] sm:text-[clamp(.95rem,2.1vh,1.12rem)] sm:leading-relaxed">
                Rheumatology Society, Mauritius brings together healthcare professionals, researchers and partners to advance medical education, scientific research, awareness and collaborative care.
              </p>
            </Reveal>
            <Reveal delay={0.65} className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-[3vh] sm:flex sm:flex-wrap sm:gap-3">
              <Link href="/paflar-2027/register" className="btn btn-red col-span-2 !gap-2 !py-3.5 !text-[14px] sm:!px-8 sm:!text-[15px]">Register now <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/paflar-2027" className="btn btn-ghost !px-3 !py-3 !text-[13px] sm:!px-7 sm:!text-[15px]"><span className="sm:hidden">PAFLAR 2027</span><span className="hidden sm:inline">Explore PAFLAR 2027</span></Link>
              <Link href="/about" className="btn btn-ghost !px-3 !py-3 !text-[13px] sm:!px-7 sm:!text-[15px]"><span className="sm:hidden">Our Society</span><span className="hidden sm:inline">Discover Our Society</span></Link>
            </Reveal>
          </div>

        </div>

        {/* feature cards inside the first screen */}
        <div className="wrap pb-5 sm:pb-[3vh]">
          <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
            <Reveal delay={0.8} className="flex items-center gap-6 rounded-[18px] bg-ink/95 px-4 py-3.5 ring-1 ring-white/10 sm:rounded-[22px] sm:p-5 md:p-6">
              <div className="min-w-0 flex-1">
                <span className="font-cond text-[11.5px] uppercase tracking-[0.12em] text-teal-bright sm:text-[13px]">Featured Congress</span>
                <h3 className="mt-0.5 truncate text-[15.5px] font-medium text-white sm:mt-1 sm:text-[18px]">7th PAFLAR Congress · {congress.dates}</h3>
                <p className="mt-1 flex items-center gap-1.5 truncate text-[13px] text-white/55"><MapPin className="h-3.5 w-3.5 shrink-0" />{congress.venue}, Flic-en-Flac</p>
              </div>
              <Countdown target={congress.startISO} className="hidden w-[230px] shrink-0 [&>div]:py-2 [&_div:first-child]:text-xl sm:grid" />
            </Reveal>
            <Reveal delay={0.9} className="hidden md:block">
              <Link href="/education" className="group flex h-full flex-col justify-between rounded-[22px] bg-teal-bright p-5 text-navy-deep transition hover:-translate-y-1 md:p-6">
                <span className="font-cond text-[13px] uppercase tracking-[0.12em]">Education & CPD</span>
                <span className="mt-1 flex items-end justify-between gap-3 text-[16px] font-medium leading-snug">Quarterly CPD for healthcare professionals <ArrowUpRight className="h-5 w-5 shrink-0 transition group-hover:rotate-45" /></span>
              </Link>
            </Reveal>
            <Reveal delay={1} className="hidden md:block">
              <Link href="/about#initiatives" className="group flex h-full flex-col justify-between rounded-[22px] bg-sky p-5 text-navy-deep transition hover:-translate-y-1 md:p-6">
                <span className="font-cond text-[13px] uppercase tracking-[0.12em]">Our Vision</span>
                <span className="mt-1 flex items-end justify-between gap-3 text-[16px] font-medium leading-snug">A Centre of Excellence in Rheumatology <ArrowUpRight className="h-5 w-5 shrink-0 transition group-hover:rotate-45" /></span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== 2. ABOUT ============================== */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f9fa_55%,#eaf3f4_100%)] py-20 md:py-28">
        <Glow className="-left-40 top-10 -z-10 h-[420px] w-[420px]" color="rgba(8,127,131,.10)" />
        <Glow className="-right-32 top-1/3 -z-10 h-[520px] w-[520px]" color="rgba(57,143,168,.14)" />
        <Orbits className="absolute -right-56 -top-56 -z-10 w-[620px] opacity-70" stroke="rgba(8,127,131,.14)" />
        <DotGrid className="left-[38%] top-[8%] -z-10 h-[280px] w-[380px]" />
        <ParticleWaves className="inset-x-0 bottom-0 -z-10 h-[260px] w-full" opacity={0.28} />
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <div className="relative h-[460px] md:h-[560px]">
            <RevealMask className="absolute inset-0 right-[18%] bottom-[16%] overflow-hidden rounded-[28px]">
              <DuoImage name="heroTeam" tone="none" sizes="(min-width:1024px) 40vw, 90vw" className="h-full w-full" imgClassName="object-[60%_center]" alt="Delegates at a Society congress session" />
            </RevealMask>
            <RevealMask delay={0.2} className="absolute bottom-0 right-0 h-[44%] w-[50%] overflow-hidden rounded-[28px] border-[10px] border-white">
              <DuoImage name="aflarTalk" tone="none" sizes="25vw" className="h-full w-full" imgClassName="object-[40%_center]" alt="A speaker presenting at AFLAR 2019" />
            </RevealMask>
            <Reveal delay={0.4} className="absolute -left-2 bottom-[10%] rounded-3xl bg-navy p-7 text-white shadow-2xl md:-left-8">
              <div className="font-serif text-6xl font-light text-gold">2015</div>
              <div className="mt-1 font-cond text-[12px] uppercase tracking-[0.22em] text-white/70">Established in July</div>
            </Reveal>
            <CircleText text="EDUCATION · RESEARCH · AWARENESS · COLLABORATION · " color="#087f83" size={150} className="absolute -top-8 right-[8%] hidden md:block" />
          </div>
          <div>
            <SectionHead eyebrow="Who We Are" title={<span className="block text-[0.9em] leading-[1.12]">A professional medical <span className="sm:whitespace-nowrap">society for <em>Rheumatology</em></span> in Mauritius.</span>} />
            <Reveal delay={0.2}><p className="mt-8 text-[1.2rem] leading-relaxed text-ink">{about.whoWeAre[0]}</p></Reveal>
            <Reveal delay={0.25}><p className="mt-5 text-muted">{about.whoWeAre[1]}</p></Reveal>
            <Reveal delay={0.3}><p className="mt-5 text-muted">{about.whoWeAre[2]}</p></Reveal>
            <Reveal delay={0.35}><Link href="/about" className="btn btn-outline mt-10">More about the Society <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
        </div>
        <div className="wrap mt-16"><div className="grid gap-px overflow-hidden rounded-[28px] bg-line/70 shadow-[0_30px_60px_-45px_rgba(20,45,70,.45)] ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {about.pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <Reveal key={p.title} delay={i * 0.08} className="group bg-white/90 p-9 transition hover:bg-white">
                <Icon className="h-9 w-9 text-teal transition group-hover:scale-110" strokeWidth={1.4} />
                <h3 className="mt-6 text-xl font-semibold text-navy">{p.title}</h3>
                <p className="mt-3 text-[15.5px] text-muted">{p.text}</p>
              </Reveal>
            );
          })}
        </div></div>
      </section>

      {/* ============================== 3. MISSION & VISION ============================== */}
      <section className="grain relative isolate overflow-hidden bg-navy py-28 text-white md:py-36">
        <DuoImage name="microscope" tone="navy" className="!absolute inset-y-0 right-0 -z-10 w-1/2 opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/95 to-navy/60" />
        <Orbits className="absolute -left-60 bottom-[-300px] -z-10 w-[800px] opacity-50" />
        <div className="wrap">
          <SectionHead light eyebrow="Purpose" title={<>Guided by a clear vision for <em>Rheumatology care.</em></>} />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {[
              { n: "01", k: "Our Vision", t: about.vision, extra: true },
              { n: "02", k: "Our Mission", t: about.mission, t2: about.mission2 },
            ].map((x, i) => (
              <Reveal key={x.k} delay={i * 0.12} className="relative overflow-hidden rounded-[28px] bg-white/[.05] p-10 ring-1 ring-white/10 md:p-14">
                <Quote className="absolute right-10 top-10 h-16 w-16 text-white/5" />
                <div className="font-cond text-[14px] uppercase tracking-[0.25em] text-gold">{x.n} — {x.k}</div>
                <p className="mt-6 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-light leading-[1.5] text-white/90">{x.t}</p>
                {"t2" in x && x.t2 && <p className="mt-5 border-t border-white/10 pt-5 font-display text-[clamp(1.1rem,1.6vw,1.3rem)] font-light leading-[1.5] text-white/75">{x.t2}</p>}
                {x.extra && (
                  <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold/15 px-5 py-2.5 text-[14px] font-medium text-gold ring-1 ring-gold/35">
                    <Building2 className="h-4 w-4" /> Long-term goal: Centre of Excellence in Rheumatology
                  </div>
                )}
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap items-center gap-4 text-[14.5px] text-white/55">
            <Pending>Awaiting constitution</Pending> Formal aims and objectives will be published from the Society&apos;s approved constitution.
          </Reveal>
        </div>
      </section>

      {/* ============================== 4. JOURNEY ============================== */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_85%_10%,rgba(57,143,168,.16),transparent_55%),linear-gradient(180deg,#eef5f7_0%,#f6f9fb_100%)] py-20 md:py-28" id="journey">
        <Orbits className="absolute -right-64 -top-72 -z-10 w-[700px] opacity-70" stroke="rgba(57,143,168,.16)" />
        <DotGrid className="-left-20 bottom-0 -z-10 h-[360px] w-[520px]" />
        <ParticleWaves className="inset-x-0 -bottom-16 -z-10 h-[220px] w-full" color="#398fa8" opacity={0.22} rows={9} />
        <div className="wrap">
          <SectionHead
            eyebrow="Our Institutional Journey"
            title={<>A decade of building <em>Rheumatology</em> in Mauritius.</>}
            lead="From our founding in 2015 to hosting an international paediatric rheumatology congress in 2027, each milestone reflects the Society's commitment to education, awareness and collaboration."
          />
          <div className="mt-20"><Timeline /></div>
        </div>
      </section>

      {/* ============================== 5. PAFLAR FEATURE ============================== */}
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        <DuoImage name="heroSea" tone="none" className="!absolute inset-0 -z-20" imgClassName="object-[30%_center]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(11,32,52,.97)_0%,rgba(11,32,52,.88)_40%,rgba(11,32,52,.35)_75%,rgba(11,32,52,.2)_100%)]" />
        <div className="wrap grid min-h-[860px] items-center gap-14 py-28 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <Reveal><div className="font-serif text-[clamp(7rem,14vw,12rem)] font-light leading-[.8] text-transparent [-webkit-text-stroke:1.5px_rgba(199,166,90,.7)]">07</div></Reveal>
            <Reveal delay={0.1}><span className="eyebrow-plain mt-6 block text-gold">Featured Congress · Mauritius 2027</span></Reveal>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[1.04]">
              <SplitHeading text="The 7th PAFLAR Congress comes to Mauritius." />
            </h2>
            <Reveal delay={0.25}><p className="mt-7 max-w-xl text-[1.1rem] leading-relaxed text-white/75">{congress.intro}</p></Reveal>
            <Reveal delay={0.35}>
              <blockquote className="mt-9 max-w-2xl border-l-2 border-gold pl-6 font-serif text-[1.35rem] font-light italic leading-snug text-sky">
                &ldquo;{congress.theme}&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-4">
              <Link href="/paflar-2027" className="btn btn-gold">Explore the Congress <ArrowRight className="h-4 w-4" /></Link>
              <a href={registerHref} className="btn btn-ghost">{registerLabel} <ArrowUpRight className="h-4 w-4" /></a>
            </Reveal>
          </div>
          <div className="space-y-4">
            {[
              { i: CalendarDays, k: "Dates", v: congress.dates },
              { i: GraduationCap, k: "Pre-congress workshop · 7 May", v: congress.workshopVenue },
              { i: MapPin, k: "Main congress · 8–9 May", v: `${congress.venue}, Flic-en-Flac` },
            ].map((f, i) => (
              <Reveal key={f.k} delay={0.15 + i * 0.1} className="flex items-center gap-5 rounded-2xl bg-white/[.07] p-6 ring-1 ring-white/12  transition hover:translate-x-2 hover:bg-white/[.12]">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold"><f.i className="h-6 w-6" /></span>
                <div>
                  <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-white/55">{f.k}</div>
                  <div className="mt-0.5 font-display text-[18px] font-medium">{f.v}</div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.5} className="rounded-2xl bg-white/[.07] p-6 ring-1 ring-white/12 ">
              <div className="flex items-center gap-3 font-cond text-[12px] uppercase tracking-[0.2em] text-white/55"><Users className="h-4 w-4 text-gold" /> Organising collaboration</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {congress.organisers.map((o) => <span key={o} className="rounded-full px-4 py-2 text-[14px] ring-1 ring-white/25">{o}</span>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== 6+7. EDUCATION & RESEARCH (bento) ============================== */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(160deg,#ffffff_0%,#f3f8fa_60%,#e8f2f4_100%)] py-20 md:py-28">
        <Glow className="-left-48 bottom-0 -z-10 h-[480px] w-[480px]" color="rgba(199,166,90,.12)" />
        <ParticleWaves className="inset-x-0 top-0 -z-10 h-[240px] w-full rotate-180" opacity={0.2} rows={10} />
        <div className="wrap">
          <SectionHead
            eyebrow="Education, CPD & Research"
            title={<>Learning and evidence that <em>keep practice current.</em></>}
            aside={<Link href="/education" className="btn btn-outline">Education & CPD <ArrowRight className="h-4 w-4" /></Link>}
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-12 lg:grid-rows-[300px_300px]">
            <Reveal className="group relative overflow-hidden rounded-[28px] lg:col-span-7 lg:row-span-2">
              <Link href="/education" className="block h-full min-h-[420px]">
                <DuoImage name="heroPanel" tone="none" sizes="60vw" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-9 text-white md:p-12">
                  <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-gold">Education & CPD</span>
                  <h3 className="mt-3 max-w-lg text-[clamp(1.6rem,2.6vw,2.3rem)] font-light leading-tight">Quarterly continuing professional development</h3>
                  <p className="mt-3 max-w-lg text-white/75">The Society conducts quarterly CPD activities to encourage continuing medical education and professional learning.</p>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="group relative overflow-hidden rounded-[28px] bg-teal p-9 text-white lg:col-span-5">
              <Link href="/research" className="block h-full">
                <Microscope className="h-10 w-10 text-white/80" strokeWidth={1.3} />
                <h3 className="mt-6 text-2xl font-medium">Research & publications</h3>
                <p className="mt-3 text-white/80">Encouraging rheumatology research, disease registries and locally relevant clinical guidelines.</p>
                <ArrowUpRight className="absolute right-8 top-8 h-6 w-6 transition group-hover:rotate-45" />
              </Link>
            </Reveal>
            <Reveal delay={0.2} className="group relative overflow-hidden rounded-[28px] lg:col-span-5">
              <Link href="/about#initiatives" className="block h-full min-h-[300px]">
                <DuoImage name="aflarTalk" tone="none" sizes="40vw" imgClassName="object-[40%_center]" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-navy-deep/10" />
                <div className="absolute inset-x-0 bottom-0 p-9 text-white">
                  <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-gold">Future initiatives</span>
                  <h3 className="mt-2 text-2xl font-medium">Disease registries & the Centre of Excellence</h3>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== 8. AWARENESS ============================== */}
      <section className="grid lg:grid-cols-2">
        <RevealMask className="relative min-h-[460px] lg:min-h-[700px]">
          <DuoImage name="holdingHands" tone="teal" sizes="50vw" className="!absolute inset-0" alt="Supportive hands" />
        </RevealMask>
        <div className="relative isolate flex flex-col justify-center overflow-hidden bg-teal px-6 py-24 text-white md:px-20">
          <Orbits className="absolute -right-52 -top-52 -z-10 w-[600px] opacity-60" />
          <Reveal><span className="eyebrow !text-sky">Patient Awareness & Advocacy</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 font-display text-[clamp(2.1rem,3.8vw,3.4rem)] font-light leading-[1.08]">Helping the public understand <em className="font-serif italic">rheumatic diseases.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="mt-6 max-w-lg text-white/85">We promote public awareness of rheumatic diseases and support patient advocacy initiatives, from community events to awareness of rheumatic disease in children.</p></Reveal>
          <Reveal delay={0.3} className="mt-10 flex items-center gap-6 rounded-2xl bg-black/15 p-6">
            <div className="shrink-0 whitespace-nowrap font-serif text-5xl font-light leading-none">12<span className="text-2xl"> Oct</span></div>
            <p className="text-[15px] text-white/85">World Arthritis Day 2017 at the Municipality of Quatre Bornes, with the Association of Rheumatology Concern (ARC) and the Chinese Universities Graduate Union.</p>
          </Reveal>
          <Reveal delay={0.4}><Link href="/awareness" className="btn btn-white mt-10">Awareness & advocacy <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      {/* ============================== 9. INTERNATIONAL ============================== */}
      <section className="relative isolate overflow-hidden bg-ink py-28 text-white md:py-36">
        <Orbits className="absolute -right-72 top-1/2 -z-10 w-[900px] -translate-y-1/2 opacity-40" />
        <div className="wrap">
          <SectionHead
            light
            eyebrow="International Collaboration"
            title={<>Connected to the global <em>Rheumatology community.</em></>}
            lead="Society members take part in leading international meetings, bringing current knowledge home and representing Mauritius abroad."
            aside={<Link href="/international" className="btn btn-ghost">Our international engagement <ArrowRight className="h-4 w-4" /></Link>}
          />
        </div>
        <Marquee items={["IRACON", "EULAR", "ACR", "Société Française de Rhumatologie", "PAFLAR 2027"]} className="mt-20 border-y border-white/10 py-8 text-white/85" />
        <div className="wrap mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {conferences.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.08} className="rounded-2xl bg-white/[.05] p-7 ring-1 ring-white/10 transition hover:bg-white/[.09]">
              <div className="font-cond text-[13px] uppercase tracking-[0.2em] text-gold">{c.region}</div>
              <div className="mt-3 font-display text-3xl font-bold tracking-tight">{c.code}</div>
              <p className="mt-2 text-[14.5px] text-white/60">{c.name}</p>
            </Reveal>
          ))}
        </div>
        <p className="wrap mt-6 text-[13.5px] text-white/45">Listed as international conference participation, not formal institutional affiliations.</p>
      </section>

      {/* ============================== 10. COMMITTEE ============================== */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_10%_0%,rgba(8,127,131,.12),transparent_50%),linear-gradient(180deg,#f1f7f8_0%,#f7fafb_100%)] py-20 md:py-28">
        <DotGrid className="right-0 top-0 -z-10 h-[340px] w-[520px]" />
        <div className="wrap">
          <SectionHead eyebrow="The Team" title={<>The people leading <em>the Society.</em></>} lead="Consultant rheumatologists and physicians from hospitals and private practice across Mauritius." />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {committee.slice(0, 4).map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}><MemberCard m={m} i={i} /></Reveal>
            ))}
          </div>
          <Reveal className="mt-10"><Link href="/committee" className="btn btn-outline">Meet the full team <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      {/* ============================== 11. PARTNERSHIPS ============================== */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6f7_100%)] py-20 md:py-28">
        <Glow className="left-1/2 top-1/3 -z-10 h-[520px] w-[820px] -translate-x-1/2" color="rgba(57,143,168,.12)" />
        <div className="wrap">
          <Reveal className="relative isolate grid gap-12 overflow-hidden rounded-[36px] bg-navy p-10 text-white md:p-16 lg:grid-cols-[1.1fr_1fr] lg:p-20">
            <DuoImage name="hospital" tone="navy" className="!absolute inset-0 -z-20 opacity-40" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
            <div>
              <span className="eyebrow !text-gold">Institutional Partnerships & Support</span>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.1]">Partner with us to advance Rheumatology in <em className="font-serif italic text-sky">Mauritius.</em></h2>
              <p className="mt-6 max-w-lg text-white/75">We welcome conversations with universities, healthcare institutions, international medical associations, corporate sponsors and philanthropic organisations who share our commitment to education, research and patient care.</p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              {[
                ["Institutional partnerships", "Universities, hospitals & associations", "/partnerships"],
                ["PAFLAR 2027 sponsorship", "Congress sponsorship enquiries", "/paflar-2027/sponsorship"],
                ["Support our initiatives", "Registries, research & the Centre of Excellence", "/partnerships"],
              ].map(([t, s, h]) => (
                <Link key={t} href={h} className="group flex items-center justify-between rounded-2xl bg-white/[.07] px-7 py-6 ring-1 ring-white/12 transition hover:bg-white hover:text-navy">
                  <div><div className="font-display text-lg font-semibold">{t}</div><div className="text-[14px] opacity-70">{s}</div></div>
                  <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== 12. NEWS ============================== */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#eef6f7_0%,#f8fbfc_45%,#ffffff_100%)] pb-20 md:pb-28">
        <ParticleWaves className="inset-x-0 bottom-0 -z-10 h-[220px] w-full" opacity={0.18} rows={9} />
        <div className="wrap">
          <SectionHead eyebrow="News & Events" title={<>Latest from <em>the Society.</em></>} aside={<Link href="/news" className="btn btn-outline">All news & events <ArrowRight className="h-4 w-4" /></Link>} />
          <div className="mt-16 grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
            {news.slice(0, 3).map((n, i) => (
              <Reveal key={n.title} delay={i * 0.1}>
                <Link href={n.href} className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-line transition hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-45px_rgba(20,45,70,.55)]">
                  <div className={i === 0 ? "relative aspect-[16/10]" : "relative aspect-[4/3]"}>
                    <DuoImage name={n.image} tone="none" sizes="40vw" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" />
                    <span className="absolute left-5 top-5 rounded-full bg-white px-3.5 py-1 font-cond text-[12px] uppercase tracking-[0.16em] text-navy">{n.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="font-cond text-[12.5px] uppercase tracking-[0.2em] text-teal">{n.date}</div>
                    <h3 className={i === 0 ? "mt-3 text-[26px] font-medium leading-snug text-navy" : "mt-3 text-xl font-semibold leading-snug text-navy"}>{n.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] text-muted">{n.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-cond text-[13px] uppercase tracking-[0.16em] text-navy">Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== 13. GALLERY COLLAGE ============================== */}
      <section className="relative isolate overflow-hidden bg-navy-deep py-24 text-white md:py-32" id="gallery">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Glow className="-left-40 top-20 h-[520px] w-[520px]" color="rgba(57,143,168,.22)" />
          <Glow className="-right-40 bottom-10 h-[560px] w-[560px]" color="rgba(199,166,90,.14)" />
          <ParticleWaves className="inset-x-0 bottom-0 h-[260px] w-full" color="#8fd3e8" opacity={0.18} rows={10} />
        </div>
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHead light eyebrow="Gallery" title={<>Moments from <em>our congresses.</em></>} lead="Scenes from the Rheumatology Congress Mauritius 2026 and the Society's international engagement. Tap any photograph to view it in full." />
            <Reveal delay={0.2} className="flex flex-wrap gap-2 lg:justify-end">
              {["Congress 2026", "Faculty & speakers", "Delegates", "AFLAR"].map((c) => <span key={c} className="rounded-full px-4 py-2 font-cond text-[13px] uppercase tracking-[0.12em] text-white/80 ring-1 ring-white/20">{c}</span>)}
            </Reveal>
          </div>
          <div className="mt-16 lg:mt-20"><PhotoCollage /></div>
          <Reveal className="mt-16 flex justify-center lg:mt-20">
            <Link href="/gallery" className="btn btn-gold">View the full gallery <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* ============================== 14. CONTACT ============================== */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_0%_100%,rgba(8,127,131,.14),transparent_50%),radial-gradient(ellipse_at_100%_0%,rgba(199,166,90,.12),transparent_45%),linear-gradient(180deg,#ffffff,#f3f8f9)] py-20 md:py-28">
        <DotGrid className="right-[8%] top-[10%] -z-10 h-[300px] w-[420px]" />
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Contact Us" title={<>Get in touch with <em>the Society.</em></>} lead="For membership, education, partnership or congress enquiries, write to us and the appropriate committee member will respond." />
            <Reveal delay={0.2} className="mt-10 space-y-6">
              <div><div className="font-cond text-[12px] uppercase tracking-[0.2em] text-muted">Email</div><div className="mt-1 font-display text-xl font-semibold text-navy">{site.email}</div>{site.emailPending && <div className="mt-2"><Pending>Proposed address</Pending></div>}</div>
              <div><div className="font-cond text-[12px] uppercase tracking-[0.2em] text-muted">Location</div><div className="mt-1 font-display text-xl font-semibold text-navy">Mauritius</div></div>
            </Reveal>
          </div>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
