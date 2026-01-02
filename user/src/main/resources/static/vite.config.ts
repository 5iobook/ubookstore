import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // React Fast Refresh 최적화
      babel: {
        plugins: [
          // 프로덕션 빌드에서 console 제거 (선택적)
          // ['transform-remove-console', { exclude: ['error', 'warn'] }]
        ]
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'manifest.json'],
      manifest: {
        name: '중고책거래 플랫폼',
        short_name: '책거래',
        description: '온라인 중고 책 거래 플랫폼 - 따뜻한 독서 공간',
        theme_color: '#FF9F43',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Cache First 전략: 정적 자산
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1년
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30일
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7일
              }
            }
          },
          // Network First 전략: API 요청
          {
            urlPattern: /^http:\/\/localhost:8083\/v1\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 5 // 5분
              },
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/v1/]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/v1': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      }
    }
  },
  build: {
    // 번들 크기 최적화
    rollupOptions: {
      output: {
        // 청크 분할 전략
        manualChunks: {
          // React 관련 라이브러리를 별도 청크로 분리
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
        // 청크 파일명 패턴
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // 청크 크기 경고 임계값 (KB)
    chunkSizeWarningLimit: 500,
    // CSS 코드 분할
    cssCodeSplit: true,
    // 소스맵 생성 (프로덕션에서는 false로 설정 가능)
    sourcemap: false,
    // 압축 최적화
    minify: 'terser',
    terserOptions: {
      compress: {
        // console 제거 (선택적)
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
      format: {
        comments: false,
      },
    },
    // 리소스 인라인 임계값 (4KB 미만은 base64로 인라인)
    assetsInlineLimit: 4096,
  },
  // 최적화 설정
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: [],
  },
})
