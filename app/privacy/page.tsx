import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = pageMeta({ title: "Privacy Policy", description: "Privacy policy of the Rheumatology Society, Mauritius — coming soon.", path: "/privacy" });

export default function Page() {
  return <ComingSoon title="Privacy Policy" text="How the Society collects, uses and protects personal information will be set out here." />;
}
