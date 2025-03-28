import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ai-tuoyi",
    short_name: "ai-tuoyi",
    description: "ai-tuoyi",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1cce79",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
