import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    vueSetupExtend(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: '聚享购',
        },
      },
    }),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.prod.js',
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: 'https://cdn.bootcdn.net/ajax/libs/vue-demi/0.14.0/index.iife.js',
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4.2.1',
        },
        {
          name: 'pinia',
          var: 'Pinia',
          path: 'https://cdn.bootcdn.net/ajax/libs/pinia/2.0.36/pinia.iife.prod.min.js',
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://cdn.bootcdn.net/ajax/libs/axios/1.4.0/axios.js',
        },
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: '//unpkg.com/element-plus@2.3.5',
          css: '//unpkg.com/element-plus/dist/index.css',
        },
        {
          name: 'element-plus/icons-vue',
          var: 'ElementPlusIconsVue',
          path: 'https://cdn.bootcdn.net/ajax/libs/element-plus-icons-vue/2.1.0/global.iife.min.js',
        },
        {
          name: 'echarts',
          var: 'echarts',
          path: 'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.common.js',
        },
      ],
    }),
    viteCompression({
      filter: /.(js|mjs|json|css|html|jpg|png)$/i, // 需要压缩什么文件，默认为 /.(js|mjs|json|css|html)$/i
      // deleteOriginFile: true, // 压缩完成后 dist 中是否删除原文件，默认为false
      verbose: true, // build 完成后是否显示压缩结果，默认为true
      disable: false, // 是否禁用压缩，默认值为false
      threshold: 10240, // 超过多少B才进行压缩，这里设置为10kB，默认值不知道是多少
      algorithm: 'gzip', // 压缩算法，默认为 gzip
      ext: '.gz', // 压缩文件后缀
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.json', '.vue', '.less'], // 指定可省略的扩展名
  },
});
