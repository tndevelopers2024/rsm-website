import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Mic2, Award, Info } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { days, speakers, speakerCountries, programmeNote } from "@/lib/paflar";
import { PageHero } from "@/components/PageHero";
import { CongressSubNav } from "@/components/CongressSubNav";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { CongressCta } from "@/components/CongressCta";
import { ProgrammeExplorer } from "@/components/ProgrammeExplorer";
import { SpeakerGrid } from "@/components/SpeakerGrid";

export const metadata: Metadata = pageMeta({
  title: "Programme · PAFLAR 2027",
  description: "Provisional programme of the 7th PAFLAR Congress: pre-congress workshops on 7 May at Artemis Cascavelle Hospital, main congress on 8–9 May 2027 at the Hilton, Flic-en-Flac.",
  path: "/paflar-2027/programme",
  paflar: true,
});

const sessionCount = days.flatMap((d) => d.sessions).filter((s) => s.n).length;
const cpdTotal = days.reduce((a, d) => a + d.cpd, 0);

export default function ProgrammePage() {
  const stats = [
    { i: CalendarDays, v: "3 days", k: "7–9 May 2027" },
    { i: MapPin, v: "2 venues", k: "Artemis · Hilton" },
    { i: Mic2, v: `${sessionCount} sessions`, k: `${speakers.length}+ speakers, ${speakerCountries.length} countries` },
    { i: Award, v: `${cpdTotal} CPD`, k: "4 points per day" },
  ];
  return (
    <>
      <PageHero
        eyebrow="7th PAFLAR Congress · Programme"
        title="Three days of paediatric Rheumatology"
        lead="Hands-on workshops on Friday, then two days of science, cases and debate with leading specialists from Africa and around the world."
        image="audience"
        tone="ocean"
        crumbs={[{ label: "PAFLAR 2027", href: "/paflar-2027" }, { label: "Programme" }]}
      >
        <div className="grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="rounded-2xl bg-white/[.08] p-4 ring-1 ring-white/15">
              <s.i className="h-4 w-4 text-gold" />
              <div className="mt-2 font-display text-[18px] font-semibold leading-tight">{s.v}</div>
              <div className="mt-0.5 text-[12.5px] leading-snug text-white/65">{s.k}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/paflar-2027/register" className="btn btn-red">Register now <ArrowRight className="h-4 w-4" /></Link>
          <a href="#speakers" className="btn btn-ghost">Meet the speakers</a>
        </div>
      </PageHero>
      <CongressSubNav />

      {/* DAYS AT A GLANCE */}
      <section className="pt-16 md:pt-24">
        <div className="wrap">
          <div className="grid gap-3 md:grid-cols-3">
            {days.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.06} className="relative overflow-hidden rounded-[22px] bg-mist p-6 ring-1 ring-line">
                <div className="flex items-baseline justify-between">
                  <span className="font-cond text-[12px] uppercase tracking-[0.2em] text-teal">{d.weekday} {d.date.replace(" 2027", "")}</span>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[12px] font-medium text-navy ring-1 ring-line">{d.cpd} CPD</span>
                </div>
                <h3 className="mt-3 text-[19px] font-semibold text-navy">{d.label}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{d.summary}</p>
                <p className="mt-4 flex items-center gap-2 text-[13.5px] font-medium text-navy"><MapPin className="h-4 w-4 text-teal" />{d.venue}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FULL PROGRAMME */}
      <section id="programme" className="scroll-mt-40 py-16 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="Provisional Programme" title={<>Plan your <em>congress.</em></>} lead="Pick a day, or search for a topic or speaker across all three days." />
          <Reveal className="mt-6 flex items-start gap-3 rounded-2xl bg-gold-soft/60 px-5 py-4 text-[14.5px] text-[#6b5418]">
            <Info className="mt-0.5 h-4 w-4 shrink-0" /> {programmeNote}
          </Reveal>
          <div className="mt-10"><ProgrammeExplorer /></div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section id="speakers" className="scroll-mt-32 bg-navy-deep py-24 text-white md:py-32">
        <div className="wrap">
          <SectionHead light eyebrow="Faculty" title={<>Learn from leading <em>specialists.</em></>} lead={`${speakers.length} confirmed speakers from ${speakerCountries.length} countries so far, with more to be announced.`} />
          <div className="mt-12"><SpeakerGrid light /></div>
        </div>
      </section>

      {/* REGISTER TEASER */}
      <section className="py-24 md:py-28">
        <div className="wrap">
          <Reveal className="grid items-center gap-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-teal to-navy p-10 text-white md:grid-cols-[1.3fr_1fr] md:p-14">
            <div>
              <span className="font-cond text-[13px] uppercase tracking-[0.24em] text-gold">Registration open</span>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-light leading-tight">Choose your days and register in a few minutes.</h2>
              <p className="mt-4 max-w-lg text-white/75">Mauritian residents can register by the day. International delegates get the full three-day pass, with early-bird rates until 31 January 2027.</p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link href="/paflar-2027/register" className="btn btn-gold">Register now <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/paflar-2027/register#fees" className="text-[14.5px] text-white/75 underline-offset-4 hover:text-white hover:underline">See registration fees</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CongressCta />
    </>
  );
}
