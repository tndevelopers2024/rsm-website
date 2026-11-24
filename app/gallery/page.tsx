import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Pending } from "@/components/Pending";

export const metadata: Metadata = { title: "Gallery & Archive" };

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery & Archive" title="Moments from our journey." lead="Past congresses, awareness activities, media coverage and CPD programmes." image="audience2" crumbs={[{ label: "Gallery" }]} />
      <section className="bg-navy-deep py-24 md:py-32">
        <div className="wrap">
          <div className="mb-10"><Pending>Representative imagery: approved photographs & captions to be supplied</Pending></div>
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
