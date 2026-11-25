import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = pageMeta({ title: "Gallery & Archive", description: "Photographs from the Society’s conferences, CPD sessions and awareness campaigns.", path: "/gallery" });

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery & Archive" title="Moments from our journey." lead="Photographs from the Rheumatology Congress Mauritius 2026, the Society’s meetings and its international engagement." image="heroPanel" tone="none" crumbs={[{ label: "Gallery" }]} />
      <section className="bg-navy-deep py-24 md:py-32">
        <div className="wrap">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
