import type { Metadata, Viewport } from "next";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://rheumatologysociety.org"),
  title: {
    default: "Rheumatology Society, Mauritius | Advancing Rheumatology Since 2015",
    template: "%s | Rheumatology Society, Mauritius",
  },
  description:
    "The Rheumatology Society, Mauritius (est. July 2015) advances rheumatology through medical education, scientific research, public awareness and professional collaboration. Co-host of the 7th PAFLAR Congress, 7–9 May 2027.",
  openGraph: {
    type: "website",
    siteName: "Rheumatology Society, Mauritius",
    images: ["/brand/rsm-logo-square.jpg"],
  },
  icons: { icon: "/brand/rsm-logo-square.jpg" },
};

export const viewport: Viewport = { themeColor: "#0b2034" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
