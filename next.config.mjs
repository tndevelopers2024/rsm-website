// @ts-check

const preview = process.env.NEXT_PUBLIC_PREVIEW === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preview build: static export for the hosted review link (no remote images there).
  ...(preview ? { output: "export", trailingSlash: true } : {}),
  images: {
    unoptimized: preview,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
