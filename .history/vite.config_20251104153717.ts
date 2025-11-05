import { defineConfig } from 'vite'
import tailwindcss from '@'
import path from "node:path";
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base:"/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})