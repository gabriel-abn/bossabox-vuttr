import { config } from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "VUTTR",
    passWithNoTests: true,
    globals: true,
    coverage: {
      provider: "v8",
      exclude: ["**/tests/**"],
    },
    env: {
      ...config({ path: "./env/.testing.env" }).parsed,
    },
  },
  plugins: [tsconfigPaths()],
});
