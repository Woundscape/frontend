import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@styles": "/src/styles",
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@api": "/src/api",
      "@layouts": "/src/layouts",
      "@features": "/src/features",
      "@libs": "/src/libs",
      "@config": "/src/config",
      "@constraint": "/src/constraint",
    },
  },
});
