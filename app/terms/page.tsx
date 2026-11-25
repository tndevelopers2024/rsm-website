import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Terms of Use" };

export default function Page() {
  return <ComingSoon title="Terms of Use" text="The terms governing use of this website will be published here." />;
}
