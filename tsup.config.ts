import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/lib/index.ts"],
  format: ["cjs", "esm"],
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "clsx"],
  outDir: "dist",
  treeshake: true,
  minify: false,
});
