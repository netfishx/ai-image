import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
            exclude: ["error", "dir", "group", "groupEnd"],
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
      bodySizeLimit: "5mb",
    },
    useCache: true,
  },
  output: "standalone",
};

export default nextConfig;
