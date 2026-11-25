import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LIVE } from "@/lib/launch";
import { ComingSoon } from "@/components/ComingSoon";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { news, congress } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { DuoImage } from "@/components/DuoImage";

export const metadata: Metadata = pageMeta({ title: "News & Events", description: "Latest news, conferences, CPD sessions and awareness events from the Rheumatology Society, Mauritius.", path: "/news" });

function NewsPage() {
  const [lead, ...rest] = news;
  return (
    <>
      <PageHero eyebrow="News & Events" title="News, events and announcements." lead="Upcoming and past events, congress updates and Society announcements." image="heroPanel" tone="none" crumbs={[{ label: "News & Events" }]} />

      <section className="py-28 md:py-36">
        <div className="wrap">
          <Reveal>
            <Link href={lead.href} className="group grid overflow-hidden rounded-[32px] bg-navy text-white lg:grid-cols-2">
              <div className="relative min-h-[380px]"><DuoImage name={lead.image} tone="none" sizes="50vw" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" /></div>
              <div className="flex flex-col justify-center p-10 md:p-16">
                <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-gold">Featured · {lead.date}</span>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-tight">{lead.title}</h2>
                <p className="mt-5 text-white/75">{lead.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-cond text-[14px] uppercase tracking-[0.16em] text-sky">Congress details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {rest.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.08}>
                <Link href={n.href} className="group flex h-full flex-col overflow-hidden rounded-[24px] ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(20,45,70,.5)]">
                  <div className="relative aspect-[4/3]"><DuoImage name={n.image} tone="none" sizes="33vw" className="!absolute inset-0 transition duration-[1400ms] group-hover:scale-105" /></div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="font-cond text-[12.5px] uppercase tracking-[0.2em] text-teal">{n.tag} · {n.date}</span>
                    <h3 className="mt-3 text-xl font-semibold text-navy">{n.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] text-muted">{n.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-28 md:py-36">
        <div className="wrap">
          <SectionHead eyebrow="Upcoming Events" title={<>In the <em>calendar.</em></>} />
          <div className="mt-14 space-y-4">
            {[
              { d: "07", m: "May 2027", t: "Pre-congress workshop", s: "7th PAFLAR Congress", h: "/paflar-2027/programme" },
              { d: "08–09", m: "May 2027", t: "Scientific congress sessions", s: "7th PAFLAR Congress", h: "/paflar-2027/programme" },
              { d: "Qtr", m: "Quarterly", t: "CPD session", s: "Details to be announced", h: "/education" },
            ].map((e, i) => (
              <Reveal key={e.t} delay={i * 0.06}>
                <Link href={e.h} className="group flex flex-col gap-6 rounded-[24px] bg-white p-7 transition hover:shadow-[0_30px_60px_-40px_rgba(20,45,70,.45)] md:flex-row md:items-center">
                  <div className="w-36 shrink-0"><div className="font-serif text-5xl font-light text-teal">{e.d}</div><div className="font-cond text-[13px] uppercase tracking-[0.16em] text-muted">{e.m}</div></div>
                  <div className="flex-1"><h3 className="text-xl font-semibold text-navy">{e.t}</h3><p className="mt-1 flex flex-wrap items-center gap-4 text-[15px] text-muted"><span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{e.s}</span>{e.s.includes("PAFLAR") && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{congress.venue}</span>}</p></div>
                  <ArrowRight className="h-6 w-6 text-navy transition group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return LIVE.news ? <NewsPage /> : <ComingSoon title="News & Events" />;
}
