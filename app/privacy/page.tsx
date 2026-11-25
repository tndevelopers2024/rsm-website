import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return <ComingSoon title="Privacy Policy" text="How the Society collects, uses and protects personal information will be set out here." />;
}
