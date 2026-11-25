import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LIVE } from "@/lib/launch";
import { ComingSoon } from "@/components/ComingSoon";
import { Building2, GraduationCap, Globe2, Briefcase, HeartHandshake, Landmark } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Pending } from "@/components/Pending";
import { ContactForm } from "@/components/ContactForm";
import { initiatives } from "@/lib/content";

export const metadata: Metadata = pageMeta({ title: "Partnerships & Support", description: "Partner with the Rheumatology Society, Mauritius — universities, healthcare institutions, international associations, sponsors and donors.", path: "/partnerships" });

const audiences = [
  { i: GraduationCap, t: "Universities", d: "Academic collaboration, teaching and research partnerships." },
  { i: Building2, t: "Healthcare institutions", d: "Hospitals and clinical services working to improve rheumatology care." },
  { i: Globe2, t: "International associations", d: "Knowledge exchange and collaboration with medical societies abroad." },
  { i: Briefcase, t: "Corporate sponsors", d: "Support for congresses, CPD and education programmes." },
  { i: HeartHandshake, t: "Philanthropic organisations", d: "Funding for awareness, research and long-term initiatives." },
  { i: Landmark, t: "Donors", d: "Individual support for the Society's mission. Online giving in a later phase." },
];

function PartnershipsPage() {
  return (
    <>
      <PageHero eyebrow="Partnerships & Support" title="Partner with us to advance Rheumatology in Mauritius." lead="Institutional enquiries and approved funding initiatives that help the Society deliver education, research and patient care." image="hospital" crumbs={[{ label: "Support Us" }]} />

      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Who We Work With" title={<>Partnerships that <em>multiply impact.</em></>} />
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.t} delay={(i % 3) * 0.08} className="group rounded-[24px] p-9 ring-1 ring-line transition hover:bg-navy hover:text-white hover:ring-navy">
                <a.i className="h-9 w-9 text-teal transition group-hover:text-gold" strokeWidth={1.4} />
                <h3 className="mt-6 text-xl font-semibold text-navy transition group-hover:text-white">{a.t}</h3>
                <p className="mt-2 text-[15.5px] text-muted transition group-hover:text-white/70">{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="What Your Support Enables" title={<>Initiatives you can <em>help build.</em></>} aside={<Pending>Donation functionality in a later phase</Pending>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((x, i) => (
              <Reveal key={x.key} delay={(i % 3) * 0.06} className="rounded-2xl bg-white p-7">
                <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-teal">0{i + 1}</div>
                <h3 className="mt-2 text-lg font-semibold text-navy">{x.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{x.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead eyebrow="Start a Conversation" title={<>Institutional & <em>sponsorship enquiries.</em></>} lead="Tell us about your organisation and how you would like to support the Society. A committee member will respond." />
          <Reveal delay={0.1}><ContactForm defaultType="Institutional partnership" /></Reveal>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return LIVE.partnerships ? <PartnershipsPage /> : <ComingSoon title="Partnerships & Support" />;
}
