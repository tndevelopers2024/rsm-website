import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, Info, Mail, Mic2, Utensils, Plane, Coffee, ShoppingBag, BookOpen, MonitorPlay, Crown, Award, Medal, MapPin, Ruler } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { sponsorship as s } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { CongressSubNav } from "@/components/CongressSubNav";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { CongressCta } from "@/components/CongressCta";
import { ParticleWaves } from "@/components/Abstracts";

export const metadata: Metadata = pageMeta({
  title: "Sponsorship · PAFLAR 2027",
  description: "Exhibition booths, satellite symposia and branding opportunities at the 7th PAFLAR Congress, 8–9 May 2027 (pre-congress workshop 7 May), Hilton Mauritius Resort & Spa, Flic-en-Flac.",
  path: "/paflar-2027/sponsorship",
  paflar: true,
});

const mail = `mailto:${s.secretariat}?subject=${encodeURIComponent("PAFLAR 2027 sponsorship enquiry")}`;
const tierStyle = [
  { icon: Crown, card: "bg-navy-deep text-white ring-gold/40", accent: "text-gold", sub: "text-white/70", line: "border-white/10", btn: "btn-gold", badge: "Most visibility" },
  { icon: Award, card: "bg-white text-navy ring-line", accent: "text-[#a8862f]", sub: "text-muted", line: "border-line", btn: "btn-outline", badge: "" },
  { icon: Medal, card: "bg-white text-navy ring-line", accent: "text-[#7b8794]", sub: "text-muted", line: "border-line", btn: "btn-outline", badge: "" },
];
const brandIcons = [ShoppingBag, BookOpen, MonitorPlay];

export default function SponsorshipPage() {
  return (
    <>
      <PageHero eyebrow="7th PAFLAR Congress · Sponsorship" title="Partner with PAFLAR 2027" lead="Educational and commercial support opportunities at the congress for paediatric rheumatology in Africa, Mauritius 2027." image="heroPanel" tone="none" crumbs={[{ label: "PAFLAR 2027", href: "/paflar-2027" }, { label: "Sponsorship" }]}>
        <div className="flex flex-wrap gap-3">
          <a href="#packages" className="btn btn-gold">View packages <ArrowRight className="h-4 w-4" /></a>
          <a href={mail} className="btn btn-ghost"><Mail className="h-4 w-4" /> Sponsorship enquiry</a>
        </div>
      </PageHero>
      <CongressSubNav />

      {/* WHY SPONSOR */}
      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <ParticleWaves className="inset-x-0 bottom-0 -z-10 h-[220px] w-full" opacity={0.18} rows={8} />
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Why Sponsor" title={<>Reach the leaders of <em>paediatric Rheumatology</em> in Africa.</>} />
            <Reveal delay={0.1}><p className="mt-7 text-[1.08rem] leading-relaxed text-muted">{s.intro}</p></Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {s.stats.map((x, i) => (
                <Reveal key={x.k} delay={0.1 + i * 0.06} className="rounded-2xl bg-mist p-5 ring-1 ring-line">
                  <div className="font-display text-[2.2rem] font-light leading-none text-teal">{x.v}</div>
                  <div className="mt-2 text-[13.5px] leading-snug text-ink/75">{x.k}</div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
              <Image src="/images/gallery/g16.jpg" alt="A full house for the scientific programme" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-navy-deep p-5 text-white shadow-[0_30px_60px_-30px_rgba(11,32,52,.7)] sm:left-auto sm:w-[320px]">
              <MapPin className="h-5 w-5 shrink-0 text-gold" />
              <div className="text-[14px] leading-snug"><div className="font-medium">Hilton Mauritius, Flic-en-Flac · 8–9 May</div><div className="text-white/60">Workshop: Artemis Cascavelle Hospital · 7 May</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXHIBITION PACKAGES */}
      <section id="packages" className="scroll-mt-32 bg-mist py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Commercial Support" title={<>Exhibition <em>packages.</em></>} lead="Three booth tiers, each with congress guide advertising, flyers in the congress bags and on-screen adverts during breaks." />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {s.booths.map((b, i) => {
              const t = tierStyle[i];
              return (
                <Reveal key={b.tier} delay={i * 0.08} className={`relative flex flex-col rounded-[28px] p-8 ring-1 md:p-9 ${t.card}`}>
                  {t.badge && <span className="absolute right-6 top-6 rounded-full bg-gold px-3 py-1 font-cond text-[11px] uppercase tracking-[0.16em] text-navy-deep">{t.badge}</span>}
                  <t.icon className={`h-8 w-8 ${t.accent}`} strokeWidth={1.4} />
                  <div className={`mt-5 font-cond text-[14px] uppercase tracking-[0.24em] ${t.accent}`}>{b.tier}</div>
                  <div className="mt-2 font-display text-[2.6rem] font-light leading-none">{b.price}</div>
                  <div className={`mt-6 grid grid-cols-2 gap-3 border-y py-5 text-[14px] ${t.line}`}>
                    <div className="flex items-center gap-2"><Ruler className={`h-4 w-4 ${t.accent}`} /><span><b className="font-semibold">{b.area}</b> <span className={t.sub}>approx.</span></span></div>
                    <div className="flex items-center gap-2"><MapPin className={`h-4 w-4 shrink-0 ${t.accent}`} /><span className={t.sub}>{b.position}</span></div>
                  </div>
                  <ul className="mt-6 space-y-3.5 text-[15px]">
                    {[b.guide, b.flyers, b.screen].map((f) => (
                      <li key={f} className="flex gap-3"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.accent}`} /><span>{f}</span></li>
                    ))}
                  </ul>
                  <a href={`mailto:${s.secretariat}?subject=${encodeURIComponent(`PAFLAR 2027 ${b.tier} exhibition booth`)}`} className={`btn mt-auto w-full ${t.btn} !mt-9`}>Enquire about {b.tier}</a>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-8 flex gap-3 rounded-2xl bg-white p-5 text-[14.5px] text-muted ring-1 ring-line">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            Exhibitors receive an allocated exhibition space with tables and chairs, which you are free to arrange to suit your needs. Three-dimensional framed booths are not provided.
          </Reveal>
        </div>
      </section>

      {/* EDUCATIONAL SUPPORT */}
      <section className="relative isolate overflow-hidden bg-navy-deep py-24 text-white md:py-32">
        <div className="wrap">
          <SectionHead light eyebrow="Educational Support" title={<>Satellite symposia & <em>educational grants.</em></>} lead="Host a dedicated scientific session or support delegates and the pre-congress workshop." />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {s.symposia.map((x, i) => {
              const Icon = i ? Utensils : Mic2;
              return (
                <Reveal key={x.k} delay={i * 0.08} className="rounded-[28px] bg-white/[.06] p-8 ring-1 ring-white/12 md:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="font-cond text-[13px] uppercase tracking-[0.22em] text-gold">{x.k}</div>
                      <div className="mt-3 font-display text-[2.4rem] font-light leading-none">{x.price}</div>
                    </div>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold/15"><Icon className="h-6 w-6 text-gold" /></span>
                  </div>
                  <ul className="mt-8 grid gap-3 text-[15px] text-white/85 sm:grid-cols-3 sm:gap-4">
                    {x.items.map((it) => <li key={it} className="flex gap-2.5 sm:flex-col sm:gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-bright" />{it}</li>)}
                  </ul>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {s.education.map((x, i) => {
              const Icon = i ? Coffee : Plane;
              return (
                <Reveal key={x.k} delay={0.1 + i * 0.08} className="flex gap-5 rounded-[24px] border border-white/12 p-7">
                  <Icon className="mt-1 h-6 w-6 shrink-0 text-sky" />
                  <div><h3 className="text-[19px] font-medium">{x.k}</h3><p className="mt-2 text-[15px] leading-relaxed text-white/70">{x.d}</p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRANDING */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Branding & Services" title={<>Put your brand in <em>every delegate&apos;s hands.</em></>} />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {s.branding.map((x, i) => {
              const Icon = brandIcons[i];
              return (
                <Reveal key={x.k} delay={i * 0.08} className="group flex flex-col rounded-[28px] bg-white p-8 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(20,45,70,.5)]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-aqua"><Icon className="h-6 w-6 text-teal" /></span>
                  <h3 className="mt-6 text-[20px] font-medium text-navy">{x.k}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{x.d}</p>
                  <div className="mt-7 border-t border-line pt-5 font-display text-[1.7rem] font-light text-navy">{x.price}</div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="bg-mist py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Get in Touch" title={<>Talk to the <em>organising committee.</em></>} lead="Tell us which opportunities interest you and we will share details and availability." />
            <Reveal delay={0.15} className="mt-9 rounded-[24px] bg-navy-deep p-7 text-white">
              <div className="font-cond text-[12px] uppercase tracking-[0.22em] text-gold">PAFLAR Secretariat</div>
              <a href={mail} className="mt-2 block break-all font-display text-[1.35rem] font-light hover:text-sky">{s.secretariat}</a>
              <a href={mail} className="btn btn-gold mt-6"><Mail className="h-4 w-4" /> Send an enquiry</a>
            </Reveal>
          </div>
          <div className="grid gap-4 self-start">
            {s.contacts.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08} className="flex items-center gap-5 rounded-[22px] bg-white p-6 ring-1 ring-line">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal to-navy font-display text-lg font-semibold text-white">
                  {c.name.replace(/^Dr\s*(\(Mrs\)\s*)?/, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0">
                  <div className="font-cond text-[12px] uppercase tracking-[0.2em] text-teal">{c.role}</div>
                  <div className="mt-1 text-[17px] font-semibold text-navy">{c.name}</div>
                  <div className="mt-0.5 text-[14px] text-muted">{c.org}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CongressCta />
    </>
  );
}
