import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";
import sveltePreprocess from "svelte-preprocess";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [svelte({ preprocess: sveltePreprocess() })],
  resolve: {
    alias: {
      "#lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
