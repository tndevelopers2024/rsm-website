import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LIVE } from "@/lib/launch";
import { ComingSoon } from "@/components/ComingSoon";
import Link from "next/link";
import { ArrowRight, Database, FlaskConical, ClipboardList, FileText, Building2 } from "lucide-react";
import { initiatives } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { DuoImage } from "@/components/DuoImage";
import { Pending } from "@/components/Pending";
import { Orbits } from "@/components/Orbits";

export const metadata: Metadata = pageMeta({ title: "Research & Publications", description: "Supporting rheumatology research, registries, clinical guidelines and publications in Mauritius.", path: "/research" });

const icons = { registries: Database, research: FlaskConical, guidelines: ClipboardList } as const;

function ResearchPage() {
  const research = initiatives.filter((x) => x.key in icons);
  const coe = initiatives.find((x) => x.key === "coe")!;
  return (
    <>
      <PageHero eyebrow="Research & Publications" title="Building the evidence for better Rheumatology care." lead="Research priorities, disease registries and locally relevant clinical guidelines, developed responsibly with the Society's medical leadership." image="researchTalk" tone="none" position="object-[center_22%]" crumbs={[{ label: "Research" }]} />

      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Research Priorities" title={<>Where we are <em>focusing.</em></>} aside={<Pending>Status to be confirmed</Pending>} />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {research.map((x, i) => {
              const Icon = icons[x.key as keyof typeof icons];
              return (
                <Reveal key={x.key} delay={i * 0.1} className="group overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
                  <div className="relative h-64 overflow-hidden">
                    <DuoImage name={x.image} tone="navy" sizes="33vw" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" />
                    <span className="absolute bottom-6 left-6 grid h-14 w-14 place-items-center rounded-2xl bg-white text-teal"><Icon className="h-6 w-6" /></span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-medium text-navy">{x.title}</h3>
                    <p className="mt-3 text-muted">{x.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grain relative isolate overflow-hidden bg-navy-deep py-28 text-white md:py-36">
        <DuoImage name="hospital" tone="gold" className="!absolute inset-0 -z-20 opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/40" />
        <Orbits className="absolute -right-40 top-1/2 -z-10 w-[760px] -translate-y-1/2 opacity-60" />
        <div className="wrap max-w-3xl">
          <Reveal><Building2 className="h-12 w-12 text-gold" strokeWidth={1.2} /></Reveal>
          <Reveal delay={0.1}><span className="eyebrow-plain mt-8 block text-gold">Long-term Vision</span></Reveal>
          <Reveal delay={0.15}><h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[1.05]">A Centre of Excellence in <em className="font-serif italic text-sky">Rheumatology.</em></h2></Reveal>
          <Reveal delay={0.25}><p className="mt-7 text-[1.15rem] text-white/75">{coe.text}</p></Reveal>
          <Reveal delay={0.35}><Link href="/partnerships" className="btn btn-gold mt-10">Partner with us <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Publications & Guidelines" title={<>Resources <em>for clinicians.</em></>} lead="Local guidelines, publication links and research outputs will be listed here as they become available." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {["Local clinical guidelines", "Member publications", "Registry reports"].map((t, i) => (
              <Reveal key={t} delay={i * 0.08} className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-line p-7">
                <div className="flex items-center gap-4"><FileText className="h-6 w-6 text-teal" /><span className="font-display font-semibold text-navy">{t}</span></div>
                <Pending>Soon</Pending>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return LIVE.research ? <ResearchPage /> : <ComingSoon title="Research & Publications" />;
}
