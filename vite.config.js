import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
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
        target: "http://localhost:8001/",
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      "https://35461e231d364d2f4b5ebdd41e93ddfc.serveo.net",
      "ebf67a73233a7aec77610636841d8326.serveo.net",
    ],
    host: true,
    port: 5173,
  },
});
