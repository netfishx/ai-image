import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "aitools888",
    short_name: "aitools888",
    description: "aitools888",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2eaf6b",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
