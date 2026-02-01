import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  assetsInclude: ["**/*.svg"],
  plugins: [
    tailwindcss(),
    svgr({
      svgrOptions: {
        exportType: "default",
      },
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    proxy: {
      "/oauth2": {
        target: "https://3.35.202.0:443",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
