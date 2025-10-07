import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: "ai-tuoyi",
    display: "standalone",
    icons: [
      {
        purpose: "maskable",
        sizes: "192x192",
        src: "/web-app-manifest-192x192.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/web-app-manifest-512x512.png",
        type: "image/png",
      },
    ],
    name: "ai-tuoyi",
    short_name: "ai-tuoyi",
    start_url: "/",
    theme_color: "#1cce79",
  };
}
