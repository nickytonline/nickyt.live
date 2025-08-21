import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

import varlockintegration from "@varlock/astro-integration";
import { ENV } from "varlock/env";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    varlockintegration(),
  ],
  output: "server",
  adapter: netlify(),
  server: {
    port: ENV.PORT,
  },
});
