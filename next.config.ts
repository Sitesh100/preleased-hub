import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "traveljoy12.pythonanywhere.com",
      },
      {
        protocol: "https",
        hostname: "jlsxgq9c-8000.inc1.devtunnels.ms",
      },
    ],
  },
};

export default nextConfig;
