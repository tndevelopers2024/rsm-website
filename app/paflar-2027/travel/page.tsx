import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ArrowUpRight, Plane, Car, Sun, Moon, Waves, Check } from "lucide-react";
import { congress, travelFacts, travelFaq } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { CongressSubNav } from "@/components/CongressSubNav";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { CongressCta } from "@/components/CongressCta";

export const metadata: Metadata = pageMeta({ title: "Travel & Logistics · PAFLAR 2027", description: "Visas, flights, airport transfers and practical travel information for PAFLAR 2027 delegates.", path: "/paflar-2027/travel", paflar: true });

const wIcons = [Sun, Moon, Waves];

export default function TravelPage() {
  return (
    <>
      <PageHero eyebrow="7th PAFLAR Congress · Travel" title="Travel & logistics" lead="Practical delegate information for arriving in Mauritius and getting to Flic-en-Flac." image="aerialBeach" tone="ocean" crumbs={[{ label: "PAFLAR 2027", href: "/paflar-2027" }, { label: "Travel & Logistics" }]} />
      <CongressSubNav />

      <section className="py-28 md:py-36">
        <div className="wrap">
          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal className="rounded-[28px] bg-navy p-10 text-white">
              <Plane className="h-8 w-8 text-gold" />
              <div className="mt-8 font-cond text-[12px] uppercase tracking-[0.2em] text-white/55">Arrival airport</div>
              <div className="mt-1 font-serif text-6xl font-light">MRU</div>
              <p className="mt-3 text-white/70">{travelFacts.airport}, in the south-east of the island.</p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[28px] bg-teal p-10 text-white">
              <Car className="h-8 w-8 text-white/80" />
              <div className="mt-8 font-cond text-[12px] uppercase tracking-[0.2em] text-white/65">Airport to Flic-en-Flac</div>
              <div className="mt-1 font-serif text-6xl font-light">{travelFacts.transfer}</div>
              <p className="mt-3 text-white/80">By road. The local organising team will arrange transfers, <strong>subject to confirmation</strong>.</p>
            </Reveal>
            <Reveal delay={0.2} className="rounded-[28px] bg-mist p-10">
              <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-muted">Indicative early-May conditions</div>
              <div className="mt-6 space-y-5">
                {travelFacts.weather.map((w, i) => {
                  const I = wIcons[i];
                  return (
                    <div key={w.k} className="flex items-center justify-between border-b border-line pb-4 last:border-0">
                      <span className="flex items-center gap-3 text-navy"><I className="h-5 w-5 text-teal" />{w.k}</span>
                      <span className="font-serif text-3xl font-light text-navy">{w.v}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-5 rounded-[28px] bg-gold-soft p-10 md:p-12">
            <h3 className="text-2xl font-medium text-navy">What to pack</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {travelFacts.packing.map((p) => <span key={p} className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[15px] text-navy"><Check className="h-4 w-4 text-teal" />{p}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-28 md:py-36">
        <div className="wrap grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Delegate Information" title={<>Before you <em>travel.</em></>} lead="Visa and immigration information, travel forms, tourism taxes and other entry requirements must be checked against current official Mauritius government sources." />
            <Reveal delay={0.2}><a href={congress.links.welcome} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-10">Official PAFLAR travel guide <ArrowUpRight className="h-4 w-4" /></a></Reveal>
          </div>
          <Reveal delay={0.1}><Accordion items={travelFaq} /></Reveal>
        </div>
      </section>
      <CongressCta />
    </>
  );
}
