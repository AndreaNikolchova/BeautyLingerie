import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7090',
        changeOrigin: true,
        secure: false, // Use this option if you are working with self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
