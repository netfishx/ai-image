import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["warn", "error", "dir", "group", "groupEnd"],
          }
        : false,
  },
  devIndicators: {
    position: "bottom-right",
  },
  experimental: {
    authInterrupts: true,
    cacheComponents: true,
    ppr: true,
    serverActions: {
      bodySizeLimit: "1024mb",
    },
    useCache: true,
    viewTransition: true,
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
        source: "/:path*{/}?",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "aitools888.s3.ap-east-1.amazonaws.com",
        protocol: "https",
      },
    ],
  },
  output: "standalone",
  reactCompiler: true,
  async rewrites() {
    return [
      {
        destination: "/yjty",
        source: "/",
      },
    ];
  },
};

export default nextConfig;
