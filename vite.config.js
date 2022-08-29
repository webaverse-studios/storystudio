import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig(async (command) => {
  dotenv.config({
    path: "./.env",
  });

  const returned = {
    plugins: [react()],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
        plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
      },
    },
  };

  return returned;
});
