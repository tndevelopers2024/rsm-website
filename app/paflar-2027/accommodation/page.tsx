import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ArrowUpRight, Info } from "lucide-react";
import { congress } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { CongressSubNav } from "@/components/CongressSubNav";
import { SectionHead } from "@/components/SectionHead";
import { Reveal, RevealMask } from "@/components/Reveal";
import { DuoImage } from "@/components/DuoImage";
import { HotelList } from "@/components/HotelList";
import { Pending } from "@/components/Pending";
import { CongressCta } from "@/components/CongressCta";

export const metadata: Metadata = pageMeta({ title: "Accommodation · PAFLAR 2027", description: "Hotels and accommodation for delegates of the 7th PAFLAR Congress at Flic-en-Flac, Mauritius.", path: "/paflar-2027/accommodation", paflar: true });

export default function AccommodationPage() {
  return (
    <>
      <PageHero eyebrow="7th PAFLAR Congress · Accommodation" title="Where to stay" lead="The official host venue and accommodation options along Mauritius' western coast, from the official PAFLAR accommodation guide." image="resortPoolEvening" tone="ocean" crumbs={[{ label: "PAFLAR 2027", href: "/paflar-2027" }, { label: "Accommodation" }]} />
      <CongressSubNav />

      <section className="py-28 md:py-36">
        <div className="wrap">
          <Reveal className="grid overflow-hidden rounded-[36px] bg-navy text-white lg:grid-cols-[1.25fr_1fr]">
            <RevealMask className="relative min-h-[420px]"><DuoImage name="infinityPool" tone="none" sizes="60vw" className="!absolute inset-0" alt="Resort pool overlooking the ocean" /></RevealMask>
            <div className="flex flex-col justify-center p-10 md:p-16">
              <span className="font-cond text-[13px] uppercase tracking-[0.24em] text-gold">Official Host Venue</span>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.4vw,3rem)] font-light leading-tight">Hilton Mauritius Resort & Spa</h2>
              <p className="mt-5 text-white/75">The main congress on 8–9 May takes place on site at the Hilton in Flic-en-Flac (the 7 May pre-congress workshop is at Artemis Cascavelle Hospital nearby), on the island&apos;s west coast, known for its sheltered lagoon and sunsets.</p>
              <a href={congress.links.accommodation} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-10 self-start">Rates & booking <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="More Options" title={<>Resorts, boutique hotels & <em>apartments.</em></>} aside={<Pending>Category groupings to be confirmed</Pending>} />
          <div className="mt-12"><HotelList /></div>
          <p className="mt-10 flex gap-3 text-[14.5px] text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" />Rates and availability change. Please refer to the official PAFLAR accommodation guide for current rates, booking information and recommendations.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="wrap grid gap-4 md:grid-cols-3">
          {(["hotelRoom", "spa", "resortNight"] as const).map((k, i) => (
            <RevealMask key={k} delay={i * 0.1} className="relative h-72 overflow-hidden rounded-[24px]"><DuoImage name={k} tone="none" sizes="33vw" className="!absolute inset-0" /></RevealMask>
          ))}
        </div>
      </section>
      <CongressCta />
    </>
  );
}
