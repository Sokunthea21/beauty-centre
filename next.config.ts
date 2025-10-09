import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
    ],
  },
   experimental: {
    // appDir: true, // Removed because it's not a valid property
  },
};

export default nextConfig;
