"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { congress } from "@/lib/content";

const links = [
  ["Overview", "/paflar-2027"],
  ["Programme", "/paflar-2027/programme"],
  ["Accommodation", "/paflar-2027/accommodation"],
  ["Welcome to Mauritius", "/paflar-2027/mauritius"],
  ["Travel & Logistics", "/paflar-2027/travel"],
];

export function CongressSubNav() {
  const p = usePathname();
  return (
    <div className="sticky top-[78px] z-40 border-b border-line bg-white/95 backdrop-blur-xl">
      <div className="wrap flex items-center justify-between gap-6">
        <div className="no-scrollbar flex gap-1 overflow-x-auto">
          {links.map(([l, h]) => (
            <Link key={h} href={h} className={clsx("relative shrink-0 px-4 py-5 font-cond text-[14.5px] uppercase tracking-[0.08em] transition", p === h ? "text-navy" : "text-muted hover:text-navy")}>
              {l}
              {p === h && <span className="absolute inset-x-4 bottom-0 h-[3px] rounded-t bg-teal" />}
            </Link>
          ))}
        </div>
        <a href={congress.links.main} target="_blank" rel="noopener noreferrer" className="hidden shrink-0 items-center gap-2 rounded-full bg-crimson px-5 py-2.5 font-cond text-[14px] uppercase tracking-[0.08em] text-white transition hover:bg-[#9a0f31] md:flex">
          Register <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
