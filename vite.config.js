import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/options/index.html",
          dest: "options",
        },
      ],
    }),
  ],

  define: {
    __API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL),
    __CLIENT_URL__: JSON.stringify(process.env.VITE_CLIENT_URL),
    __SLACK_CLIENT_ID__: JSON.stringify(process.env.VITE_SLACK_CLIENT_ID),
    __REDIRECT_URI__: JSON.stringify(process.env.VITE_REDIRECT_URI),
  },

  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
        options: resolve(__dirname, "src/options/index.html"),
        content: resolve(__dirname, "src/scripts/content.js"),
        background: resolve(__dirname, "src/background/background.js"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "popup") return "popup/popup.js";
          if (chunk.name === "options") return "options/options.js";
          if (chunk.name === "background") return "background/background.js";
          if (chunk.name === "content") return "scripts/content.js";
          return "[name].js";
        },
      },
    },
    emptyOutDir: true,
  },
});
