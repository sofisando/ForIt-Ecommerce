import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/application"),
      "@infra": path.resolve(__dirname, "./src/infra"),
      "@presentation": path.resolve(__dirname, "./src/presentation"),
    },
  },
});