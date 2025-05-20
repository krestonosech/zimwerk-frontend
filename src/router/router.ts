import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/MainPage.vue'),
    /* meta: { requiresAuth: true }, */
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../entities/profile/Profile.vue'),
    /* meta: { requiresAuth: true }, */
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
