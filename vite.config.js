import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Disable source maps in production for security
    sourcemap: false,
    // Default minification (esbuild)
    minify: 'esbuild',
  },
})
