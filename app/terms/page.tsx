import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = pageMeta({ title: "Terms of Use", description: "Terms of use for the Rheumatology Society, Mauritius website — coming soon.", path: "/terms" });

export default function Page() {
  return <ComingSoon title="Terms of Use" text="The terms governing use of this website will be published here." />;
}
