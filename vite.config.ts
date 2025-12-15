import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from "node:path"
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  base: "/",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 2000,

    rollupOptions: {
      output: {
        manualChunks: undefined, 
      },
    },
  },
})
