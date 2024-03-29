import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import { getCurrentUser } from '@/firebase/config';
import routes from '@/router/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = await getCurrentUser();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth/login');
  } else if (to.meta.requiresNotAuth && isAuthenticated) {
    next('/tasks');
  } else {
    next();
  }
});

export default router;
