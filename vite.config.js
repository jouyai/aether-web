import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" // <-- Import modul 'path' dari Node.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tambahkan bagian 'resolve' ini untuk memberitahu Vite cara menangani alias
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
