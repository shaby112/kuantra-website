import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/react-router-dom/")) {
            return "react-vendor";
          }
          if (id.includes("/@clerk/")) {
            return "clerk-vendor";
          }
          if (id.includes("/framer-motion/") || id.includes("/ogl/")) {
            return "animation-vendor";
          }
          if (id.includes("/@radix-ui/") || id.includes("/lucide-react/")) {
            return "ui-vendor";
          }
          return "vendor";
        },
      },
    },
  },
}));
