import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/catering",
        destination: "/order",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
