import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/Events.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/excursions',
    name: 'excursions',
    component: () => import('../views/Excursions.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about-museum',
    name: 'about-museum',
    component: () => import('../views/AboutMuseum.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/etnozoo',
    name: 'etnozoo',
    component: () => import('../views/Etnozoo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
