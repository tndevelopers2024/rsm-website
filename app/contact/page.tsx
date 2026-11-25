import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Mail, MapPin, CalendarDays, ArrowUpRight } from "lucide-react";
import { site, congress } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Pending } from "@/components/Pending";

export const metadata: Metadata = pageMeta({ title: "Contact Us", description: "Get in touch with the Rheumatology Society, Mauritius for membership, partnerships, events and enquiries.", path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Get in touch with the Society." lead="For membership, education, partnership, media or congress enquiries, please write to us." image="ocean" tone="ocean" crumbs={[{ label: "Contact" }]} />
      <section className="py-28 md:py-36">
        <div className="wrap grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-5">
            {[
              { i: Mail, k: "Email", v: site.email, p: site.emailPending ? "Proposed address" : undefined },
              { i: MapPin, k: "Location", v: "Mauritius" },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.08} className="flex gap-5 rounded-[24px] bg-mist p-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-teal"><c.i className="h-5 w-5" /></span>
                <div><div className="font-cond text-[12px] uppercase tracking-[0.2em] text-muted">{c.k}</div><div className="mt-1 font-display text-lg font-semibold text-navy">{c.v}</div>{c.p && <div className="mt-2"><Pending>{c.p}</Pending></div>}</div>
              </Reveal>
            ))}
            <Reveal delay={0.2} className="rounded-[24px] bg-navy p-7 text-white">
              <div className="flex items-center gap-3 font-cond text-[12px] uppercase tracking-[0.2em] text-gold"><CalendarDays className="h-4 w-4" /> 7th PAFLAR Congress</div>
              <p className="mt-3 text-white/75">Registration, abstracts and programme questions are handled by the official congress organisers.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={congress.links.main} target="_blank" rel="noopener noreferrer" className="btn btn-gold !px-5 !py-3">Official page <ArrowUpRight className="h-4 w-4" /></a>
                <Link href="/paflar-2027" className="btn btn-ghost !px-5 !py-3">Congress info</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
