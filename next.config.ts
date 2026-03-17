import type { NextConfig } from "next";

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {

    
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: ONE_WEEK_IN_SECONDS,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
