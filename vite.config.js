import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// yarn add --dev @esbuild-plugins/node-globals-polyfill
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// yarn add --dev @esbuild-plugins/node-modules-polyfill
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
// You don't need to add this to deps, it's included by @esbuild-plugins/node-modules-polyfill
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const builtinsPlugin = builtins({crypto: true});
builtinsPlugin.name = 'builtins'; // required, see https://github.com/vitejs/vite/issues/728

const globalsPlugin = globals();
globalsPlugin.name = 'globals'; // required, see https://github.com/vitejs/vite/issues/728

// https://vitejs.dev/config/
export default defineConfig(async (command) => {
  dotenv.config({
    path: "./.env",
  });

  const returned = {
    plugins: [react(),
    ],
    resolve: {
      alias: {
        buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      },
    },
    define: {
      global: {},
    },
    rollupInputOptions: {
      plugins: [
        globals,
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
            define: { 'process.env.NODE_ENV': '"production"' }, // https://github.com/evanw/esbuild/issues/660
          }),
          NodeModulesPolyfillPlugin()
        ],
      }
  };

  return returned;
});
