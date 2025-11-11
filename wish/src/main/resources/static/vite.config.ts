import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wish/',
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      }
    }
  }
})
