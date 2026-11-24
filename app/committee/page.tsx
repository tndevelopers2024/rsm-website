import type { Metadata } from "next";
import Link from "next/link";
import { UserRound, ArrowRight } from "lucide-react";
import { committee } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Pending } from "@/components/Pending";

export const metadata: Metadata = { title: "Managing Committee" };

export default function CommitteePage() {
  return (
    <>
      <PageHero eyebrow="Leadership" title="Managing Committee" lead="The clinicians and professionals who lead the Society's work in education, research, awareness and collaboration." image="audience3" crumbs={[{ label: "About", href: "/about" }, { label: "Committee" }]} />
      <section className="py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="The Committee" title={<>Leading <em>the Society.</em></>} aside={<Pending>Names, designations, biographies & photographs awaiting approval</Pending>} />
          <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {committee.map((m, i) => (
              <Reveal key={i} delay={(i % 4) * 0.07} className="group overflow-hidden rounded-[24px] bg-white ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(20,45,70,.5)]">
                <div className="duo duo-ocean relative aspect-[4/5]">
                  <div className="absolute inset-0 grid place-items-center"><UserRound className="h-20 w-20 text-white/45" strokeWidth={1} /></div>
                </div>
                <div className="p-6">
                  <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-teal">{m.role}</div>
                  <div className="mt-1 font-display text-lg font-semibold text-navy">Name to be confirmed</div>
                  <p className="mt-1 text-[14px] text-muted">Designation & biography</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 rounded-[28px] bg-mist p-10 md:p-12">
            <h3 className="text-2xl font-medium text-navy">Contacting the committee</h3>
            <p className="mt-3 max-w-2xl text-muted">Public contact details for individual committee members will be published once confirmed. In the meantime, please use the Society&apos;s enquiry form.</p>
            <Link href="/contact" className="btn btn-teal mt-8">Contact the Society <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
