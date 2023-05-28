<template>
  <FadeTransitionMedium v-if="isLoading">
    <TheSplash />
  </FadeTransitionMedium>
  <FadeTransitionMedium v-else>
    <div>
      <BaseSkipLink v-if="isAuthenticated" />
      <HeaderApp v-if="isAuthenticated" />
      <HeaderStart v-else />
      <div class="flex pt-12">
        <RouterView name="sidebar" />
        <RouterView
          v-slot="{ Component, route  }"
          class="w-full" :class="{' h-[calc(100vh-48px)]': isAuthenticated}">
          <FadeTransitionShort mode="out-in">
            <component :is="Component" :key="route.path"/>
          </FadeTransitionShort>
        </RouterView>
      </div>
      <TheNotification v-if="!!store.notifications.length" />
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, onMounted, watch } from 'vue';

import BaseSkipLink from '@/components/base/BaseSkipLink.vue';
import HeaderApp from '@/components/header/HeaderApp.vue';
import HeaderStart from '@/components/header/HeaderStart.vue';
import TheNotification from '@/components/layouts/TheNotification.vue';
import TheSplash from '@/components/ui/splash-screen/TheSplash.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import FadeTransitionShort from '@/components/ui/transitions/FadeTransitionShort.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { ThemesId } from '@/types/models/Themes';

const store = useTasksStore();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();

const { getLoadingStatus: isLoading, getAutoDarkModeState: isAutoDark } = storeToRefs(settingsStore);
const { isAuthenticated } = storeToRefs(authStore);

authStore.setUser();

const isDark = useDark();
const currentTheme = computed(() => settingsStore.getCurrentTheme);
const lightTheme = computed(() => settingsStore.getDefaultTheme('light'));
const darkTheme = computed(() => settingsStore.getDefaultTheme('dark'));

onMounted(() => {
  setTheme();
});

watch(isAutoDark, (val) => {
  if (!val) setThemeOnStart();
  else handleSetCurrentTheme();
});

watch(isDark, (val) => {
  handleSetCurrentTheme();
});

watch(currentTheme, (val) => {
  document.body.setAttribute('data-theme', val.id);
});

function setThemeOnStart(value?: ThemesId) {
  document.body.setAttribute('data-theme', value || currentTheme.value.id);
}

function setTheme() {
  isAutoDark.value ? handleSetCurrentTheme() : setThemeOnStart();
}

function handleSetCurrentTheme() {
  isDark.value
    ? settingsStore.setCurrentTheme(darkTheme.value, 'dark')
    : settingsStore.setCurrentTheme(lightTheme.value, 'light');
}
</script>

<style>
/*  Vue Datapicker Themes */


.dp__theme_light {
  --dp-background-color: hsl(var(--b1));
  --dp-text-color: hsl(var(--p));
  --dp-hover-color: hsl(var(--p));
  --dp-hover-text-color: hsl(var(--pc));
  --dp-hover-icon-color: hsl(var(--b1));
  --dp-primary-color: hsl(var(--p));
  --dp-primary-text-color: hsl(var(--pc));
  --dp-secondary-color: #898989;
  --dp-border-color: hsl(var(--b3));
  --dp-menu-border-color: hsl(var(--b3));
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #b8b8b8;
  --dp-icon-color: hsl(var(--nc));
  --dp-danger-color: hsl(var(--er));
  --dp-success-color: hsl(var(--pf));
  --dp-success-color-disabled: hsl(var(--p));
  --dp-icon-color: hsl(var(--p));
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
