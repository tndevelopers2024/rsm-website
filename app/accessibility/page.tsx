import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = pageMeta({ title: "Accessibility", description: "Accessibility statement for the Rheumatology Society, Mauritius website — coming soon.", path: "/accessibility" });

export default function Page() {
  return <ComingSoon title="Accessibility" text="Our commitment to an accessible website, and how to request help, will be published here." />;
}
