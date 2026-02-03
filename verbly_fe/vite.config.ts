// vite.config.ts
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
  // 아래 server 설정을 추가하여 WebSocket 연결을 안정화합니다.
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
    // 필요 시 백엔드 포트(예: 8080)와 통신하기 위한 프록시 설정
    proxy: {
      '/oauth2': {
        target: 'http://3.35.202.0', // 실제 백엔드 주소로 수정
        changeOrigin: true,
        secure: true, // 배포 서버가 https라면 true
        ws: true,     // 웹소켓 프록시 활성화
      },
    },
  },
});