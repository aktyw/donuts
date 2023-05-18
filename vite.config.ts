/** @type {import('vite').UserConfig} */

import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  build: {
    target: browserslistToEsbuild(),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
