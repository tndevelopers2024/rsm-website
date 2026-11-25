import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Orbits } from "./Orbits";
import { site } from "@/lib/content";

export function ComingSoon({ title, text }: { title: string; text?: string }) {
  return (
    <section className="relative isolate grid min-h-[86vh] place-items-center overflow-hidden bg-navy-deep px-6 pb-20 pt-40 text-center text-white">
      <Orbits className="absolute left-1/2 top-1/2 -z-10 w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="max-w-2xl">
        <span className="inline-flex rounded-full border border-gold/50 px-5 py-2 font-cond text-[13px] uppercase tracking-[0.24em] text-gold">Coming soon</span>
        <h1 className="mt-8 font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-tight">{title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-[1.1rem] text-white/75">{text ?? "This page is being prepared and will be published shortly."}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-gold"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
          <Link href="/contact" className="btn btn-ghost"><Mail className="h-4 w-4" /> Contact the Society</Link>
        </div>
        <p className="mt-8 text-[14px] text-white/45">{site.email}</p>
      </div>
    </section>
  );
}
