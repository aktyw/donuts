<template>
  <BaseSkipLink v-if="!isAuthenticated" />
  <div>
    <HeaderApp v-if="isAuthenticated" />
    <HeaderStart v-else />
    <!-- <HeaderApp /> -->
    <!-- <HeaderStart  /> -->
    <div class="flex pt-12 h-screen">
      <RouterView name="sidebar" />

      <RouterView
        v-slot="{ Component }"
        class="w-full h-[calc(100vh-48px)] pt-10">
        <FadeTransitionShort mode="out-in">
          <component :is="Component" />
        </FadeTransitionShort>
      </RouterView>
    </div>
    <TheNotification v-if="!!store.notifications.length" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BaseSkipLink from '@/components/base/BaseSkipLink.vue';
import HeaderApp from '@/components/header/HeaderApp.vue';
import HeaderStart from '@/components/header/HeaderStart.vue';
import TheNotification from '@/components/layouts/TheNotification.vue';
import FadeTransitionShort from '@/components/ui/transitions/FadeTransitionShort.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useTasksStore } from '@/stores/TasksStore';

const store = useTasksStore();
const authStore = useAuthStore();

authStore.autoLogin();
const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});
</script>

<style>
/*  Vue Datapicker Themes */

.dp__theme_light {
  --dp-background-color: hsl(var(--b1));
  --dp-text-color: hsl(var(--af));
  --dp-hover-color: hsl(var(--a));
  --dp-hover-text-color: hsl(var(--b1));
  --dp-hover-icon-color: hsl(var(--b1));
  --dp-primary-color: hsl(var(--af));
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: hsl(var(--b3));
  --dp-menu-border-color: hsl(var(--b3));
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-icon-color: hsl(var(--nc));
  --dp-danger-color: hsl(var(--er));
  --dp-success-color: hsl(var(--pf));
  --dp-success-color-disabled: hsl(var(--p));
  --dp-icon-color: hsl(var(--af));
  --dp-danger-color: hsl(var(--er));
  --dp-highlight-color: rgba(255, 255, 255, 0.1);
}

.dp__theme_dark {
  --dp-background-color: hsl(var(--a));
  --dp-text-color: hsl(var(--a));
  --dp-hover-color: hsl(var(--a));
  --dp-hover-text-color: hsl(var(--ac));
  --dp-hover-icon-color: hsl(var(--ac));
  --dp-primary-color: hsl(var(--a));
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: hsl(var(--a));
  --dp-success-color-disabled: hsl(var(--nc));
  --dp-icon-color: hsl(var(--nc));
  --dp-danger-color: hsl(var(--er));
  --dp-highlight-color: rgba(13, 92, 167, 0.2);
}
</style>
