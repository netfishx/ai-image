import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/yjty",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
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
    ppr: true,
    reactCompiler: true,
    dynamicIO: true,
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: "1024mb",
    },
    useCache: true,
    viewTransition: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aitools888.s3.ap-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
