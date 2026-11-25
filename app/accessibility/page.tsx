import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Accessibility" };

export default function Page() {
  return <ComingSoon title="Accessibility" text="Our commitment to an accessible website, and how to request help, will be published here." />;
}
