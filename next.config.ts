import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  allowedDevOrigins: [
    "192.168.2.18:3000",
    "192.168.2.18",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
    ],
  },
};

export default nextConfig;
