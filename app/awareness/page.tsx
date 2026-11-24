import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Megaphone, Baby, HandHeart, FileHeart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal, RevealMask } from "@/components/Reveal";
import { DuoImage } from "@/components/DuoImage";
import { Pending } from "@/components/Pending";

export const metadata: Metadata = { title: "Patient Awareness & Advocacy" };

const areas = [
  { i: Megaphone, t: "Public awareness campaigns", d: "Community events and media awareness that help people recognise rheumatic diseases earlier." },
  { i: Baby, t: "Paediatric rheumatology", d: "Raising awareness that rheumatic diseases also affect children, including the Society's 2024 campaign." },
  { i: HandHeart, t: "Patient advocacy", d: "Supporting patient advocacy groups and initiatives for people living with rheumatic conditions." },
  { i: FileHeart, t: "Approved public resources", d: "Patient information and public resources, published once approved by the Society." },
];

export default function AwarenessPage() {
  return (
    <>
      <PageHero eyebrow="Patient Awareness & Advocacy" title="Helping the public understand rheumatic diseases." lead="We promote public awareness of rheumatic diseases and support patient advocacy initiatives." image="doctorCare" tone="teal" crumbs={[{ label: "Patient Awareness" }]} />

      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Our Work" title={<>Awareness that leads to <em>earlier care.</em></>} />
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {areas.map((a, i) => (
              <Reveal key={a.t} delay={i * 0.08} className="rounded-[24px] bg-mist p-8">
                <a.i className="h-9 w-9 text-teal" strokeWidth={1.4} />
                <h3 className="mt-6 text-xl font-semibold text-navy">{a.t}</h3>
                <p className="mt-3 text-[15.5px] text-muted">{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <RevealMask className="relative min-h-[480px]">
          <DuoImage name="doctorElderly" tone="none" sizes="50vw" className="!absolute inset-0" alt="Clinician with an older patient" />
        </RevealMask>
        <div className="flex flex-col justify-center bg-navy px-6 py-24 text-white md:px-20">
          <span className="eyebrow !text-gold">Spotlight · 12 October</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.1]">World Arthritis Day at <em className="font-serif italic text-sky">Quatre Bornes.</em></h2>
          <p className="mt-6 max-w-lg text-white/75">A World Arthritis Day celebration at the Municipality of Quatre Bornes, with media coverage and support for a patient advocacy group.</p>
          <div className="mt-6"><Pending>Year (2017 or 2018) to be confirmed</Pending></div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center bg-teal px-6 py-24 text-white md:px-20 lg:order-1">
          <span className="eyebrow !text-sky">Spotlight · 2024</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.1]">Paediatric Rheumatology <em className="font-serif italic">awareness campaign.</em></h2>
          <p className="mt-6 max-w-lg text-white/85">In 2024 the Society ran a paediatric rheumatology awareness campaign alongside its annual conference, a focus that continues with the 7th PAFLAR Congress in 2027.</p>
          <Link href="/paflar-2027" className="btn btn-white mt-10 self-start">About PAFLAR 2027 <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <RevealMask className="relative order-1 min-h-[480px] lg:order-2">
          <DuoImage name="childPlay" tone="none" sizes="50vw" className="!absolute inset-0" alt="Child at play" />
        </RevealMask>
      </section>
    </>
  );
}
