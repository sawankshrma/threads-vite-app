import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/static/network/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  plugins: [react()],
  server: {
    setupMiddlewares(middlewares, devServer) {
      middlewares.use("/set-cookie", (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const key = url.searchParams.get("key") || "myKey";
        const value = url.searchParams.get("value") || "myValue";

        res.writeHead(200, {
          "Content-Type": "text/plain",
          "Set-Cookie": `${key}=${value}; Path=/`,
        });
        res.end(`Cookie ${key}=${value} set ✅`);
      });

      return middlewares;
    },
    proxy: {
      "/api": {
        target: "http://74.225.203.152:8001/",
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ["x.sharmaji.space", "sharmaji.space"],
    host: true,
    port: 5173,
  },
});
