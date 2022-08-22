import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

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
      },
    },
  };

  if (command.command === "build" && process.env.VITE_LOCAL_BUILD !== "true") {
    returned.build.rollupOptions.plugins = [
      inject({
        process: "process",
      }),
    ];
  }

  if (command.command !== "build" || process.env.VITE_LOCAL_BUILD === "true") {
    returned.define = {
      "process.env": process.env,
      "process.browser": process.browser,
    };
  }

  return returned;
});
