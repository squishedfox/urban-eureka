import react from "@vitejs/plugin-react";
import { defineConfig} from "electron-vite";
import { resolve } from "path";

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
      "process.env": process.env
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "electron/preload.ts"),
        },
      },
    },
    resolve: { alias },
    plugins: [],
    define: {
      "process.env": process.env
    }
  },
  renderer: {
    root: ".",
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html"),
        },
      },
    },
    resolve: { alias },
    plugins: [react()],
    define: {
      "process.env": process.env
    }
  },
});
