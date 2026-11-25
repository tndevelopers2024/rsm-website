import type { Metadata, Viewport } from "next";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "./globals.css";
import { SITE_NAME, SITE_URL, OG_DEFAULT } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const DESCRIPTION =
  "The Rheumatology Society, Mauritius (est. July 2015) advances rheumatology through medical education, scientific research, patient awareness and international collaboration. Host of the 7th PAFLAR Congress, 7–9 May 2027.";
const TITLE = "Rheumatology Society, Mauritius | Advancing Rheumatology Since 2015";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["Rheumatology", "Mauritius", "Rheumatology Society Mauritius", "PAFLAR 2027", "arthritis", "CPD", "medical education"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_GB", title: TITLE, description: DESCRIPTION, url: "/", images: [OG_DEFAULT] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_DEFAULT.url] },
  icons: { icon: [{ url: "/icon.png", type: "image/png" }], apple: "/apple-icon.png" },
  robots: { index: true, follow: true },
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
