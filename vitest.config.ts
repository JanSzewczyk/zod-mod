import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const reporters = process.env.CI ? ["dot", "github-actions"] : ["dot"];

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    reporters,
    coverage: {
      provider: "v8"
    }
  }
});
