import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { NotificationsPlugin } from '@/plugins/notifications';
import { router } from '@/router';
import '@/assets/fonts/fonts.css';

import App from './App.vue';

const app = createApp(App);

export const pinia = createPinia();
app.use(pinia);

app.use(NotificationsPlugin);
app.use(router);

app.mount('#app');
