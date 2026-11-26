import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Mic2, Award, Info, ChevronRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { days, speakers, speakerCountries, programmeNote } from "@/lib/paflar";
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
      {/* Compact hero */}
      <section className="grain relative isolate overflow-hidden bg-navy-deep pb-10 pt-32 text-white sm:pt-40 md:pb-14">
        <Image src="/images/aflar2019/a11.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[50%_40%] opacity-35" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,32,52,.97)_0%,rgba(11,32,52,.85)_45%,rgba(11,32,52,.55)_100%)]" />
        <div className="wrap">
          <nav className="mb-6 flex flex-wrap items-center gap-2 font-cond text-[13px] uppercase tracking-[0.18em] text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/paflar-2027" className="hover:text-white">PAFLAR 2027</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-sky">Programme</span>
          </nav>
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h1 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.05]">Congress <span className="font-serif italic text-gold">programme</span></h1>
              <p className="mt-3 max-w-xl text-[1.02rem] text-white/75">Workshops on Friday, then two days of science, cases and debate with specialists from Africa and around the world.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/paflar-2027/register" className="btn btn-red !py-3">Register now <ArrowRight className="h-4 w-4" /></Link>
                <a href="#speakers" className="btn btn-ghost !py-3">Speakers</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
              {stats.map((x) => (
                <div key={x.v} className="flex items-center gap-3 rounded-2xl bg-white/[.07] px-4 py-3 ring-1 ring-white/12">
                  <x.i className="h-4 w-4 shrink-0 text-gold" />
                  <div className="min-w-0"><div className="font-display text-[16px] font-semibold leading-tight">{x.v}</div><div className="truncate text-[12px] text-white/60">{x.k}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CongressSubNav sticky={false} />

      {/* FULL PROGRAMME */}
      <section id="programme" className="scroll-mt-24 pb-16 pt-10 md:pb-24 md:pt-12">
        <div className="wrap">
          <ProgrammeExplorer />
          <p className="mt-6 flex items-start gap-2 text-[13.5px] text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0" /> {programmeNote}</p>
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
