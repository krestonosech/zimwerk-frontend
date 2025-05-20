import { createPinia } from 'pinia';
import { createApp } from 'vue';
import piniaPersist from 'pinia-plugin-persistedstate';
import { NotificationsPlugin } from '@/plugins/notifications';
import { router } from '@/router';

import App from './App.vue';

const app = createApp(App);

export const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);

app.use(NotificationsPlugin);
app.use(router);

app.mount('#app');
