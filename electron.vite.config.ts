import react from "@vitejs/plugin-react";
import { defineConfig } from "electron-vite";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

const __dirname = import.meta.dirname;

const alias = {
  "@app": resolve(__dirname, "src"),
  "@assets": resolve(__dirname, "src/assets"),
  "@components": resolve(__dirname, "src/components"),
  "@features": resolve(__dirname, "src/features"),
  "@core": resolve(__dirname, "core"),
};

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "electron/main.ts"),
        },
      },
    },
    resolve: { alias },
    plugins: [],
    define: {
      "process.platform": JSON.stringify(process.platform),
      "process.env.VITE_DEV_SERVER_URL": JSON.stringify(
        process.env["VITE_DEV_SERVER_URL"],
      ),
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "electron/preload.ts"),
        },
        output: {
          format: "cjs",
        },
      },
    },
    resolve: { alias },
    plugins: [],
  },
  renderer: {
    root: ".",
    resolve: { alias },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html"),
        },
      },
    },
    plugins: [react(), svgr(), tailwindcss()],
  },
});
