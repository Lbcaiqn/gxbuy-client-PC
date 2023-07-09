import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import pinia from '@/store';
import ElementPlus from 'element-plus';
import 'normalize.css';
import '@/assets/style/global.less';

createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app');
