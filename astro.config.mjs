import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://fishsticklabs.com",
  integrations: [sitemap()],
  // Uncomment if deploying to GitHub Pages with a repo name:
  // base: '/repo-name',
});

