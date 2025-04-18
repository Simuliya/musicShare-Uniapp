import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import {fileURLToPath, URL} from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
  `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
