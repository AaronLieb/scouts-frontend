import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [svelte()],
  resolve: {
    alias: {
      "#lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
