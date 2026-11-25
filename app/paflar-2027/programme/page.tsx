import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ArrowUpRight, UserRound, Clock } from "lucide-react";
import { congress, programme } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { CongressSubNav } from "@/components/CongressSubNav";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Pending } from "@/components/Pending";
import { CongressCta } from "@/components/CongressCta";

export const metadata: Metadata = pageMeta({ title: "Programme · PAFLAR 2027", description: "Scientific programme and themes of the 7th PAFLAR Congress, 7–9 May 2027, Mauritius.", path: "/paflar-2027/programme", paflar: true });

export default function ProgrammePage() {
  return (
    <>
      <PageHero eyebrow="7th PAFLAR Congress · Programme" title="Scientific programme" lead="A pre-congress workshop on 7 May followed by two days of scientific congress sessions on 8–9 May 2027." image="audience" tone="ocean" crumbs={[{ label: "PAFLAR 2027", href: "/paflar-2027" }, { label: "Programme" }]} />
      <CongressSubNav />

      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Three Days" title={<>The congress <em>at a glance.</em></>} aside={<Pending>Detailed programme awaiting official release</Pending>} />
          <div className="mt-16 space-y-6">
            {programme.map((d, i) => (
              <Reveal key={d.day} delay={i * 0.08} className="grid overflow-hidden rounded-[28px] ring-1 ring-line md:grid-cols-[260px_1fr]">
                <div className={`p-10 text-white ${i === 0 ? "bg-gold" : "bg-navy"}`}>
                  <div className="font-cond text-[13px] uppercase tracking-[0.2em] opacity-80">{d.weekday}</div>
                  <div className="font-serif text-[96px] font-light leading-none">{d.day}</div>
                  <div className="font-cond text-[13px] uppercase tracking-[0.2em] opacity-80">May 2027</div>
                </div>
                <div className="p-10">
                  <span className="rounded-full bg-aqua px-3.5 py-1 font-cond text-[12px] uppercase tracking-[0.14em] text-teal">{d.kind}</span>
                  <h3 className="mt-5 text-3xl font-light text-navy">{d.title}</h3>
                  <p className="mt-3 max-w-2xl text-muted">{d.text}</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {["Morning", "Midday", "Afternoon"].map((s) => (
                      <div key={s} className="rounded-xl border border-dashed border-line p-4">
                        <div className="flex items-center gap-2 font-cond text-[12px] uppercase tracking-[0.16em] text-muted"><Clock className="h-3.5 w-3.5" />{s}</div>
                        <div className="mt-1 text-[14.5px] text-navy">Sessions to be announced</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-[24px] bg-mist p-8">
            <p className="max-w-xl text-muted">The full scientific programme will be published here once released by the organisers. The latest information is always on the official congress page.</p>
            <a href={congress.links.main} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Official congress page <ArrowUpRight className="h-4 w-4" /></a>
          </Reveal>
        </div>
      </section>

      <section id="speakers" className="bg-mist py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Speakers & Faculty" title={<>Faculty from <em>across the world.</em></>} aside={<Pending>To be announced</Pending>} />
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Reveal key={i} delay={(i % 4) * 0.07} className="rounded-[24px] bg-white p-6 text-center">
                <div className="duo duo-ocean relative mx-auto aspect-square w-full max-w-[180px] rounded-full"><div className="absolute inset-0 grid place-items-center"><UserRound className="h-14 w-14 text-white/50" strokeWidth={1} /></div></div>
                <h3 className="mt-5 font-semibold text-navy">To be announced</h3>
                <p className="text-[14px] text-muted">{i < 2 ? "Keynote speaker" : "Faculty"}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CongressCta />
    </>
  );
}
