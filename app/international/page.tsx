import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { conferences, congress, paflarThemes } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Globe } from "@/components/Globe";
import { CircleText } from "@/components/CircleText";
import { Marquee } from "@/components/Marquee";

export const metadata: Metadata = pageMeta({ title: "International Collaboration", description: "The Society’s international links, including AFLAR 2019 in Mauritius and the 7th PAFLAR Congress in 2027.", path: "/international" });

export default function InternationalPage() {
  return (
    <>
      <PageHero eyebrow="International Collaboration" title="Mauritius, connected to the world of Rheumatology." lead="International participation, knowledge exchange and collaboration with professional societies across Africa and beyond." image="heroSea" tone="none" crumbs={[{ label: "International" }]} />

      <section className="relative overflow-hidden bg-ink py-28 text-white md:py-36">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHead light eyebrow="International Participation" title={<>Learning from the <em>world&apos;s leading congresses.</em></>} lead="The Society has participated in international conferences including IRACON, EULAR, ACR and the conferences of the Société Française de Rhumatologie." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {conferences.map((c, i) => (
                <Reveal key={c.code} delay={i * 0.08} className="rounded-2xl bg-white/[.05] p-7 ring-1 ring-white/10">
                  <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-gold">{c.region}</div>
                  <div className="mt-2 font-display text-3xl font-bold">{c.code}</div>
                  <p className="mt-1 text-[14.5px] text-white/60">{c.name}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 flex gap-3 text-[14px] text-white/50"><Info className="mt-0.5 h-4 w-4 shrink-0" />Presented as international conference participation, not formal institutional affiliations.</p>
          </div>
          <Reveal className="relative mx-auto w-full max-w-[560px]">
            <Globe />
            <CircleText text="INTERNATIONAL · COLLABORATION · EXCHANGE · " className="absolute -left-6 -top-6" size={200} />
          </Reveal>
        </div>
        <Marquee items={["IRACON", "EULAR", "ACR", "SFR", "PAFLAR", "AFLAR 2019"]} className="mt-24 border-y border-white/10 py-7 text-white/80" />
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead
            eyebrow="PAFLAR"
            title={<>The Paediatric Society of the <em>African League Against Rheumatism.</em></>}
            lead="PAFLAR is focused on advancing paediatric rheumatology in Africa. The Rheumatology Society, Mauritius is collaborating with PAFLAR, as an independent Mauritian professional society, to host the 7th PAFLAR Congress."
            aside={<a href={congress.links.paflar} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Visit PAFLAR <ArrowUpRight className="h-4 w-4" /></a>}
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-line ring-1 ring-line md:grid-cols-2 lg:grid-cols-3">
            {paflarThemes.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.08} className="bg-white p-9">
                <div className="font-serif text-4xl font-light text-teal">0{i + 1}</div>
                <h3 className="mt-5 text-xl font-semibold text-navy">{t.title}</h3>
                <p className="mt-2 text-[15.5px] text-muted">{t.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14"><Link href="/paflar-2027" className="btn btn-red">7th PAFLAR Congress · Mauritius 2027 <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
