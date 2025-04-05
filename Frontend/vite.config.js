import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Completely new Vite config with custom output directory
export default defineConfig({
  root: '.', // optional, default is '.'
  plugins: [react()],
  build: {
    outDir: '../Backend/dist',     // output to BC/dist
    emptyOutDir: true,        // clear the folder before building
    rollupOptions: {
      input: './index.html',  // make sure this matches your actual entry
    },
  },
})