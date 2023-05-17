import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import routes from '@/router/routes';
import { useAuthStore } from '@/stores/AuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login');
  } else if (to.meta.requiresNotAuth && authStore.isAuthenticated) {
    next('/tasks');
  } else {
    next();
  }
});

export default router;
