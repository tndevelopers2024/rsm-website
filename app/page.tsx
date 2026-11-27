import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Users, GraduationCap, Microscope, HeartHandshake, Building2, Quote, Scale, Repeat, Sprout, Lightbulb, Presentation, ShieldCheck, Check } from "lucide-react";
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

const pillarIcons = [GraduationCap, HeartHandshake, Building2];
const valueIcons = [Scale, Repeat, Sprout, Lightbulb];

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
            <h1 className="mt-4 font-display text-[clamp(1.85rem,8.2vw,2.3rem)] font-light leading-[1.1] tracking-[-0.025em] sm:mt-[2.2vh] sm:text-[clamp(2.1rem,min(4vw,7vh),4.1rem)] sm:leading-[1.06] sm:tracking-[-0.03em]">
              <span className="block"><SplitHeading text="Bringing Rheumatology Together." /></span>
              <span className="block font-serif italic text-sky"><SplitHeading text="A Future Without Barriers." delay={0.15} /></span>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-4 max-w-xl text-[14.5px] leading-[1.65] text-white/85 sm:mt-[2.4vh] sm:text-[clamp(.95rem,2vh,1.1rem)] sm:leading-relaxed">
                From uniting African rheumatology communities in 2019 to shaping the future of paediatric rheumatology in 2027, the Rheumatology Society, Mauritius (RSM) is working to change how rheumatology is understood, practised and accessed.
              </p>
              <p className="mt-3 hidden max-w-xl text-[clamp(.85rem,1.8vh,.98rem)] leading-relaxed text-white/65 sm:block">
                We believe quality rheumatology care should not depend on where a patient lives, which hospital they visit or what they can afford.
              </p>
            </Reveal>
            <Reveal delay={0.65} className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-[3vh] sm:flex sm:flex-wrap sm:gap-3">
              <Link href="/paflar-2027/register" className="btn btn-red col-span-2 !gap-2 !py-3.5 !text-[14px] sm:!px-8 sm:!text-[15px]">Register now <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/paflar-2027" className="btn btn-ghost !px-3 !py-3 !text-[13px] sm:!px-7 sm:!text-[15px]"><span className="sm:hidden">PAFLAR 2027</span><span className="hidden sm:inline">Explore PAFLAR 2027</span></Link>
              <Link href="/#journey" className="btn btn-ghost !px-3 !py-3 !text-[13px] sm:!px-7 sm:!text-[15px]"><span className="sm:hidden">Our Journey</span><span className="hidden sm:inline">Discover Our Journey</span></Link>
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
            <SectionHead eyebrow="Who We Are" title={<span className="block text-[0.9em] leading-[1.12]">A Movement Towards <em>Better Rheumatology Care.</em></span>} />
            <Reveal delay={0.2}><p className="mt-8 text-[1.2rem] leading-relaxed text-ink">{about.whoWeAre[0]}</p></Reveal>
            <Reveal delay={0.25}><p className="mt-5 text-muted">{about.whoWeAre[1]}</p></Reveal>
            <Reveal delay={0.3}><p className="mt-5 text-muted">{about.whoWeAre[2]}</p></Reveal>
            <Reveal delay={0.35}><Link href="/about" className="btn btn-outline mt-10">Discover the Society <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
        </div>
        <div className="wrap mt-16"><Reveal><div className="mb-5 font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Three pillars of RSM&apos;s work</div></Reveal><div className="grid gap-px overflow-hidden rounded-[28px] bg-line/70 shadow-[0_30px_60px_-45px_rgba(20,45,70,.45)] ring-1 ring-line md:grid-cols-3">
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
          <SectionHead light eyebrow="Our Vision and Mission" title={<>A Future Where Quality Rheumatology Care Is <em>Accessible to Everyone.</em></>} />
          <div className="mt-8 grid max-w-5xl gap-5 md:grid-cols-2">
            {about.visionIntro.map((t, i) => <Reveal key={i} delay={0.1 + i * 0.08}><p className="text-[1.05rem] leading-relaxed text-white/75">{t}</p></Reveal>)}
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              { n: "01", k: "Our Vision", t: about.vision },
              { n: "02", k: "Our Mission", t: about.mission },
            ].map((x, i) => (
              <Reveal key={x.k} delay={i * 0.12} className="relative overflow-hidden rounded-[28px] bg-white/[.05] p-10 ring-1 ring-white/10 md:p-14">
                <Quote className="absolute right-10 top-10 h-16 w-16 text-white/5" />
                <div className="font-cond text-[14px] uppercase tracking-[0.25em] text-gold">{x.n} — {x.k}</div>
                <p className="mt-6 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-light leading-[1.5] text-white/90">{x.t}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16"><div className="font-cond text-[13px] uppercase tracking-[0.2em] text-sky">What guides our work</div></Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={v.title} delay={i * 0.08} className="rounded-2xl bg-white/[.04] p-7 ring-1 ring-white/10 transition hover:bg-white/[.08]">
                  <Icon className="h-8 w-8 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{v.text}</p>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-12"><Link href="/about" className="btn btn-ghost">Our Vision for Rheumatology in Mauritius <ArrowRight className="h-4 w-4" /></Link></Reveal>
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
            title={<>From Building a Society to <em>Uniting a Continent.</em></>}
            lead="RSM's journey reflects a commitment to making rheumatology more connected, accessible and sustainable."
          />
          <div className="mt-10 grid max-w-5xl gap-5 text-muted md:grid-cols-3">
            <Reveal delay={0.1}><p>What began as an effort to strengthen rheumatology in Mauritius grew into a wider contribution to African medical collaboration. The 2019 AFLAR Congress in Mauritius became a defining moment, bringing together rheumatology communities that had previously operated in more fragmented regional networks.</p></Reveal>
            <Reveal delay={0.15}><p>The collaboration helped create stronger connections across Southern, Northern, Eastern and Western Africa, encouraging scientific exchange, joint initiatives and greater opportunities for research and publication.</p></Reveal>
            <Reveal delay={0.2}><p>Today, RSM is building on that legacy. Its next ambition is to strengthen paediatric rheumatology education across the continent and help establish a common curriculum for training future specialists.</p></Reveal>
          </div>
          <Reveal className="mt-16"><div className="font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Key milestones</div></Reveal>
          <div className="mt-8"><Timeline /></div>
          <Reveal className="mt-12"><Link href="/about#journey" className="btn btn-outline">Explore Our Complete Journey <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      {/* ============================== 5. PAFLAR FEATURE ============================== */}
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        <DuoImage name="heroSea" tone="none" className="!absolute inset-0 -z-20" imgClassName="object-[30%_center]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(11,32,52,.97)_0%,rgba(11,32,52,.88)_40%,rgba(11,32,52,.35)_75%,rgba(11,32,52,.2)_100%)]" />
        <div className="wrap grid min-h-[860px] items-center gap-14 py-28 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <Reveal><div className="font-serif text-[clamp(7rem,14vw,12rem)] font-light leading-[.8] text-transparent [-webkit-text-stroke:1.5px_rgba(199,166,90,.7)]">07</div></Reveal>
            <Reveal delay={0.1}><span className="eyebrow-plain mt-6 block text-gold">Featured Congress · PAFLAR 2027</span></Reveal>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.9rem)] font-light leading-[1.06]">
              <SplitHeading text="From Regional Unity to a Shared Future for Paediatric Rheumatology." />
            </h2>
            <Reveal delay={0.2} className="mt-6 flex items-center gap-3 font-cond text-[13px] uppercase tracking-[0.18em]">
              <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-white/85 ring-1 ring-white/20">2019 · Regional unity</span>
              <ArrowRight className="h-4 w-4 text-gold" />
              <span className="rounded-full bg-gold/20 px-3.5 py-1.5 text-gold ring-1 ring-gold/40">2027 · A shared future</span>
            </Reveal>
            <Reveal delay={0.25}><p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-white/80">In 2019, Mauritius became a meeting point for African rheumatology communities, helping strengthen connections across a previously fragmented continent. In 2027, RSM is taking that commitment further.</p></Reveal>
            <Reveal delay={0.3}><p className="mt-4 max-w-xl text-white/65">The 7th PAFLAR Congress represents an opportunity to bring together paediatric rheumatologists, researchers, healthcare professionals and international experts to address one of the most important challenges facing the speciality: preparing the next generation of specialists through stronger, more consistent medical education. A key ambition is to work towards a common paediatric rheumatology curriculum that can support training, knowledge-sharing and clinical development across African countries.</p></Reveal>
            <Reveal delay={0.35}><p className="mt-4 max-w-xl text-white/65">Hosted by the Rheumatology Society, Mauritius and the Paediatric Society of Mauritius, in collaboration with PAFLAR, the congress will bring together regional and international expertise under the theme:</p></Reveal>
            <Reveal delay={0.4}>
              <blockquote className="mt-6 max-w-2xl border-l-2 border-gold pl-6 font-serif text-[1.3rem] font-light italic leading-snug text-sky">
                &ldquo;{congress.theme}&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-4">
              <Link href="/paflar-2027" className="btn btn-gold">Explore PAFLAR 2027 <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/paflar-2027/register" className="btn btn-ghost">Register for the Congress <ArrowUpRight className="h-4 w-4" /></Link>
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
              <div className="flex items-center gap-3 font-cond text-[12px] uppercase tracking-[0.2em] text-white/55"><Users className="h-4 w-4 text-gold" /> Organisers</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["RSM", "Paediatric Society of Mauritius", "PAFLAR"].map((o) => <span key={o} className="rounded-full px-4 py-2 text-[14px] ring-1 ring-white/25">{o}</span>)}
              </div>
            </Reveal>
            <Reveal delay={0.6} className="flex items-start gap-4 rounded-2xl bg-gold/10 p-6 ring-1 ring-gold/30">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
              <p className="text-[15px] text-white/85"><b className="font-semibold text-white">Registration:</b> All congress registrations will be managed directly by RSM, providing a centralised registration and payment process.</p>
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
            eyebrow="Education, CPD and Research"
            title={<>Building the Knowledge and Expertise That <em>Better Care Demands.</em></>}
            aside={<Link href="/education" className="btn btn-outline">Explore Education and Research <ArrowRight className="h-4 w-4" /></Link>}
          />
          <div className="mt-10 grid max-w-5xl gap-5 text-muted md:grid-cols-3">
            <Reveal delay={0.1}><p>RSM believes that advancing rheumatology requires continuous learning, access to scientific developments and opportunities for professionals to exchange knowledge beyond geographical boundaries.</p></Reveal>
            <Reveal delay={0.15}><p>Through scientific conferences, quarterly continuing professional development programmes and research initiatives, the Society works to strengthen the clinical capabilities of rheumatology professionals in Mauritius.</p></Reveal>
            <Reveal delay={0.2}><p>But the ambition goes beyond individual learning. RSM aims to support the development of a stronger specialist ecosystem, where research, clinical guidelines, disease registries and structured training can contribute to more consistent standards of care.</p></Reveal>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-[300px_300px]">
            <Reveal className="group relative overflow-hidden rounded-[28px] lg:col-span-6 lg:row-span-2">
              <Link href="/education" className="block h-full min-h-[420px]">
                <DuoImage name="heroPanel" tone="none" sizes="50vw" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-9 text-white md:p-12">
                  <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-gold">Focus area</span>
                  <h3 className="mt-3 max-w-lg text-[clamp(1.6rem,2.6vw,2.3rem)] font-light leading-tight">Continuing Professional Development</h3>
                  <p className="mt-3 max-w-lg text-white/75">Quarterly CPD activities provide healthcare professionals with opportunities to stay informed about emerging treatments, clinical practices and developments in rheumatology.</p>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="group relative overflow-hidden rounded-[28px] lg:col-span-6">
              <Link href="/news" className="block h-full min-h-[280px]">
                <DuoImage name="aflarTalk" tone="none" sizes="40vw" imgClassName="object-[40%_center]" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-navy-deep/20" />
                <div className="absolute inset-x-0 bottom-0 p-9 text-white">
                  <Presentation className="h-8 w-8 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-3 text-2xl font-medium">Scientific Conferences</h3>
                  <p className="mt-2 max-w-md text-white/75">Yearly scientific conferences bring together local and international experts for clinical discussions, research presentations and professional exchange.</p>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.15} className="group relative overflow-hidden rounded-[28px] bg-teal p-9 text-white lg:col-span-3">
              <Link href="/research" className="block h-full">
                <Microscope className="h-9 w-9 text-white/85" strokeWidth={1.3} />
                <h3 className="mt-5 text-xl font-medium">Research and Publications</h3>
                <p className="mt-2 text-[15px] text-white/80">Encouraging rheumatology research, scientific publications and collaboration to strengthen evidence-based clinical practice.</p>
                <ArrowUpRight className="absolute right-7 top-7 h-6 w-6 transition group-hover:rotate-45" />
              </Link>
            </Reveal>
            <Reveal delay={0.2} className="group relative overflow-hidden rounded-[28px] bg-navy p-9 text-white lg:col-span-3">
              <Link href="/about#initiatives" className="block h-full">
                <Sprout className="h-9 w-9 text-gold" strokeWidth={1.3} />
                <h3 className="mt-5 text-xl font-medium">Future Capacity Building</h3>
                <p className="mt-2 text-[15px] text-white/75">Supporting disease registries, locally relevant clinical guidelines and structured specialist training, including the proposed common paediatric rheumatology curriculum.</p>
                <ArrowUpRight className="absolute right-7 top-7 h-6 w-6 transition group-hover:rotate-45" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== 8. AWARENESS ============================== */}
      <section className="grid lg:grid-cols-2">
        <RevealMask className="relative min-h-[460px] lg:min-h-[860px]">
          <DuoImage name="holdingHands" tone="teal" sizes="50vw" className="!absolute inset-0" alt="Supportive hands" />
        </RevealMask>
        <div className="relative isolate flex flex-col justify-center overflow-hidden bg-teal px-6 py-24 text-white md:px-20">
          <Orbits className="absolute -right-52 -top-52 -z-10 w-[600px] opacity-60" />
          <Reveal><span className="eyebrow !text-sky">Patient Awareness and Advocacy</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,3.1rem)] font-light leading-[1.1]">A Diagnosis Should Open Doors to Care, <em className="font-serif italic">Not Create More Barriers.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="mt-6 max-w-xl text-white/90">RSM believes that every patient deserves to be heard, supported and treated with dignity, regardless of whether they receive care in a public hospital or a private healthcare facility.</p></Reveal>
          <Reveal delay={0.25}><p className="mt-4 max-w-xl text-white/75">A patient&apos;s ability to access appropriate treatment should not depend on their financial circumstances or where they seek medical attention. Nor should they feel marginalised because they cannot access private or hospital-based services. The Society is committed to promoting greater awareness, encouraging equitable access to treatment and supporting sustainable models of care that include long-term follow-up and continuity of treatment.</p></Reveal>
          <Reveal delay={0.3} className="mt-8">
            <div className="font-cond text-[12.5px] uppercase tracking-[0.2em] text-sky">Our patient-focused priorities</div>
            <ul className="mt-4 space-y-3">
              {[
                ["Breaking Access Barriers", "Encouraging equitable access to essential and often expensive rheumatology treatments across public and private healthcare."],
                ["Promoting Early Recognition", "Helping communities understand rheumatic diseases and recognise the importance of timely diagnosis."],
                ["Supporting Children and Families", "Bringing greater attention to childhood rheumatic diseases, including Juvenile Idiopathic Arthritis."],
                ["Encouraging Continuity of Care", "Promoting affordable, long-term treatment and patient follow-up."],
                ["Giving Patients a Voice", "Supporting advocacy that recognises the experiences, concerns and needs of people living with rheumatic conditions."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3 text-[15px]"><Check className="mt-1 h-4 w-4 shrink-0 text-sky" /><span><b className="font-semibold text-white">{t}:</b> <span className="text-white/75">{d}</span></span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.4}><Link href="/awareness" className="btn btn-white mt-10">Explore Our Patient Awareness Initiatives <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      {/* ============================== 9. INTERNATIONAL ============================== */}
      <section className="relative isolate overflow-hidden bg-ink py-28 text-white md:py-36">
        <Orbits className="absolute -right-72 top-1/2 -z-10 w-[900px] -translate-y-1/2 opacity-40" />
        <div className="wrap">
          <SectionHead
            light
            eyebrow="International Collaboration"
            title={<>When Rheumatology Comes Together, <em>Entire Regions Move Forward.</em></>}
            lead="One of RSM's most significant contributions has been its commitment to bringing rheumatology communities closer together."
            aside={<Link href="/international" className="btn btn-ghost">Discover Our International Engagement <ArrowRight className="h-4 w-4" /></Link>}
          />
          <div className="mt-10 grid max-w-5xl gap-5 text-white/65 md:grid-cols-3">
            <Reveal delay={0.1}><p>The 2019 AFLAR Conference in Mauritius demonstrated what stronger regional collaboration could achieve. By creating a platform for professionals from across Africa to meet, exchange knowledge and build relationships, the event helped strengthen connections between rheumatology communities that had previously been more fragmented.</p></Reveal>
            <Reveal delay={0.15}><p>RSM encourages its members to participate in international scientific meetings, engage with global developments and bring new knowledge and perspectives back to Mauritius.</p></Reveal>
            <Reveal delay={0.2}><p>From regional African partnerships to international scientific exchange, the Society believes that progress in rheumatology is strongest when expertise is shared.</p></Reveal>
          </div>
        </div>
        <Marquee items={["AFLAR / PAFLAR", "IRACON", "EULAR", "ACR", "Société Française de Rhumatologie", "PAFLAR 2027"]} className="mt-20 border-y border-white/10 py-8 text-white/85" />
        <div className="wrap mt-16"><Reveal><div className="mb-5 font-cond text-[13px] uppercase tracking-[0.2em] text-gold">Our international engagement includes</div></Reveal></div>
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {conferences.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.08} className="rounded-2xl bg-white/[.05] p-7 ring-1 ring-white/10 transition hover:bg-white/[.09]">
              <div className="font-cond text-[13px] uppercase tracking-[0.2em] text-gold">{c.region}</div>
              <div className="mt-3 font-display text-[clamp(1.4rem,2vw,1.8rem)] font-bold tracking-tight">{c.code}</div>
              <p className="mt-2 text-[14.5px] text-white/60">{c.name}</p>
            </Reveal>
          ))}
        </div>
        <div className="wrap mt-10">
          <Reveal className="rounded-2xl bg-gold/10 p-7 ring-1 ring-gold/25 md:p-8">
            <div className="font-cond text-[12.5px] uppercase tracking-[0.2em] text-gold">Looking ahead</div>
            <p className="mt-2 max-w-3xl text-white/80">PAFLAR 2027 will provide another opportunity to strengthen these relationships, with a particular focus on paediatric rheumatology education, shared learning and capacity building across Africa.</p>
          </Reveal>
          <p className="mt-6 text-[13.5px] text-white/45">Participation in international conferences is listed separately from formal institutional partnerships or affiliations.</p>
        </div>
      </section>

      {/* ============================== 10. COMMITTEE ============================== */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_10%_0%,rgba(8,127,131,.12),transparent_50%),linear-gradient(180deg,#f1f7f8_0%,#f7fafb_100%)] py-20 md:py-28">
        <DotGrid className="right-0 top-0 -z-10 h-[340px] w-[520px]" />
        <div className="wrap">
          <SectionHead eyebrow="The Team" title={<>Driven by Expertise. <em>United by a Shared Purpose.</em></>} lead="Behind every milestone achieved by RSM is a community of medical professionals committed to advancing rheumatology and improving patient care." />
          <div className="mt-8 grid max-w-5xl gap-5 text-muted md:grid-cols-2">
            <Reveal delay={0.1}><p>The Society brings together consultant rheumatologists and physicians working across Mauritius&apos;s public and private healthcare sectors. Their collective expertise, professional experience and commitment to collaboration help shape the Society&apos;s educational programmes, advocacy efforts and future initiatives.</p></Reveal>
            <Reveal delay={0.15}><p>From strengthening specialist knowledge to addressing gaps in patient access, the leadership team works towards a common goal: building a stronger and more sustainable future for rheumatology in Mauritius.</p></Reveal>
          </div>
          <Reveal className="mt-12"><div className="font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Meet the leadership</div></Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {committee.slice(0, 4).map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}><MemberCard m={m} i={i} /></Reveal>
            ))}
          </div>
          <Reveal className="mt-10"><Link href="/committee" className="btn btn-outline">Meet the Full Team <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      {/* ============================== 11. PARTNERSHIPS ============================== */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6f7_100%)] py-20 md:py-28">
        <Glow className="left-1/2 top-1/3 -z-10 h-[520px] w-[820px] -translate-x-1/2" color="rgba(57,143,168,.12)" />
        <div className="wrap">
          <Reveal className="relative isolate grid gap-12 overflow-hidden rounded-[36px] bg-navy p-10 text-white md:p-16 lg:grid-cols-[1fr_1.1fr] lg:p-20">
            <DuoImage name="hospital" tone="navy" className="!absolute inset-0 -z-20 opacity-40" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/92 to-navy/70" />
            <div>
              <span className="eyebrow !text-gold">Institutional Partnerships</span>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.1]">Sustainable Progress Takes <em className="font-serif italic text-sky">Collective Commitment.</em></h2>
              <p className="mt-6 max-w-lg text-white/80">Improving rheumatology care requires more than individual clinical excellence. It depends on strong institutions, committed partners, adequate resources and systems that can support patients over the long term.</p>
              <p className="mt-4 max-w-lg text-white/65">RSM recognises that making specialist care accessible and sustainable requires collaboration across the healthcare ecosystem. The Society welcomes partnerships with hospitals, universities, medical associations, research institutions, corporate organisations and philanthropic supporters who share its commitment to advancing rheumatology.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/partnerships" className="btn btn-gold">Explore Partnership Opportunities <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/paflar-2027/sponsorship" className="btn btn-ghost">Support PAFLAR 2027 <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <div>
              <div className="font-cond text-[12.5px] uppercase tracking-[0.2em] text-white/55">Where partnerships can make a difference</div>
              <div className="mt-4 grid gap-3">
                {[
                  ["Improving Access to Treatment", "Supporting initiatives that help reduce barriers to essential rheumatology treatments and promote equitable access across public and private healthcare."],
                  ["Strengthening Specialist Capacity", "Creating opportunities for specialist development, professional training and the growth of rheumatology services in both public and private sectors."],
                  ["Supporting Research and Innovation", "Collaborating on disease registries, research programmes, clinical guidelines and initiatives that strengthen evidence-based care."],
                  ["Building the Next Generation", "Supporting medical education, paediatric rheumatology training and the development of a common curriculum for future specialists."],
                  ["Ensuring Sustainable Patient Care", "Encouraging long-term approaches to patient follow-up, treatment affordability and continuity of care."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl bg-white/[.07] px-6 py-4 ring-1 ring-white/12">
                    <div className="font-display text-[16.5px] font-semibold">{t}</div>
                    <div className="mt-1 text-[14px] leading-relaxed text-white/70">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== 12. NEWS ============================== */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#eef6f7_0%,#f8fbfc_45%,#ffffff_100%)] pb-20 md:pb-28">
        <ParticleWaves className="inset-x-0 bottom-0 -z-10 h-[220px] w-full" opacity={0.18} rows={9} />
        <div className="wrap">
          <SectionHead eyebrow="News and Events" title={<>Progress Worth Sharing. <em>Developments Worth Following.</em></>} aside={<Link href="/news" className="btn btn-outline">View All News and Events <ArrowRight className="h-4 w-4" /></Link>} />
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
            <SectionHead light eyebrow="Gallery" title={<>Moments That Bring <em>Our Mission to Life.</em></>} lead="Every gathering, scientific discussion and awareness initiative represents another step towards stronger rheumatology care." />
            <Reveal delay={0.2} className="flex flex-wrap gap-2 lg:justify-end">
              {["Congress 2026", "Faculty & speakers", "Delegates", "AFLAR"].map((c) => <span key={c} className="rounded-full px-4 py-2 font-cond text-[13px] uppercase tracking-[0.12em] text-white/80 ring-1 ring-white/20">{c}</span>)}
            </Reveal>
          </div>
          <div className="mt-16 lg:mt-20"><PhotoCollage /></div>
          <Reveal className="mt-16 flex justify-center lg:mt-20">
            <Link href="/gallery" className="btn btn-gold">Explore the Full Gallery <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* ============================== 14. CONTACT ============================== */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_0%_100%,rgba(8,127,131,.14),transparent_50%),radial-gradient(ellipse_at_100%_0%,rgba(199,166,90,.12),transparent_45%),linear-gradient(180deg,#ffffff,#f3f8f9)] py-20 md:py-28">
        <DotGrid className="right-[8%] top-[10%] -z-10 h-[300px] w-[420px]" />
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Contact Us" title={<>Be Part of the Progress <em>We Are Building.</em></>} lead="Get in touch to build a more sustainable future for rheumatology globally." />
            <Reveal delay={0.2} className="mt-10 space-y-6">
              <div><div className="font-cond text-[12px] uppercase tracking-[0.2em] text-muted">Email</div><div className="mt-1 font-display text-xl font-semibold text-navy">{site.email}</div>{site.emailPending && <div className="mt-2"><Pending>Proposed address</Pending></div>}</div>
              <div><div className="font-cond text-[12px] uppercase tracking-[0.2em] text-muted">Location</div><div className="mt-1 font-display text-xl font-semibold text-navy">Mauritius</div></div>
            </Reveal>
          </div>
          <Reveal delay={0.1}><ContactForm submitLabel="Send an Enquiry" /></Reveal>
        </div>
      </section>

      {/* ============================== 15. CLOSING MESSAGE ============================== */}
      <section className="grain relative isolate overflow-hidden bg-navy-deep py-24 text-center text-white md:py-32">
        <DuoImage name="aflarGroup" tone="none" className="!absolute inset-0 -z-20 opacity-25" imgClassName="object-[center_35%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/80 via-navy-deep/85 to-navy-deep" />
        <Orbits className="absolute left-1/2 top-1/2 -z-10 w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
        <div className="wrap max-w-4xl">
          <Reveal><span className="eyebrow-plain text-gold">Rheumatology Society, Mauritius</span></Reveal>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.06]">
            <SplitHeading text="The Work of Uniting Rheumatology Continues." />
          </h2>
          <Reveal delay={0.2}><p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-white/75">Let&apos;s build a future where no patient is left behind and no opportunity to advance rheumatology is missed.</p></Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-gold">Join the RSM Community <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/paflar-2027" className="btn btn-ghost">Explore PAFLAR 2027 <ArrowUpRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
