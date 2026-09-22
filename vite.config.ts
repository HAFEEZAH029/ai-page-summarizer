import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      __GEMINI_API_KEY__: JSON.stringify(env.VITE_GEMINI_API_KEY)
    },
    build: {
      rollupOptions: {
        input: {
          popup: "popup.html",
          background: "src/background/background.ts",
          content: "src/content/contentScript.ts"
        },
        output: {
          entryFileNames: "[name].js"
        }
      }
    }
  };
});