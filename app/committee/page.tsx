import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LIVE } from "@/lib/launch";
import { ComingSoon } from "@/components/ComingSoon";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { committee } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { MemberCard } from "@/components/MemberCard";

export const metadata: Metadata = pageMeta({ title: "The Team", description: "Meet the office bearers and members of the Rheumatology Society, Mauritius — consultant rheumatologists and physicians across the island.", path: "/committee" });

function CommitteePage() {
  const officers = committee.filter((m) => m.officer);
  const members = committee.filter((m) => !m.officer);
  return (
    <>
      <PageHero eyebrow="Leadership" title="The Team" lead="The consultant rheumatologists and physicians who lead the Society's work in education, research, awareness and collaboration." image="audience3" crumbs={[{ label: "About", href: "/about" }, { label: "The Team" }]} />
      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Office bearers" title={<>Leading <em>the Society.</em></>} lead="The Society's elected office bearers, drawn from public hospitals across Mauritius." />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {officers.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 0.07}><MemberCard m={m} i={i} /></Reveal>
            ))}
          </div>

          <div className="mt-28">
            <SectionHead eyebrow="Members" title={<>Our <em>members.</em></>} />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-5">
              {members.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.06}><MemberCard m={m} i={i + 1} compact /></Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-20 rounded-[28px] bg-mist p-10 md:p-12">
            <h3 className="text-2xl font-medium text-navy">Contacting the team</h3>
            <p className="mt-3 max-w-2xl text-muted">For enquiries to the Society or any of its office bearers, please use the Society&apos;s enquiry form and we will direct your message.</p>
            <Link href="/contact" className="btn btn-teal mt-8">Contact the Society <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return LIVE.committee ? <CommitteePage /> : <ComingSoon title="The Team" />;
}
