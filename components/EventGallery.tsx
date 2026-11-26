"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Expand } from "lucide-react";
import { aflarPhotos } from "@/lib/content";
import { Lightbox } from "./Lightbox";

/** Bento gallery of AFLAR 2019 photos (same venue as PAFLAR 2027) with lightbox. */
const layout = [
  { i: 10, c: "col-span-2 row-span-2" },
  { i: 0, c: "" },
  { i: 14, c: "" },
  { i: 25, c: "col-span-2" },
  { i: 4, c: "" },
  { i: 21, c: "" },
  { i: 7, c: "" },
  { i: 27, c: "" },
];

export function EventGallery({ className }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className={clsx("grid auto-rows-[150px] grid-cols-2 gap-2.5 sm:auto-rows-[190px] md:grid-cols-4 lg:auto-rows-[210px]", className)}>
        {layout.map(({ i, c }) => {
          const p = aflarPhotos[i];
          return (
            <button key={p.src} type="button" onClick={() => setOpen(i)} className={clsx("group relative overflow-hidden rounded-[18px] bg-mist", c)} aria-label={`Open photo: ${p.caption}`}>
              <Image src={p.src} alt={p.caption} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-left text-[13px] text-white opacity-0 transition group-hover:opacity-100">
                <span className="line-clamp-1">{p.caption.replace(" · AFLAR 2019", "")}</span>
                <Expand className="h-4 w-4 shrink-0" />
              </span>
            </button>
          );
        })}
      </div>
      <Lightbox photos={aflarPhotos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
