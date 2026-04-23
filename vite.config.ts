import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      "@components": path.resolve(root, "src/components"),
      "@styles": path.resolve(root, "src/css"),
      "@webfonts": path.resolve(root, "src/webfonts"),
    },
  },
  test: {
    environment: "jsdom",
  },
  server: { port: 3000 },
});
