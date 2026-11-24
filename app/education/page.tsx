import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Presentation, BookOpen, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal, RevealMask } from "@/components/Reveal";
import { DuoImage } from "@/components/DuoImage";
import { Pending } from "@/components/Pending";

export const metadata: Metadata = { title: "Education & CPD" };

const offers = [
  { i: CalendarDays, t: "Quarterly CPD sessions", d: "Regular continuing professional development activities that encourage continuing medical education and professional learning." },
  { i: Presentation, t: "Annual scientific conference", d: "A yearly forum for clinical updates, scientific exchange and discussion within the rheumatology community." },
  { i: BookOpen, t: "Educational resources", d: "Past programmes and approved educational resources, published as they become available." },
  { i: Users, t: "International learning", d: "Knowledge brought home from international congresses and shared with colleagues in Mauritius." },
];

export default function EducationPage() {
  return (
    <>
      <PageHero eyebrow="Education & CPD" title="Learning that keeps clinical practice current." lead="The Society conducts quarterly CPD activities to encourage continuing medical education and professional learning." image="heroPanel" tone="none" crumbs={[{ label: "Education & CPD" }]} />

      <section className="py-28 md:py-36">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <RevealMask className="relative h-[520px] overflow-hidden rounded-[28px]">
            <DuoImage name="microphone" tone="none" sizes="50vw" className="h-full w-full" alt="Speaker at a medical education session" />
          </RevealMask>
          <div>
            <SectionHead eyebrow="Continuing Professional Development" title={<>A rhythm of learning, <em>every quarter.</em></>} />
            <Reveal delay={0.15}><p className="mt-8 text-[1.15rem] text-muted">The Society conducts quarterly CPD activities to encourage continuing medical education and professional learning. Details of forthcoming sessions, past programmes and approved educational resources will be published here as they become available.</p></Reveal>
            <Reveal delay={0.25} className="mt-10 grid grid-cols-2 gap-4">
              {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                <div key={q} className="rounded-2xl bg-mist p-6">
                  <div className="font-serif text-4xl font-light text-teal">{q}</div>
                  <div className="mt-2 text-[14px] text-muted">CPD session</div>
                  <div className="mt-3"><Pending>Date TBC</Pending></div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="What We Offer" title={<>Education for the <em>Rheumatology community.</em></>} />
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {offers.map((o, i) => (
              <Reveal key={o.t} delay={(i % 2) * 0.1} className="group flex gap-6 rounded-[24px] bg-white p-9 transition hover:shadow-[0_30px_60px_-40px_rgba(20,45,70,.45)]">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-aqua text-teal transition group-hover:bg-teal group-hover:text-white"><o.i className="h-6 w-6" /></span>
                <div><h3 className="text-xl font-semibold text-navy">{o.t}</h3><p className="mt-2 text-muted">{o.d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Educational Calendar" title={<>Upcoming <em>sessions.</em></>} aside={<Pending>Calendar awaiting confirmation</Pending>} />
          <div className="mt-14 overflow-hidden rounded-[24px] ring-1 ring-line">
            {[
              ["7 May 2027", "Pre-congress workshop · 7th PAFLAR Congress", "Hilton Mauritius Resort & Spa", "/paflar-2027/programme"],
              ["8–9 May 2027", "Scientific congress sessions · 7th PAFLAR Congress", "Hilton Mauritius Resort & Spa", "/paflar-2027/programme"],
              ["Quarterly", "CPD session", "Details to be announced", "/contact"],
            ].map(([d, t, v, h], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <Link href={h} className="group grid items-center gap-3 border-b border-line bg-white px-8 py-7 transition last:border-0 hover:bg-aqua md:grid-cols-[200px_1fr_1fr_auto]">
                  <span className="font-cond text-[15px] uppercase tracking-[0.14em] text-teal">{d}</span>
                  <span className="font-display text-lg font-semibold text-navy">{t}</span>
                  <span className="text-muted">{v}</span>
                  <ArrowRight className="h-5 w-5 text-navy transition group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
