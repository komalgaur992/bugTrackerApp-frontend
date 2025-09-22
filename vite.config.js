import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist" // make sure output folder matches Vercel config
  },
  resolve: {
    alias: {
      "@": "/src" // enable @ alias for imports from src folder
    }
  }
});
