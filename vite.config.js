import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VitePluginSitemap from "vite-plugin-sitemap";

const resultTypes = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];

export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: "https://woomogo.vercel.app",
      exclude: ["/404"],
      routes: [
        { url: "/", changefreq: "daily", priority: 1 },
        ...resultTypes.map((type) => ({
          url: `/result/${type}`,
          changefreq: "weekly",
          priority: 0.8,
        })),
        { url: "/feedback", changefreq: "monthly", priority: 0.5 },
      ],
    }),
  ],
});
