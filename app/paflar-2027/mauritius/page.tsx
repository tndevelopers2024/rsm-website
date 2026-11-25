import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import { congress, explore } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { CongressSubNav } from "@/components/CongressSubNav";
import { SectionHead } from "@/components/SectionHead";
import { Reveal, RevealMask } from "@/components/Reveal";
import { DuoImage } from "@/components/DuoImage";
import { CongressCta } from "@/components/CongressCta";

export const metadata: Metadata = pageMeta({ title: "Welcome to Mauritius · PAFLAR 2027", description: "Discover Mauritius — what to see and do around the 7th PAFLAR Congress, May 2027.", path: "/paflar-2027/mauritius", paflar: true });

const highlights = [
  { t: "Flic-en-Flac & the west coast", d: "A sheltered lagoon, long beaches and some of the island's finest sunsets.", img: "palmBeach" as const },
  { t: "Hilton Mauritius Resort & Spa", d: "The main congress venue for 8–9 May, set directly on the Flic-en-Flac coastline.", img: "resortPool" as const },
  { t: "Multicultural heritage", d: "Influences from Africa, India, Europe and China shape the island's languages, festivals and faiths.", img: "dinner" as const },
  { t: "Local cuisine & hospitality", d: "Creole, Indian and French flavours, from beachfront cafés to seafood restaurants along the coastal road.", img: "dining" as const },
];

export default function MauritiusPage() {
  return (
    <>
      <PageHero eyebrow="Welcome to Mauritius" title="Where clinical excellence meets island serenity." lead="Located in the heart of the Indian Ocean, Mauritius offers an inspiring setting for scientific exchange and international collaboration." image="beachSunset" tone="ocean" crumbs={[{ label: "PAFLAR 2027", href: "/paflar-2027" }, { label: "Welcome to Mauritius" }]} />
      <CongressSubNav />

      <section className="bg-[#fbfaf6] py-28 md:py-36">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="The Destination" title={<>An exceptional backdrop for the <em>7th PAFLAR Congress.</em></>} />
            <Reveal delay={0.15}><p className="mt-8 text-[1.15rem] text-muted">Located in the heart of the Indian Ocean, Mauritius offers an inspiring setting for scientific exchange and international collaboration. Its coastal beauty, multicultural heritage and welcoming hospitality provide an exceptional backdrop for the 7th PAFLAR Congress.</p></Reveal>
            <Reveal delay={0.25}><a href={congress.links.welcome} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-10">Official welcome note <ArrowUpRight className="h-4 w-4" /></a></Reveal>
          </div>
          <div className="grid h-[560px] grid-cols-2 grid-rows-2 gap-4">
            <RevealMask className="relative row-span-2 overflow-hidden rounded-[24px]"><DuoImage name="palmsTall" tone="none" sizes="25vw" className="!absolute inset-0" /></RevealMask>
            <RevealMask delay={0.1} className="relative overflow-hidden rounded-[24px]"><DuoImage name="aerialBeach" tone="none" sizes="25vw" className="!absolute inset-0" /></RevealMask>
            <RevealMask delay={0.2} className="relative overflow-hidden rounded-[24px]"><DuoImage name="parasol" tone="none" sizes="25vw" className="!absolute inset-0" /></RevealMask>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Highlights" title={<>Discover the <em>island.</em></>} />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.t} delay={(i % 2) * 0.1} className="group overflow-hidden rounded-[28px] bg-mist">
                <div className="relative h-80 overflow-hidden"><DuoImage name={h.img} tone="none" sizes="50vw" className="!absolute inset-0 transition duration-[1600ms] group-hover:scale-105" /></div>
                <div className="p-9"><div className="font-serif text-xl italic text-gold">{["i.", "ii.", "iii.", "iv."][i]}</div><h3 className="mt-2 text-2xl font-medium text-navy">{h.t}</h3><p className="mt-2 text-muted">{h.d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-28 text-white md:py-36">
        <div className="wrap">
          <SectionHead light eyebrow="Things to Explore" title={<>Before or after <em>the congress.</em></>} lead="Approximate travel times from the venue, as indicated in the official PAFLAR guide." />
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {explore.map((x, i) => (
              <Reveal key={x.name} delay={i * 0.08} className="group relative h-[460px] overflow-hidden rounded-[28px]">
                <DuoImage name={x.image} tone="none" sizes="25vw" className="!absolute inset-0 transition duration-[1600ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="font-cond text-[12px] uppercase tracking-[0.2em] text-gold">{x.time}</span>
                  <h3 className="mt-2 font-serif text-2xl font-light">{x.name}</h3>
                  <p className="mt-2 text-[14.5px] text-white/75">{x.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[13.5px] text-white/45">Representative imagery.</p>
        </div>
      </section>
      <CongressCta />
    </>
  );
}
