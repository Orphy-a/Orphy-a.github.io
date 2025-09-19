import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  
  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
    // 개발 환경에서만 프록시 설정
    ...(isDev && {
      server: {
        proxy: {
          '/api': {
            target: 'https://api.neople.co.kr',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            configure: (proxy, options) => {
              proxy.on('proxyReq', (proxyReq, req, res) => {
                console.log('🔧 개발 환경 프록시 요청:', proxyReq.getHeader('host') + proxyReq.path);
              });
            }
          }
        }
      }
    }),
    // 환경 변수 정의
    define: {
      __DEV__: isDev,
    }
  }
})
