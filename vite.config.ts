import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, ".", "src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001', // 后端服务地址
        changeOrigin: true, // 必须设置为true，以避免host header问题
        rewrite: (path) => path.replace(/^\/api/, '/api') // 可选，重写请求路径
      }
    }
  }
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: {
  //         hack: `true; @import (reference) "${resolve(
  //           "src/assets/style/base.less"
  //         )}";`,
  //       },
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
})


