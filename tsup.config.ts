import { defineConfig } from "tsup";

export default defineConfig({
  splitting: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  bundle: true,
  treeshake: true,
  outDir: "dist",
  entry: ["src/index.ts"]
});
