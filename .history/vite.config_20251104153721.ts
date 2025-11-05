import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/postcss7-compat'; 
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