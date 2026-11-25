import type { Metadata } from "next";

export const SITE_NAME = "Rheumatology Society, Mauritius";

/** Absolute site URL for share cards: explicit env, else Vercel's production domain, else local. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const OG_DEFAULT = { url: "/og-default.jpg", width: 1200, height: 630, alt: "Rheumatology Society, Mauritius — Advancing Rheumatology in Mauritius" };
export const OG_PAFLAR = { url: "/og-paflar.jpg", width: 1200, height: 630, alt: "7th PAFLAR Congress · Mauritius 2027 · 7–9 May 2027" };

/** Title, description, canonical URL, Open Graph and Twitter/X card for one page. */
export function pageMeta({ title, description, path, paflar }: { title: string; description: string; path: string; paflar?: boolean }): Metadata {
  const image = paflar ? OG_PAFLAR : OG_DEFAULT;
  const full = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_GB", title: full, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title: full, description, images: [image.url] },
  };
}
