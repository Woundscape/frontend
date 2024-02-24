import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "WS_",
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
      "@constants": "/src/constants",
      "@utils": "/src/utils",
      "@api-caller": "/src/api-caller",
    },
  },
});
