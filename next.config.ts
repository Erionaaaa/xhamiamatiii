import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Tell Turbopack that the project root is this folder,
    // not the parent directory that also has a lockfile.
    root: __dirname,
  },
  images: {
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
