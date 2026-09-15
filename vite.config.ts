import path from "node:path";
import { fileURLToPath } from "node:url";
import { reactRouter } from "@react-router/dev/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: mode === "test" ? [react()] : [reactRouter()],
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      "@components": path.resolve(root, "src/components"),
      "@styles": path.resolve(root, "src/css"),
    },
  },
  server: { port: 3000 },
  test: {
    environment: "jsdom",
  },
}));
