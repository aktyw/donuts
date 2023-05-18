import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import routes from '@/router/routes';
import { useAuthStore } from '@/stores/AuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/auth/login');
  } else if (to.meta.requiresNotAuth && isAuthenticated.value) {
    next('/tasks');
  } else {
    next();
  }
});

export default router;
