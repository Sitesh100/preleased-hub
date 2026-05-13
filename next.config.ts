import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jlsxgq9c-8000.inc1.devtunnels.ms",
      },
      {
        protocol: "http",
        hostname: "187.77.191.12",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
