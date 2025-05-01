import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    component: () => import('../views/Main.vue'),
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/Events.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
