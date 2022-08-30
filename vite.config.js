import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// yarn add --dev @esbuild-plugins/node-globals-polyfill
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// yarn add --dev @esbuild-plugins/node-modules-polyfill
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
// You don't need to add this to deps, it's included by @esbuild-plugins/node-modules-polyfill
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(async (command) => {
  dotenv.config({
    path: "./.env",
  });

  const returned = {
    plugins: [react()],
    resolve: {
      alias: {
        buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6', 
      },
      },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        }      },
    },
  };

  return returned;
});
