import type { NextConfig } from "next";

const preview = process.env.NEXT_PUBLIC_PREVIEW === "1";

const nextConfig: NextConfig = {
  // Preview build: static export for the hosted review link (no remote images there).
  ...(preview ? { output: "export" as const, trailingSlash: true } : {}),
  images: {
    unoptimized: preview,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
