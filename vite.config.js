import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Orphy-a.github.io/', // 여기를 실제 repository 이름으로 변경
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})