import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/weather": {
          target: "https://api.openweathermap.org",
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(path, "http://localhost");
            const zip = url.searchParams.get("zip");
            return `/data/2.5/weather?zip=${zip},us&units=imperial&appid=${env.OPENWEATHER_API_KEY}`;
          },
        },
      },
    },
  };
});
