import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/Events.vue'),
  },
  {
    path: '/excursions',
    name: 'excursions',
    component: () => import('../views/Excursions.vue'),
  },
  {
    path: '/about-museum',
    name: 'about-museum',
    component: () => import('../views/AboutMuseum.vue'),
  },
  {
    path: '/etnozoo',
    name: 'etnozoo',
    component: () => import('../views/Etnozoo.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
