import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "vitest/config";

const reporters = process.env.CI ? ["dot", "github-actions"] : ["dot"];

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    reporters,
    coverage: {
      provider: "v8"
    }
  }
});
