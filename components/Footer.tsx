import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { Orbits } from "./Orbits";
import { congress, site } from "@/lib/content";

const cols = [
  { h: "The Society", l: [["About us", "/about"], ["Our journey", "/about#journey"], ["The team", "/committee"], ["Gallery", "/gallery"], ["Contact", "/contact"]] },
  { h: "Programmes", l: [["Education & CPD", "/education"], ["Research & publications", "/research"], ["Patient awareness", "/awareness"], ["International collaboration", "/international"], ["Partnerships & support", "/partnerships"]] },
  { h: "PAFLAR 2027", l: [["Congress overview", "/paflar-2027"], ["Programme", "/paflar-2027/programme"], ["Accommodation", "/paflar-2027/accommodation"], ["Welcome to Mauritius", "/paflar-2027/mauritius"], ["Travel & logistics", "/paflar-2027/travel"], ["Sponsorship", "/paflar-2027/sponsorship"]] },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="flex h-1.5">
        <i className="flex-1 bg-brand-red" /><i className="flex-1 bg-navy" /><i className="flex-1 bg-brand-yellow" /><i className="flex-1 bg-brand-green" />
      </div>
      <Orbits className="absolute -right-56 -top-40 w-[720px] opacity-40" stroke="rgba(143,211,232,.18)" />
      <div className="wrap relative pb-10 pt-24">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.1] text-white">
              Advancing Rheumatology in Mauritius, <em className="font-serif italic text-sky">together.</em>
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4 lg:items-end">
            <Link href="/contact" className="btn btn-gold">Get in touch <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="/paflar-2027" className="btn btn-ghost">PAFLAR 2027 congress <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed">A professional medical society advancing rheumatology through education, research, awareness and collaboration since {site.established}.</p>
            <div className="mt-6 space-y-2 text-[15px]">
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-sky" />{site.email}</p>
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-sky" />Mauritius</p>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h5 className="font-cond text-[14px] uppercase tracking-[0.2em] text-white">{c.h}</h5>
              <ul className="mt-6 space-y-3 text-[15px]">
                {c.l.map(([t, h]) => (
                  <li key={h}><Link href={h} className="transition hover:text-sky">{t}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[13.5px] text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex gap-4"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link><Link href="/accessibility" className="hover:text-white">Accessibility</Link></p>
        </div>
      </div>
    </footer>
  );
}
