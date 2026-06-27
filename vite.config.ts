import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { Connect } from "vite";

function charsetPlugin(): Connect.NextHandleFunction {
  return (req, res, next) => {
    const originalSetHeader = res.setHeader.bind(res);
    res.setHeader = (name: string, value: string | string[]) => {
      if (name.toLowerCase() === "content-type" && typeof value === "string") {
        const lower = value.toLowerCase();
        if (lower.startsWith("text/html") && !lower.includes("charset")) {
          value = value + "; charset=utf-8";
        }
        if (lower.startsWith("text/javascript") && !lower.includes("charset")) {
          value = value + "; charset=utf-8";
        }
      }
      return originalSetHeader(name, value);
    };
    next();
  };
}

export default defineConfig({
  plugins: [react(), { name: "charset-plugin", configureServer(server) { server.middlewares.use(charsetPlugin()); } }],
  base: "/BlankStudio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
