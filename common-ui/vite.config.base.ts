import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export const createViteConfig = (serviceName: string, port: number) => {
  return defineConfig({
    plugins: [
      react({
        babel: {
          plugins: []
        }
      })
    ],
    base: '/',
    server: {
      port,
      proxy: {
        '/v1': {
          target: `http://localhost:${port}`,
          changeOrigin: true,
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'terser',
      assetsInlineLimit: 4096,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'axios'],
      exclude: [],
    },
  })
}
