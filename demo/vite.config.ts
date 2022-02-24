import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import ElementPlus from 'unplugin-element-plus/vite'

// tsx jsx
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // src: resolve(__dirname, 'src'),
      components: resolve(__dirname, 'src/components'),
      assets: resolve(__dirname, 'src/assets'),
      utils: resolve(__dirname, 'src/utils')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(__dirname, 'src/assets/styles/variable.less')}";`
      }
    }
  },
  plugins: [
    vue(),
    ElementPlus(),
    vueJsx()
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
    // 自定义打包指定文件 图片路径丢失
    // rollupOptions: {
    //   output: {
    //     chunkFileNames: 'static/js/[name]-[hash].js',
    //     entryFileNames: 'static/js/[name]-[hash].js',
    //     // assetFileNames: 'static/images/[name]-[hash].[ext]'
    //     assetFileNames: () => {
    //       return 'static/[ext]/[name]-[hash].[ext]'
    //     }
    //   }
    // }
  },
  server: {
    port: 2333,
    proxy: {
      '/ss': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/ss/, '')
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
