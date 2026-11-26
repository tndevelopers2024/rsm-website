"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight, ArrowRight, Mail, CalendarDays } from "lucide-react";
import clsx from "clsx";
import { nav, site, congress } from "@/lib/content";
import { MegaPanel } from "./MegaPanel";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setOpen(false);
    setHover(null);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]));
  const navItems = nav.filter((n) => n.label !== "PAFLAR 2027");
  const paflar = nav.find((n) => n.label === "PAFLAR 2027")!;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip */}
      <div className={clsx("overflow-hidden bg-navy-deep text-white/75 transition-all duration-500", scrolled ? "max-h-0" : "max-h-10")}>
        <div className="wrap flex h-8 items-center justify-center gap-6 text-[12px] sm:h-9 sm:justify-between sm:text-[12.5px]">
          <span className="hidden items-center gap-2 sm:flex">
            <span className="flex h-1.5 w-6 overflow-hidden rounded-full"><i className="flex-1 bg-brand-red" /><i className="flex-1 bg-sky" /><i className="flex-1 bg-brand-yellow" /><i className="flex-1 bg-brand-green" /></span>
            Professional medical society · Established {site.established}
          </span>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-2 md:flex"><Mail className="h-3.5 w-3.5 text-sky" />{site.email}</span>
            <Link href="/paflar-2027" className="flex items-center gap-2 text-gold hover:text-white">
              <CalendarDays className="h-3.5 w-3.5" /> 7th PAFLAR Congress · {congress.dates}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={clsx("border-b bg-white transition-shadow duration-500", scrolled ? "border-line shadow-[0_12px_40px_-24px_rgba(11,32,52,.45)]" : "border-transparent")}>
        <div className="wrap flex h-[62px] items-center justify-between gap-6 lg:h-[76px]">
          <Link href="/" aria-label="Rheumatology Society, Mauritius home" className="shrink-0">
            <Image src="/brand/rsm-logo-wide.jpg" alt="Rheumatology Society Mauritius" width={440} height={140} priority className="h-[38px] w-auto lg:h-[46px]" />
          </Link>

          <nav className="hidden items-center lg:flex xl:gap-1" onMouseLeave={() => setHover(null)}>
            {navItems.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setHover(item.label)}>
                <Link
                  href={item.href}
                  className={clsx(
                    "group relative flex items-center gap-1 rounded-full px-3 py-2.5 font-display text-[14.5px] xl:px-4 xl:text-[15px] font-semibold tracking-[-0.01em] transition-colors",
                    isActive(item.href) ? "text-teal" : "text-navy hover:text-teal",
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform", hover === item.label && "rotate-180")} />}
                  <span className={clsx("absolute inset-x-3 -bottom-[17px] xl:inset-x-4 h-[2px] origin-left bg-teal transition-transform duration-300", isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
                </Link>
                <AnimatePresence>
                  {item.children && hover === item.label && <MegaPanel item={item} />}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="relative" onMouseEnter={() => setHover("paflar")} onMouseLeave={() => setHover(null)}>
              <Link href="/paflar-2027/register" className="flex items-center gap-3 rounded-full bg-crimson py-3 pl-6 pr-5 text-white shadow-[0_10px_24px_-12px_rgba(181,18,58,.8)] transition hover:bg-[#9a0f31]">
                <span className="font-display text-[15px] font-semibold leading-none">Registration</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              <AnimatePresence>
                {hover === "paflar" && <MegaPanel item={paflar} align="right" dark />}
              </AnimatePresence>
            </div>
            <Link href="/contact" className="hidden rounded-full px-5 py-3 xl:block font-display text-[14.5px] font-semibold text-navy ring-1 ring-navy/20 transition hover:bg-navy hover:text-white">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
          <Link href="/paflar-2027/register" className="rounded-full bg-crimson px-4 py-2.5 font-display text-[13.5px] font-semibold text-white">Register</Link>
          <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] overflow-y-auto bg-navy-deep lg:hidden">
            <div className="wrap flex h-[76px] items-center justify-between">
              <span className="rounded-lg bg-white px-2 py-1"><Image src="/brand/rsm-logo-wide.jpg" alt="Rheumatology Society Mauritius" width={440} height={140} className="h-9 w-auto" /></span>
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="wrap pb-16 pt-4">
              {nav.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }} className="border-b border-white/10 py-4">
                  <Link href={item.href} className="font-display text-2xl font-medium text-white">{item.label}</Link>
                  {item.children && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/75">{c.label}</Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/paflar-2027/register" className="btn btn-red">Registration</Link><Link href="/contact" className="btn btn-gold">Contact the Society</Link></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
