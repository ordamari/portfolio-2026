import type { MetadataRoute } from "next";
import { siteTitle } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: "Or Damari",
    start_url: "/",
    display: "standalone",
    background_color: "#05060c",
    theme_color: "#05060c",
    icons: [{ src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
