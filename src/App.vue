<template>
  <div class="overflow-hidden h-full">
    <TheHeader />
    <div class="flex h-full">
      <RouterView
        class=""
        name="sidebar" />
      <RouterView class="w-full overflow-y-auto mb-20" />
    </div>
    <TheNotification v-if="store.notifications.length" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheNotification from '@/components/layouts/TheNotification.vue';
import { useTasksStore } from '@/stores/TasksStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { storeToRefs } from 'pinia';

const store = useTasksStore();
const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
</script>

<style>
#app {
  height: 100vh;
}
</style>
