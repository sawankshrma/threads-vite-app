import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8001",
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      "ccb8f1f91e88291a03f0d3cfbd64141d.serveo.net", //
    ],
    host: true,
    port: 5173,
  },
});
