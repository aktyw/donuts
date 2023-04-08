<template>
  <div class="overflow-hidden h-full">
    <TheHeader />
    <div class="flex h-full">
      <RouterView name="sidebar" />
      <RouterView class="w-full overflow-y-auto mb-12" />
    </div>
    <TheNotification v-if="store.notifications.length" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheNotification from '@/components/layouts/TheNotification.vue';
import { useTasksStore } from '@/stores/TasksStore';

const store = useTasksStore();
</script>

<style>
#app {
  height: 100vh;
}

body {
  overflow: hidden;
}
</style>
