import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ImgKey } from "@/lib/images";
import { DuoImage } from "./DuoImage";
import { Orbits } from "./Orbits";
import { SplitHeading, Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs = [],
  children,
  tone = "navy",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: ImgKey;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  tone?: "navy" | "teal" | "ocean" | "none";
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy-deep pb-16 pt-36 text-white sm:pb-24 sm:pt-44 md:pb-32 md:pt-56">
      <DuoImage name={image} tone={tone} priority className={`!absolute inset-0 -z-10 ${tone === "none" ? "" : "opacity-80"}`} imgClassName="object-[70%_center]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,32,52,.96)_0%,rgba(11,32,52,.85)_35%,rgba(11,32,52,.35)_65%,rgba(11,32,52,.1)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-navy-deep/45 md:hidden" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-deep/70 to-transparent" />
      <Orbits className="absolute -right-48 -top-24 -z-10 w-[680px] opacity-70" />
      <div className="wrap">
        <nav className="mb-10 flex flex-wrap items-center gap-2 font-cond text-[13px] uppercase tracking-[0.18em] text-white/60" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5" />
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-sky">{c.label}</span>}
            </span>
          ))}
        </nav>
        <Reveal><span className="eyebrow-plain text-gold">{eyebrow}</span></Reveal>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2rem,8.6vw,2.6rem)] font-light leading-[1.08] text-white sm:mt-6 sm:text-[clamp(2.6rem,6vw,5.2rem)] sm:leading-[1.02]">
          <SplitHeading text={title} />
        </h1>
        {lead && (
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/80 sm:mt-8 sm:text-[1.2rem]">{lead}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.45} className="mt-10">{children}</Reveal>}
      </div>
    </section>
  );
}
