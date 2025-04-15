import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
        content: resolve(__dirname, "src/scripts/content.js"),
        background: resolve(__dirname, "src/background/background.js"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "popup") return "popup/popup.js";
          if (chunk.name === "background") return "background/background.js";
          if (chunk.name === "content") return "scripts/content.js";
          return "[name].js";
        },
      },
    },
    emptyOutDir: true,
  },
});
