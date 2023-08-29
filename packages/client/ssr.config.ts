import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(),
    VitePWA({
      filename: 'sw.ts',
      srcDir: '',
      strategies: 'injectManifest',
      injectRegister: false,
      manifest: false,
      injectManifest: {
        injectionPoint: null,
      },
    })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    }
  }
})
