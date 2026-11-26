import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EventGallery } from "@/components/EventGallery";
import { CalendarDays, MapPin, Award, Mail, HelpCircle, Check, ChevronRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { days, intlCategories, localDayFee, localCpdPerDay, earlyBirdLabel } from "@/lib/paflar";
import { CongressSubNav } from "@/components/CongressSubNav";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Orbits } from "@/components/Orbits";
import { Accordion } from "@/components/Accordion";
import { RegistrationWizard, EarlyBirdBadge } from "@/components/RegistrationWizard";

export const metadata: Metadata = pageMeta({
  title: "Register · PAFLAR 2027",
  description: "Register for the 7th PAFLAR Congress, 7–9 May 2027, Mauritius. Mauritian residents from MUR 4,000 per day; international delegates from USD 250 early bird.",
  path: "/paflar-2027/register",
  paflar: true,
});

const fmt = (n: number) => n.toLocaleString("en-GB");

const faqs = [
  { q: "Who counts as a Mauritian resident?", a: "Delegates living and practising in Mauritius register by the day at MUR 4,000 per day. Everyone else registers as an international delegate with a full three-day pass." },
  { q: "When do early-bird rates end?", a: `International early-bird rates apply to registrations made up to ${earlyBirdLabel}. From 1 February 2027 the normal rates apply.` },
  { q: "What does my registration include?", a: "Access to the sessions you register for, CPD points (4 per day), and the congress materials. International passes cover all three days: pre-congress workshops on 7 May and the main congress on 8–9 May." },
  { q: "Where are the venues?", a: "Friday's pre-congress workshops are at Artemis Cascavelle Hospital, Cascavelle. The main congress on Saturday and Sunday is at the Hilton Mauritius Resort & Spa, Flic-en-Flac." },
  { q: "Can I cancel or transfer my registration?", a: "Registration is non-refundable, non-transferable and cannot be cancelled, in line with the congress terms and conditions." },
  { q: "How do I pay?", a: "Payment is made online by card at the end of registration. Your confirmation and receipt are sent to the email address you provide." },
];

export default function RegisterPage() {
  return (
    <>
      {/* Compact hero */}
      <section className="grain relative isolate overflow-hidden bg-navy-deep pb-10 pt-32 text-white sm:pt-40 md:pb-12">
        <Image src="/images/aflar2019/a03.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[50%_35%] opacity-30" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,32,52,.97)_0%,rgba(11,32,52,.82)_50%,rgba(11,32,52,.5)_100%)]" />
        <Orbits className="absolute -right-56 -top-40 -z-10 w-[760px] opacity-50" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(34,181,166,.25),transparent_55%)]" />
        <div className="wrap">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-cond text-[13px] uppercase tracking-[0.18em] text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/paflar-2027" className="hover:text-white">PAFLAR 2027</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-sky">Register</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <EarlyBirdBadge />
              <h1 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.05]">Register for <span className="font-serif italic text-gold">PAFLAR 2027</span></h1>
              <p className="mt-4 max-w-2xl text-[1.05rem] text-white/75 sm:text-[1.15rem]">7th PAFLAR Congress · three days of paediatric rheumatology in Mauritius. It takes about three minutes.</p>
            </div>
            <div className="grid w-full grid-cols-3 gap-2 sm:w-auto">
              {[
                { i: CalendarDays, k: "7–9 May 2027" },
                { i: MapPin, k: "Artemis · Hilton" },
                { i: Award, k: "Up to 12 CPD" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl bg-white/[.07] px-4 py-3 text-[13.5px] ring-1 ring-white/15"><x.i className="mb-1.5 h-4 w-4 text-gold" />{x.k}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CongressSubNav sticky={false} />

      {/* Wizard */}
      <section className="py-10 md:py-12">
        <div className="wrap"><RegistrationWizard /></div>
      </section>

      {/* AFLAR 2019 gallery */}
      <section className="pb-20 pt-6 md:pb-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="We've done this before" title={<>AFLAR 2019 at the <em>Hilton Mauritius.</em></>} lead="The Society hosted the 9th AFLAR Congress at the same venue in September 2019. PAFLAR 2027 returns to the Hilton, Flic-en-Flac." />
            <Link href="/gallery" className="btn btn-outline">Full gallery</Link>
          </div>
          <EventGallery className="mt-10" />
        </div>
      </section>

      {/* Fees at a glance */}
      <section id="fees" className="scroll-mt-36 bg-mist py-20 md:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Registration Fees" title={<>Fees at a <em>glance.</em></>} lead={`International early-bird rates apply until ${earlyBirdLabel}.`} />
          <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
            <Reveal className="rounded-[26px] bg-white p-7 ring-1 ring-line md:p-8">
              <div className="flex items-center gap-3"><span className="text-[28px]" aria-hidden>🇲🇺</span><h3 className="text-[20px] font-semibold text-navy">Mauritian residents</h3></div>
              <div className="mt-5 font-display text-[34px] font-semibold text-navy">MUR {fmt(localDayFee)}<span className="ml-1 text-[15px] font-normal text-muted">per day</span></div>
              <ul className="mt-6 divide-y divide-line text-[14.5px]">
                {days.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-3 py-3">
                    <span><span className="font-medium text-navy">{d.weekday} {d.date.replace(" 2027", "")}</span><span className="block text-[12.5px] text-muted">{d.label} · {d.venue}</span></span>
                    <span className="shrink-0 text-[13px] text-teal">{localCpdPerDay} CPD</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-aqua px-4 py-3 text-[13.5px] text-teal">All 3 days: MUR {fmt(localDayFee * 3)} · 12 CPD points</p>
            </Reveal>
            <Reveal delay={0.08} className="overflow-hidden rounded-[26px] bg-white ring-1 ring-line">
              <div className="flex items-center gap-3 p-7 pb-4 md:p-8 md:pb-4"><span className="text-[28px]" aria-hidden>🌍</span><h3 className="text-[20px] font-semibold text-navy">International delegates · 3-day pass</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px] text-left text-[14.5px]">
                  <thead>
                    <tr className="border-y border-line bg-mist/60 font-cond text-[12px] uppercase tracking-[0.14em] text-muted">
                      <th className="px-7 py-3 font-normal md:px-8">Category</th>
                      <th className="px-4 py-3 font-normal">Early bird<span className="block normal-case tracking-normal">to {earlyBirdLabel}</span></th>
                      <th className="px-4 py-3 pr-7 font-normal md:pr-8">Normal<span className="block normal-case tracking-normal">from 1 Feb 2027</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {intlCategories.map((c) => (
                      <tr key={c.id} className="border-b border-line last:border-0">
                        <td className="px-7 py-4 md:px-8"><span className="font-medium text-navy">{c.title}</span><span className="block text-[12.5px] text-muted">{c.copy}</span></td>
                        <td className="px-4 py-4"><span className="font-display text-[18px] font-semibold text-teal">USD {c.early.usd}</span><span className="block text-[12.5px] text-muted">MUR {fmt(c.early.mur)}</span></td>
                        <td className="px-4 py-4 pr-7 md:pr-8"><span className="font-display text-[18px] font-semibold text-navy">USD {c.normal.usd}</span><span className="block text-[12.5px] text-muted">MUR {fmt(c.normal.mur)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-7 py-4 text-[13.5px] text-ink/75 md:px-8">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-teal" /> Workshops + main congress</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-teal" /> 12 CPD points</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ + help */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Questions" title={<>Before you <em>register.</em></>} />
            <Reveal delay={0.1} className="mt-8 rounded-[24px] bg-navy-deep p-7 text-white">
              <HelpCircle className="h-6 w-6 text-gold" />
              <h3 className="mt-4 text-[20px] font-medium">Need help registering?</h3>
              <p className="mt-2 text-[14.5px] text-white/70">Group registrations, invoices or anything else: the congress secretariat will help.</p>
              <a href="mailto:paflar2020@gmail.com?subject=PAFLAR%202027%20registration" className="btn btn-gold mt-6"><Mail className="h-4 w-4" /> Email the Secretariat</a>
            </Reveal>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
