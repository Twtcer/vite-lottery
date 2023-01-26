import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    }
  },
  server:{
    port: 9527
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 common.scss 这样就可以在全局中使用 common.scss中预定义的变量了 
        additionalData: '@import "@/styles/common.scss";'
      }
    }
  }
})


